'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function InputFormPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: '',
    time: 30,
    experience: 'Beginner'
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      {step === 1 && (
        <>
          <h1 className="mb-4 text-2xl font-bold">
            What do you want to learn?
          </h1>
          <Input
            placeholder="Enter a topic (e.g., Python)"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
          />
          <Button className="mt-4" onClick={handleNext}>
            Next
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="mb-4 text-2xl font-bold">
            How much time can you spend per day?
          </h1>
          <Slider
            min={15}
            max={120}
            step={15}
            value={[formData.time]}
            onValueChange={(value) =>
              setFormData({ ...formData, time: value[0] })
            }
          />
          <p className="mt-2">Selected: {formData.time} minutes/day</p>
          <div className="mt-4 flex gap-4">
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="mb-4 text-2xl font-bold">
            What is your experience level?
          </h1>
          <div className="flex gap-4">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <Button
                key={level}
                variant={formData.experience === level ? 'default' : 'ghost'}
                onClick={() => setFormData({ ...formData, experience: level })}
              >
                {level}
              </Button>
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h1 className="mb-4 text-2xl font-bold">Review Your Selections</h1>
          <p className="mb-2">Topic: {formData.topic}</p>
          <p className="mb-2">Time: {formData.time} minutes/day</p>
          <p className="mb-2">Experience Level: {formData.experience}</p>
          <Button
            className="mt-4"
            onClick={() => alert('Generating your roadmap...')}
          >
            Generate My Roadmap
          </Button>
        </>
      )}
    </main>
  );
}
