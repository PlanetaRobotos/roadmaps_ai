import React from 'react';
import { useRouter } from 'next/router';

export default function LessonNavigation() {
  const router = useRouter();

  const handlePrevious = () => {
    // Logic to navigate to the previous lesson
  };

  const handleNext = () => {
    // Logic to navigate to the next lesson
  };

  return (
    <div className="lesson-navigation mt-6">
      <button onClick={handlePrevious} className="btn btn-secondary mr-2">
        Previous Lesson
      </button>
      <button onClick={handleNext} className="btn btn-primary">
        Next Lesson
      </button>
    </div>
  );
}
