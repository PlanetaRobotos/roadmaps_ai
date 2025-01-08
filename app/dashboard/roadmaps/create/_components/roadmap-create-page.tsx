'use client';

import React, { useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SearchInput from '@/app/dashboard/roadmaps/_components/search-input';
import { motion, AnimatePresence } from 'framer-motion';
import { useRoadmapStore } from '@/store/useRoadmapStore';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { AuthContext } from '@/context/auth-context';
import AuthCallback from '@/app/(auth)/_components/callback';
import { Icons } from '@/components/icons';
import { SpinnerMinimalistic } from '@/components/helper-icon';
import { toast } from 'sonner';
import useTokenBalance from '@/hooks/useTokenBalance';

interface RoadmapFormData {
  title: string;
  estimatedDuration: number;
}

export default function RoadmapCreatePage() {
  const router = useRouter();
  const { user, openAuthDialog } = useContext(AuthContext);
  const { tokens, updateTokens } = useTokenBalance();

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
    price,
    setPrice,
    reset: resetRoadmap
  } = useRoadmapStore();

  const onSubmit: SubmitHandler<RoadmapFormData> = async (data) => {
    if (!user) {
      openAuthDialog();
      return;
    }

    console.log(`tokens:, ${tokens}, price: ${price}`);
    if (tokens !== -1 && tokens < price) {
      toast.error(`You need more coins to generate this roadmap.`);
      return;
    }

    updateTokens(tokens - price);
    const newRoadmap = await generateRoadmap(user?.id);
    console.log('newRoadmap:', newRoadmap);

    if (newRoadmap) {
      await axios.post(`/v1/users/${user?.id}/roadmaps/${newRoadmap.id}`);

      router.push(`/dashboard/roadmaps/edit/${newRoadmap.id}`);
    }
  };
  // return (
  //   <Button
  //     onClick={() => {
  //       updateTokens(5);
  //       console.log('here');
  //     }}
  //   />
  // );

  return (
    <>
      <div className="flex h-full items-start justify-center pt-[20vh]">
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
                <div>
                  <div className="mt-6 flex justify-center space-x-4">
                    {/* 15 Minutes Button */}
                    <Button
                      type="button"
                      variant={selectedTime === 15 ? 'default' : 'secondary'}
                      onClick={() => {
                        setSelectedTime(15);
                        setPrice(3);
                      }}
                      className="w-18 rounded-full"
                      aria-label="Quick Start - 15 minutes"
                    >
                      <span className="text-lg font-semibold">15m</span>
                    </Button>

                    {/* 30 Minutes Button */}
                    <Button
                      type="button"
                      variant={selectedTime === 30 ? 'default' : 'secondary'}
                      onClick={() => {
                        setSelectedTime(30);
                        setPrice(5);
                      }}
                      className="w-18 rounded-full"
                      aria-label="Overview - 30 minutes"
                    >
                      <span className="text-lg font-semibold">30m</span>
                    </Button>

                    {/* 1 Hour Button */}
                    <Button
                      type="button"
                      variant={selectedTime === 60 ? 'default' : 'secondary'}
                      onClick={() => {
                        setSelectedTime(60);
                        setPrice(7);
                      }}
                      className="w-18 rounded-full"
                      aria-label="Deep Dive - 1 hour"
                    >
                      <span className="text-lg font-semibold">1h</span>
                    </Button>
                  </div>
                  <div className="mt-2 flex justify-center opacity-50">
                    <span className="text-sm italic text-muted-foreground">
                      Select Time Commitment
                    </span>
                  </div>
                </div>
              )}

              {/* Generate Roadmap Button */}
              {title && selectedTime && !roadmapPreview && (
                <div className="mt-6 flex justify-center">
                  <Button
                    type="submit"
                    variant="default"
                    className="relative px-6 py-3"
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Course'}
                    <div className="absolute right-0 inline-flex translate-x-1/2 translate-y-[-50%] items-center rounded-full bg-primary px-2 py-1 font-bold">
                      {price}
                      <Icons.coin className="ml-1 h-4 w-4 stroke-blue-500" />
                    </div>
                  </Button>
                </div>
              )}

              {/* Loading Message */}
              {isGenerating && (
                <div className="mt-6 flex items-center justify-center text-gray-500">
                  <span className="mr-2">Cooking up your course magic!</span>
                  {/* Spinner Icon */}
                  <SpinnerMinimalistic />
                </div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
