import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Quiz } from '@/types/roadmap-types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { updateQuizStatus } from '@/services/roadmapsService';

interface QuizCardProps {
  quiz: Quiz;
  userId?: number;
  selectedIndex?: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, userId }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOptionSelect = async (option: string) => {
    const selectedIndex = quiz.options.indexOf(option);
    const correct = selectedIndex === quiz.correctAnswer;

    setSelectedOption(option);
    setIsCorrect(correct);

    try {
      if (userId) {
        setLoading(true);
        console.log('selected index', selectedIndex);
        await updateQuizStatus(userId, quiz.id, selectedIndex);
      }
    } catch (error) {
      console.error('Failed to update quiz status:', error);
    } finally {
      setLoading(false); // Hide loading state once API call is finished
    }
  };

  return (
    <Card className="flex h-full w-full flex-col rounded-lg border bg-white p-6 shadow-lg">
      <CardHeader className="mb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          {quiz.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {quiz.options.map((option, index) => (
          <Button
            key={index}
            variant={
              selectedOption === option
                ? isCorrect
                  ? 'default'
                  : 'destructive'
                : 'outline'
            }
            onClick={() => handleOptionSelect(option)}
            disabled={selectedOption !== null || loading} // Disable if already selected or loading
            className="text-left"
          >
            {loading && selectedOption === option ? 'Submitting...' : option}
          </Button>
        ))}
        {isCorrect !== null && (
          <p
            className={`bottom-0 text-lg ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isCorrect
              ? 'Correct!'
              : `Incorrect. The correct answer is "${
                  quiz.options[quiz.correctAnswer]
                }".`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;
