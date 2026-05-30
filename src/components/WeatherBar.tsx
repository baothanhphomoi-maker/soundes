import { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Clock } from 'lucide-react';

interface WeatherData {
  temperature: number;
  weathercode: number;
}

export default function WeatherBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Weather API
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current_weather=true'
        );
        const data = await response.json();
        setWeather({
          temperature: Math.round(data.current_weather.temperature),
          weathercode: data.current_weather.weathercode
        });
      } catch (error) {
        console.error('Weather fetch failed:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-5 h-5 text-yellow-500" />;
    if (code <= 3) return <Cloud className="w-5 h-5 text-gray-400" />;
    return <CloudRain className="w-5 h-5 text-blue-500" />;
  };

  const formatDate = (date: Date) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return `${days[date.getDay()]}, ${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <section className="bg-white py-4 border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-mid">
              Thời Tiết TP.HCM Hôm Nay
            </span>
            {weather && (
              <div className="flex items-center gap-2 bg-neutral-light rounded-full px-4 py-2">
                {getWeatherIcon(weather.weathercode)}
                <span className="text-lg font-bold text-neutral-dark">
                  {weather.temperature}°C
                </span>
              </div>
            )}
          </div>

          <div className="bg-neutral-light rounded-full px-6 py-2">
            <span className="text-sm font-medium text-neutral-dark">
              {formatDate(currentTime)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-neutral-dark">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-lg font-bold font-headline tabular-nums">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
