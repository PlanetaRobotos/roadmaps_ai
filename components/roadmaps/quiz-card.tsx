import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Quiz } from '@/types/roadmap-types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { updateQuizStatus } from '@/services/roadmapsService';
import { Separator } from '@/components/ui/separator';

interface QuizCardProps {
  quiz: Quiz;
  userId?: number;
  initialSelectedIndex?: number | null;
  updateQuizStatus?: (
    userId: number,
    quizId: string,
    answerIndex: number
  ) => Promise<void>;
  onAuthorizeClick?: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  userId,
  updateQuizStatus,
  initialSelectedIndex,
  onAuthorizeClick
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialSelectedIndex !== undefined && initialSelectedIndex !== null) {
      const previouslySelectedOption = quiz.options[initialSelectedIndex];
      setSelectedOption(previouslySelectedOption);
      setIsCorrect(initialSelectedIndex === quiz.correctAnswer);
    }
  }, [initialSelectedIndex, quiz.options, quiz.correctAnswer]);

  const getButtonVariant = (
    option: string
  ):
    | 'default'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | 'secondary'
    | 'link'
    | 'success' => {
    // If user hasn’t selected an option yet:
    if (selectedOption === null) {
      return 'outline';
    }

    const optionIndex = quiz.options.indexOf(option);
    const isSelected = option === selectedOption;

    // If user answered correctly:
    if (isCorrect) {
      // The correct option is the one that was selected => success (green)
      if (isSelected) {
        return 'success';
      }
      // All other unselected => ghost/faded
      return 'ghost';
    }

    // If user answered incorrectly:
    // The correct option => success
    if (optionIndex === quiz.correctAnswer) {
      return 'success';
    }
    // The wrongly selected option => destructive
    if (isSelected) {
      return 'destructive';
    }
    // Everyone else => ghost/faded
    return 'ghost';
  };

  const handleOptionSelect = async (option: string) => {
    if (userId && updateQuizStatus) {
      try {
        const selectedIndex = quiz.options.indexOf(option);
        const correct = selectedIndex === quiz.correctAnswer;

        setSelectedOption(option);
        setIsCorrect(correct);

        setLoading(true);
        await updateQuizStatus(userId, quiz.id, selectedIndex);
      } catch (error) {
        console.error('Failed to update quiz status:', error);
      } finally {
        setLoading(false);
      }
    } else {
      onAuthorizeClick?.();
    }
  };

  return (
    <div className="h-full rounded-xl bg-blue-100 p-1">
      <Card className="flex h-full w-full flex-col bg-white">
        <CardHeader>
          <CardTitle>{quiz.question}</CardTitle>
        </CardHeader>

        {/* Optional: replicate the horizontal line from your example */}
        <Separator className="h-1 bg-blue-100" />

        <ScrollArea className="w-full flex-1 overflow-auto">
          <CardContent className="mt-4 flex flex-col space-y-4">
            {quiz.options.map((option, index) => (
              <Button
                key={index}
                variant={getButtonVariant(option)}
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null || loading}
                className="h-auto w-full whitespace-normal break-words"
              >
                {loading && selectedOption === option
                  ? 'Submitting...'
                  : option}
              </Button>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default QuizCard;
