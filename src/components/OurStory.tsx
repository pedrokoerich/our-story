import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sun, Moon, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import image1 from '../style/assets/image1.jpg';
import image2 from '../style/assets/image2.jpg';
import image3 from '../style/assets/image3.jpg';
import image4 from '../style/assets/image4.jpg';
import image5 from '../style/assets/image5.jpg';


const LovePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
 
  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const startDate = new Date('2024-09-07T22:00:00');
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5
  ];

  const calculateTime = () => {
    const now = new Date();
    const difference = now.getTime() - startDate.getTime();

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(months / 12);

    setTimeElapsed({
      years,
      months: months % 12,
      days: days % 30,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60
    });
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        console.log('Autoplay blocked by browser');
      });
    }
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-opacity-80 backdrop-blur-sm transition-colors duration-300 hover:bg-opacity-100 z-50"
        style={{
          backgroundColor: isDarkMode ? '#374151' : '#f3f4f6'
        }}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-gray-600" />
        )}
      </button>
          
      <div className={`fixed bottom-4 right-4 flex items-center gap-2 p-2 rounded-full backdrop-blur-sm z-50 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
      }`}>
        <button
          onClick={togglePlay}
          className={`p-2 rounded-full transition-all hover:scale-110 ${
            isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={toggleMute}
          className={`p-2 rounded-full transition-all hover:scale-110 ${
            isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
        
        <audio
          ref={audioRef}
          loop
          preload="auto"
          src="/music/our-music.mp3"
        />
      </div>

      <header className="py-8 text-center">
        <h1 className={`text-4xl font-bold transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Para o Amor da Minha Vida ❤️
        </h1>
      </header>

      <div className="relative max-w-3xl mx-auto mb-8">
        <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
          <img
            src={images[currentSlide]}
            alt={`Foto ${currentSlide + 1}`}
            className="w-full h-full object-contain bg-black/5"
          />
          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
              isDarkMode 
                ? 'bg-gray-800/80 hover:bg-gray-800' 
                : 'bg-white/80 hover:bg-white'
            }`}
          >
            <ChevronLeft className={`w-6 h-6 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-600'
            }`} />
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
              isDarkMode 
                ? 'bg-gray-800/80 hover:bg-gray-800' 
                : 'bg-white/80 hover:bg-white'
            }`}
          >
            <ChevronRight className={`w-6 h-6 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-600'
            }`} />
          </button>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? isDarkMode ? 'bg-gray-200 scale-110' : 'bg-gray-600 scale-110'
                  : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mb-12 text-center">
        <p className={`text-lg leading-relaxed transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Meu amor, você é a pessoa mais incrível que eu já conheci e sou muito grato por ter você na minha vida.
          Cada momento ao seu lado é especial. Você ilumina meus dias e faz meu coração sorrir.
          Obrigado por tanto e por me mostrar o verdadeiro significado do amor. Eu te amo muito! ❤️
        </p>
      </div>

      <div className={`shadow-lg rounded-lg max-w-2xl mx-auto p-6 mb-12 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
        <h2 className={`text-2xl font-semibold text-center mb-6 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Tempo Juntos <Heart className="inline-block w-6 h-6 text-red-500" />
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {[
            { value: timeElapsed.years, label: 'Anos' },
            { value: timeElapsed.months, label: 'Meses' },
            { value: timeElapsed.days, label: 'Dias' },
            { value: timeElapsed.hours, label: 'Horas' },
            { value: timeElapsed.minutes, label: 'Minutos' },
            { value: timeElapsed.seconds, label: 'Segundos' }
          ].map(({ value, label }) => (
            <div key={label} className={`p-3 rounded transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {value}
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
       {/* Add footer */}
       <footer className={`bottom-0 left-0 right-0 text-center py-4 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
      }`}>
        <p className="text-sm">
          Feito com <Heart className="inline-block w-4 h-4 text-red-500 mb-1" /> por Pedro H. Koerich
        </p>
      </footer>
    </div>
  );
};

export default LovePage;