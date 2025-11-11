import React, { useState } from 'react';

interface QuizProps {
  onFindQuote: (mood: string) => void;
  lang: 'ar' | 'en';
  quizTitle: string;
  placeholder: string;
  submitButton: string;
}

const Quiz: React.FC<QuizProps> = ({ onFindQuote, lang, quizTitle, placeholder, submitButton }) => {
  const [mood, setMood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mood.trim()) {
      onFindQuote(mood);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center animate-fade-in">
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">{quizTitle}</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder={placeholder}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          className="w-full px-6 py-4 mb-6 text-lg text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
        />
        <button
          type="submit"
          disabled={!mood.trim()}
          className="px-8 py-3 bg-teal-500 text-white text-lg font-bold rounded-full hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          {submitButton}
        </button>
      </form>
    </div>
  );
};

export default Quiz;
