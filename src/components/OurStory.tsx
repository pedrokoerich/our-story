import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import image1 from '../style/assets/image1.jpg';
import image2 from '../style/assets/image2.jpg';
import image3 from '../style/assets/image3.jpg';
import image4 from '../style/assets/image4.jpg';
import image5 from '../style/assets/image5.jpg';

const LovePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Substitua esta data pela data em que vocês começaram a namorar
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

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-pink-600">Para o Amor da Minha Vida ❤️</h1>
      </header>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto mb-8">
  <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
    <img
      src={images[currentSlide]}
      alt={`Foto ${currentSlide + 1}`}
      className="w-full h-full object-contain bg-black/5" // Mudei de object-cover para object-contain
    />
    <button
      onClick={prevSlide}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-all"
    >
      <ChevronLeft className="w-6 h-6 text-pink-600" />
    </button>
    <button
      onClick={nextSlide}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-all"
    >
      <ChevronRight className="w-6 h-6 text-pink-600" />
    </button>
  </div>
  <div className="flex justify-center mt-4 gap-2">
    {images.map((_, index) => (
      <button
        key={index}
        className={`w-3 h-3 rounded-full transition-all ${
          currentSlide === index ? 'bg-pink-600 scale-110' : 'bg-pink-300'
        }`}
        onClick={() => setCurrentSlide(index)}
      />
    ))}
  </div>
        </div>

      {/* Love Message */}
      <div className="max-w-2xl mx-auto px-4 mb-12 text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          Cada momento ao seu lado é especial. Você ilumina meus dias e faz meu coração sorrir.
          Esta página é apenas uma pequena demonstração do meu amor por você.
        </p>
      </div>

      {/* Timer */}
      <div className="bg-white shadow-lg rounded-lg max-w-2xl mx-auto p-6 mb-12">
        <h2 className="text-2xl font-semibold text-pink-600 text-center mb-6">
          Tempo Juntos <Heart className="inline-block w-6 h-6" />
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          <div className="bg-pink-50 p-3 rounded">
            <div className="text-2xl font-bold text-pink-600">{timeElapsed.years}</div>
            <div className="text-sm text-gray-600">Anos</div>
          </div>
          <div className="bg-pink-50 p-3 rounded">
            <div className="text-2xl font-bold text-pink-600">{timeElapsed.months}</div>
            <div className="text-sm text-gray-600">Meses</div>
          </div>
          <div className="bg-pink-50 p-3 rounded">
            <div className="text-2xl font-bold text-pink-600">{timeElapsed.days}</div>
            <div className="text-sm text-gray-600">Dias</div>
          </div>
          <div className="bg-pink-50 p-3 rounded">
            <div className="text-2xl font-bold text-pink-600">{timeElapsed.hours}</div>
            <div className="text-sm text-gray-600">Horas</div>
          </div>
          <div className="bg-pink-50 p-3 rounded">
            <div className="text-2xl font-bold text-pink-600">{timeElapsed.minutes}</div>
            <div className="text-sm text-gray-600">Minutos</div>
          </div>
          <div className="bg-pink-50 p-3 rounded">
            <div className="text-2xl font-bold text-pink-600">{timeElapsed.seconds}</div>
            <div className="text-sm text-gray-600">Segundos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LovePage;