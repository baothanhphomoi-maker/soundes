import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { RadioEpisode } from '../data/radioData';

interface AudioPlayerContextType {
  currentEpisode: RadioEpisode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  autoPlay: boolean;
  playEpisode: (episode: RadioEpisode) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleAutoPlay: () => void;
  nextEpisode: () => void;
  previousEpisode: () => void;
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
}

export function AudioPlayerProvider({ children }: AudioPlayerProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [currentEpisode, setCurrentEpisode] = useState<RadioEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);

  const allEpisodes = useRef<RadioEpisode[]>([]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (autoPlay) {
        nextEpisode();
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
  }, [autoPlay]);

  const playEpisode = (episode: RadioEpisode) => {
    if (currentEpisode?.id === episode.id) {
      togglePlay();
      return;
    }

    const audio = audioRef.current;
    audio.src = episode.audioUrl;
    audio.play().catch(console.error);
    setCurrentEpisode(episode);
    setIsPlaying(true);
    setCurrentTime(0);

    // Update all episodes reference for next/previous
    if (allEpisodes.current.length === 0) {
      // Import dynamically to avoid circular dependency
      import('../data/radioData').then(module => {
        allEpisodes.current = module.getAllEpisodes();
      });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (vol: number) => {
    const audio = audioRef.current;
    audio.volume = vol;
    setVolumeState(vol);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const nextEpisode = () => {
    if (!currentEpisode || allEpisodes.current.length === 0) return;

    const currentIndex = allEpisodes.current.findIndex(ep => ep.id === currentEpisode.id);
    const nextIndex = (currentIndex + 1) % allEpisodes.current.length;
    playEpisode(allEpisodes.current[nextIndex]);
  };

  const previousEpisode = () => {
    if (!currentEpisode || allEpisodes.current.length === 0) return;

    const currentIndex = allEpisodes.current.findIndex(ep => ep.id === currentEpisode.id);
    const prevIndex = (currentIndex - 1 + allEpisodes.current.length) % allEpisodes.current.length;
    playEpisode(allEpisodes.current[prevIndex]);
  };

  // Load all episodes on mount
  useEffect(() => {
    import('../data/radioData').then(module => {
      allEpisodes.current = module.getAllEpisodes();
    });
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        volume,
        autoPlay,
        playEpisode,
        togglePlay,
        seek,
        setVolume,
        toggleAutoPlay,
        nextEpisode,
        previousEpisode,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
