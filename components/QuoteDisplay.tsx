import React from 'react';
import { QuoteResult } from '../types';

interface QuoteDisplayProps {
  mood: string;
  result: QuoteResult;
  onReset: () => void;
  onRefreshQuote: () => void;
  lang: 'ar' | 'en';
  resultTitle: string;
  resetButton: string;
  refreshButton: string;
  originLabel: string;
  adviceLabel: string;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ mood, result, onReset, onRefreshQuote, lang, resultTitle, resetButton, refreshButton, originLabel, adviceLabel }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center text-center animate-fade-in">
      <p className="text-lg font-medium text-gray-500 mb-2">{resultTitle}</p>
      <h2 className="text-3xl font-bold text-teal-600 mb-6 px-4 py-2 bg-teal-50 rounded-full">{mood}</h2>

      <blockquote className="space-y-4">
        <p dir={lang === 'ar' ? 'rtl' : 'ltr'} className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
          "{result.quote[lang]}"
        </p>
        <footer dir={lang === 'ar' ? 'rtl' : 'ltr'} className="text-sm text-gray-500 italic">
          - {result.origin[lang]}
        </footer>
      </blockquote>

      <div className="w-full border-t border-gray-200 my-6"></div>
      
      <div className="w-full text-center px-4">
        <h3 dir={lang === 'ar' ? 'rtl' : 'ltr'} className="text-lg font-bold text-teal-600 mb-2">{adviceLabel}</h3>
        <p dir={lang === 'ar' ? 'rtl' : 'ltr'} className="text-gray-700 leading-relaxed">{result.advice[lang]}</p>
      </div>

      <div className="w-full border-t border-gray-200 my-6"></div>
      
      <div className="mt-6 flex flex-wrap justify-center gap-4">
         <button
            onClick={onRefreshQuote}
            className="px-8 py-3 bg-white text-teal-600 border border-teal-500 text-lg font-bold rounded-full hover:bg-teal-50 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            {refreshButton}
          </button>
          <button
            onClick={onReset}
            className="px-8 py-3 bg-teal-500 text-white text-lg font-bold rounded-full hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            {resetButton}
          </button>
      </div>
    </div>
  );
};

export default QuoteDisplay;