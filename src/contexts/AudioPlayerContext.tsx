import { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import { RadioEpisode } from '../data/radioEpisodes';
import { trackRadioListen } from '../services/api';

interface AudioPlayerContextType {
  currentEpisode: RadioEpisode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  autoPlay: boolean;
  playEpisode: (episode: RadioEpisode) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (time: number) => void;
  nextEpisode: () => void;
  previousEpisode: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  toggleAutoPlay: () => void;
  allEpisodes: RadioEpisode[];
  reloadListenCounts: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
};

interface AudioPlayerProviderProps {
  children: ReactNode;
  episodes: RadioEpisode[];
}

export function AudioPlayerProvider({ children, episodes }: AudioPlayerProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [currentEpisode, setCurrentEpisode] = useState<RadioEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [listenCountVersion, setListenCountVersion] = useState(0);

  const reloadListenCounts = useCallback(() => {
    setListenCountVersion(v => v + 1);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
    audio.playbackRate = playbackRate;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (autoPlay && currentEpisode) {
        const currentIndex = episodes.findIndex(ep => ep.id === currentEpisode.id);
        const nextIndex = (currentIndex + 1) % episodes.length;
        if (nextIndex !== currentIndex) {
          playEpisode(episodes[nextIndex]);
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, currentEpisode, episodes, volume, playbackRate]);

  const playEpisode = (episode: RadioEpisode) => {
    const audio = audioRef.current;

    // If clicking the same episode that's playing, toggle pause/play
    if (currentEpisode?.id === episode.id && isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // If clicking the same episode that's paused, resume
    if (currentEpisode?.id === episode.id && !isPlaying) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
      return;
    }

    // New episode - stop current, load new, play immediately
    audio.pause();
    audio.src = episode.audioUrl;

    // Set state immediately for instant UI feedback
    setCurrentEpisode(episode);
    setCurrentTime(0);

    // Load and play immediately
    audio.load();

    const playAudio = async () => {
      try {
        // Wait for audio to be ready to play
        await audio.play();
        setIsPlaying(true);

        // Track listen for EVERY click (1 click = 1 listen)
        trackRadioListen(episode.id)
          .then(() => {
            // Reload counts after successful track
            setTimeout(reloadListenCounts, 300);
          })
          .catch(err => {
            console.error('Failed to track radio listen:', err);
          });
      } catch (err) {
        console.error('Playback failed:', err);
        setIsPlaying(false);
      }
    };

    playAudio();
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!currentEpisode) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const nextEpisode = () => {
    if (!currentEpisode) return;
    const currentIndex = episodes.findIndex(ep => ep.id === currentEpisode.id);
    const nextIndex = (currentIndex + 1) % episodes.length;
    playEpisode(episodes[nextIndex]);
  };

  const previousEpisode = () => {
    if (!currentEpisode) return;
    const currentIndex = episodes.findIndex(ep => ep.id === currentEpisode.id);
    const prevIndex = (currentIndex - 1 + episodes.length) % episodes.length;
    playEpisode(episodes[prevIndex]);
  };

  const setVolume = (vol: number) => {
    const audio = audioRef.current;
    audio.volume = vol;
    setVolumeState(vol);
    if (vol > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const setPlaybackRate = (rate: number) => {
    const audio = audioRef.current;
    audio.playbackRate = rate;
    setPlaybackRateState(rate);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        playbackRate,
        autoPlay,
        playEpisode,
        togglePlay,
        pause,
        seek,
        nextEpisode,
        previousEpisode,
        setVolume,
        toggleMute,
        setPlaybackRate,
        toggleAutoPlay,
        allEpisodes: episodes,
        reloadListenCounts,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
