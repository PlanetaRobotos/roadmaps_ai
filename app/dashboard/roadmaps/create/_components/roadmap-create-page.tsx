'use client';

import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SearchInput from '@/app/dashboard/roadmaps/_components/search-input';
import { motion, AnimatePresence } from 'framer-motion';
import { useRoadmapStore } from '@/store/useRoadmapStore'; // For animations
import RoadmapPreview from '@/components/roadmaps/roadmap-preview';

interface RoadmapFormData {
  title: string;
  estimatedDuration: number;
}

export default function RoadmapCreatePage() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = useForm<RoadmapFormData>({
    defaultValues: {
      title: ''
    }
  });

  // Zustand store actions and states
  const {
    title,
    selectedTime,
    roadmapPreview,
    isGenerating,
    setTitle,
    setSelectedTime,
    generateRoadmap,
    reset: resetRoadmap
  } = useRoadmapStore();

  const onSubmit: SubmitHandler<RoadmapFormData> = async (data) => {
    setTitle(data.title);
    setSelectedTime(data.estimatedDuration);
    generateRoadmap();
    reset();
  };

  const saveRoadmap = () => {
    // Implement your save logic here
    alert('Roadmap saved successfully!');
  };

  const shareRoadmap = () => {
    // Implement your share logic here (e.g., copy to clipboard, share via social media)
    alert('Roadmap shared successfully!');
  };

  return (
    <div className="flex min-h-screen items-center justify-center  p-4">
      <AnimatePresence>
        {/* Form Section */}
        {!roadmapPreview && (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6 rounded-lg p-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-center text-2xl font-bold">
              What can I help with?
            </h2>

            {/* Title Field */}
            <div>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <SearchInput
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setTitle(value); // Update Zustand store
                    }}
                  />
                )}
              />
            </div>

            {/* Time Commitment Buttons */}
            {title && (
              <div className="mt-6 flex justify-center space-x-4">
                {/* 15 Minutes Button */}
                <Button
                  type="button"
                  variant={selectedTime === 15 ? 'default' : 'secondary'}
                  onClick={() => setSelectedTime(15)}
                  className="w-18 rounded-full"
                  aria-label="Quick Start - 15 minutes"
                >
                  <span className="text-lg font-semibold">15m</span>
                </Button>

                {/* 30 Minutes Button */}
                <Button
                  type="button"
                  variant={selectedTime === 30 ? 'default' : 'secondary'}
                  onClick={() => setSelectedTime(30)}
                  className="w-18 rounded-full"
                  aria-label="Overview - 30 minutes"
                >
                  <span className="text-lg font-semibold">30m</span>
                </Button>

                {/* 1 Hour Button */}
                <Button
                  type="button"
                  variant={selectedTime === 60 ? 'default' : 'secondary'}
                  onClick={() => setSelectedTime(60)}
                  className="w-18 rounded-full"
                  aria-label="Deep Dive - 1 hour"
                >
                  <span className="text-lg font-semibold">1h</span>
                </Button>
              </div>
            )}

            {/* Generate Roadmap Button */}
            {title && selectedTime && !roadmapPreview && (
              <div className="mt-6 flex justify-center">
                <Button
                  type="button"
                  variant="default"
                  onClick={() => generateRoadmap()} // Corrected: No parameters
                  className="px-6 py-3"
                  disabled={isGenerating} // Disable while generating
                >
                  {isGenerating ? 'Generating...' : 'Generate Roadmap'}
                </Button>
              </div>
            )}

            {/* Loading Message */}
            {isGenerating && (
              <div className="mt-6 flex items-center justify-center text-gray-500">
                <span className="mr-2">Cooking up your roadmap magic!</span>
                {/* Spinner Icon */}
                <svg
                  className="h-5 w-5 animate-spin text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </div>
            )}
          </motion.form>
        )}

        {/* Roadmap Preview Section */}
        {roadmapPreview && (
          <motion.div
            className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-center text-xl font-semibold">
              Your Roadmap
            </h3>
            <RoadmapPreview roadmapItems={roadmapPreview} />
            <div className="mt-6 flex justify-center space-x-4">
              <Button
                type="button"
                variant="default"
                onClick={saveRoadmap}
                className="px-6 py-3"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={shareRoadmap}
                className="px-6 py-3"
              >
                Share
              </Button>
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  reset(); // Reset react-hook-form
                  resetRoadmap(); // Reset Zustand store
                }}
                className="px-6 py-3"
              >
                Create Another Roadmap
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
