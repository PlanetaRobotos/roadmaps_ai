// src/components/QuizCard.tsx
import React, { useState } from 'react';
import { QuizCard } from '@/types/RoadmapTypes';
import { useRoadmapStore } from '@/store/useRoadmapStore';

interface QuizCardProps {
  quiz: QuizCard;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const toggleQuizCompletion = useRoadmapStore(
    (state) => state.toggleQuizCompletion
  );

  const handleOptionChange = (index: number) => {
    setSelectedAnswers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toggleQuizCompletion('', quiz.id, selectedAnswers); // Assuming moduleId is not needed here

    // Validate answers
    const isCorrect =
      selectedAnswers.length === quiz.correctAnswers.length &&
      selectedAnswers.every((ans) => quiz.correctAnswers.includes(ans));

    if (isCorrect) {
      alert('Correct! Well done.');
    } else {
      alert('Some answers are incorrect. Please try again.');
    }

    setSelectedAnswers([]); // Reset selections after submission
  };

  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-xl font-semibold">Quiz: {quiz.question}</h3>
      <form onSubmit={handleSubmit}>
        {quiz.options.map((option, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={`quiz-${quiz.id}-option-${index}`}
              name={`quiz-${quiz.id}-option-${index}`}
              value={index}
              checked={selectedAnswers.includes(index)}
              onChange={() => handleOptionChange(index)}
              className="mr-2 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={`quiz-${quiz.id}-option-${index}`}
              className="text-gray-700"
            >
              {option}
            </label>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
          disabled={selectedAnswers.length === 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuizCard;
