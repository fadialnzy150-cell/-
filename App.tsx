// FIX: Implement the main App component to orchestrate the application flow.
import React, { useState, useCallback } from 'react';
import Quiz from './components/Quiz';
import QuoteDisplay from './components/QuoteDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { findQuote } from './services/geminiService';
import { QuoteResult } from './types';
import { translations } from './translations';

type Language = 'en' | 'ar';

function App() {
  const [mood, setMood] = useState<string | null>(null);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  const handleFindQuote = useCallback(async (currentMood: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setMood(currentMood);

    try {
      const quoteResult = await findQuote(currentMood);
      setResult(quoteResult);
    } catch (err) {
      setError(t.error);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [t.error]);

  const handleReset = () => {
    setMood(null);
    setResult(null);
    setError(null);
  };
  
  const handleRefresh = () => {
    if (mood) {
      handleFindQuote(mood);
    }
  };

  const toggleLanguage = () => {
    setLang(prevLang => (prevLang === 'en' ? 'ar' : 'en'));
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner message={t.loadingMessage} />;
    }
    if (error) {
      return (
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-teal-500 text-white text-lg font-bold rounded-full hover:bg-teal-600 transition-all duration-300"
          >
            {t.resetButton}
          </button>
        </div>
      );
    }
    if (result && mood) {
      return (
        <QuoteDisplay
          mood={mood}
          result={result}
          onReset={handleReset}
          onRefreshQuote={handleRefresh}
          lang={lang}
          resultTitle={t.resultTitle}
          resetButton={t.resetButton}
          refreshButton={t.refreshButton}
          originLabel={t.originLabel}
          adviceLabel={t.adviceLabel}
        />
      );
    }
    return (
      <Quiz
        onFindQuote={handleFindQuote}
        lang={lang}
        quizTitle={t.quizTitle}
        placeholder={t.placeholder}
        submitButton={t.submitButton}
      />
    );
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans transition-all duration-500">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-white border border-gray-300 rounded-full text-teal-600 hover:bg-gray-100 transition-colors"
        >
          {t.languageToggle}
        </button>
      </div>
      
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-teal-600 mb-2">{t.title}</h1>
        <p className="text-xl text-gray-500">{t.subtitle}</p>
      </header>

      <main className="w-full">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
