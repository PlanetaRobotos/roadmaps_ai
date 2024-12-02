'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { RoadmapCreateRequest, RoadmapsClient } from '@/app/api/client';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const roadmapsClient = new RoadmapsClient('http://localhost:5501');

interface RoadmapFormData {
  title: string;
  topic: string;
  difficulty: string;
  estimatedDuration: number;
}

export default function CreateRoadmapPage() {
  const form = useForm<RoadmapFormData>({
    defaultValues: {
      title: '',
      topic: '',
      difficulty: 'Beginner',
      estimatedDuration: 1 // in hours
    }
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<RoadmapFormData> = async (data) => {
    try {
      // Create an instance of RoadmapCreateRequest and initialize it
      const requestBody = new RoadmapCreateRequest();
      requestBody.init({
        title: data.title,
        topic: data.topic,
        difficulty: data.difficulty,
        estimatedDuration: data.estimatedDuration
      });

      // Send the request to the backend
      const createdRoadmap = await roadmapsClient.create(requestBody);
      console.log('Roadmap created:', createdRoadmap);

      router.push('/dashboard'); // Redirect on success
    } catch (error) {
      console.error('Error creating roadmap:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Create a New Roadmap</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Field */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter roadmap title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Topic Field */}
            <FormField
              name="topic"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a topic (e.g., Web Development)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Difficulty Field */}
            <FormField
              name="difficulty"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger placeholder="Select difficulty" />
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estimated Duration Field */}
            <FormField
              name="estimatedDuration"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Duration (hours)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter duration in hours"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Create Roadmap
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
