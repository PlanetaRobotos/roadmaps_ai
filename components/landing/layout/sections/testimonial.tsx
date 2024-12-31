'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
  stars?: number;
  link?: string;
}

const reviewList: ReviewProps[] = [
  {
    image: '/images/reddit/red-man.png',
    name: 'Nate Khats',
    userName: 'Chief Technology Officer',
    comment: `That’s <color>something fresh tbh</color>, I just created a small course on pyspark and the generated content turned out to be pretty accurate.`,
    rating: 4.9,
    stars: 5,
    link: 'https://www.reddit.com/r/SaaS/comments/1hp0fd8/comment/m4kf6ke/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'
  },
  {
    image: '/images/reddit/wild-man.png',
    name: 'Flounder',
    userName: 'Cybersecurity Analyst',
    comment: `Works really cool. It <color>for sure will help me</color> with my exams. <br/><br/> Creating cards on your own is exhausting.`,
    rating: 3.5,
    link: 'https://www.reddit.com/r/SaaS/comments/1hp0fd8/comment/m4kcnqn/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'
  },
  {
    image: '/images/reddit/black-girl.png',
    name: 'Affirmations',
    userName: 'Data Scientist',
    comment: `The idea of creating <color>visually appealing, quick courses</color> is fantastic—especially with how easy it seems to use. <br/><br/> Excited to see how it evolves with future features 🚀`,
    rating: 5.0,
    link: 'https://www.reddit.com/r/SaaS/comments/1hp0fd8/comment/m4itxsc/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'
  },
  {
    image: '/images/reddit/black-man.png',
    name: 'Douchebag',
    userName: 'Product Manager',
    comment: `Love how it can create literally course on <color>anything you can think of</color>, like someone added course on "how to make butter chicken" 😄 <br/><br/>Overall - <color>very good product!</color>`,
    rating: 5.0,
    stars: 5,
    link: 'https://www.reddit.com/r/SaaS/comments/1hp0fd8/comment/m4kkot5/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'
  },
  {
    image: '/images/reddit/black-girl.png',
    name: 'Organization Sea',
    userName: 'IT Project Manager',
    comment: `Whoa, I literally just <color>made a mini-course in under 1 minute.</color>`,
    rating: 5.0,
    link: 'https://www.reddit.com/r/SaaS/comments/1hp0fd8/comment/m4lpfy5/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'
  },
  {
    image: '/images/reddit/wild-man.png',
    name: 'Spiritual Wave',
    userName: 'IT Project Manager',
    comment: `Went in skeptical, but I’m actually <color>learning way faster with these bite-sized lessons.</color>`,
    rating: 5.0,
    stars: 5,
    link: 'https://www.reddit.com/r/SaaS/comments/1hp0fd8/comment/m4kj09o/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'
  }
];

export function HighlightedComment({ comment }: { comment: string }) {
  const transformedComment = comment.replace(
    /<color>(.*?)<\/color>/gs,
    `<span class="bg-primary/40">$1</span>`
  );

  return <div dangerouslySetInnerHTML={{ __html: transformedComment }} />;
}

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">Reviews</h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Join 1,858 community makers
        </h2>
      </div>

      <div
        className="mx-auto w-[80%] columns-1 gap-6
     sm:w-[90%] sm:columns-2 lg:max-w-screen-xl lg:columns-3 xl:columns-4"
      >
        {reviewList.map((review, index) => (
          <div key={index} className="mb-6 break-inside-avoid">
            <Card className="bg-muted/50 dark:bg-card">
              <CardHeader>
                <HighlightedComment comment={review.comment} />

                {review.stars && (
                  <div className="flex gap-1 pb-6 pt-3">
                    {Array.from({ length: review.stars }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="size-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                )}
                <Separator />
                <div className="flex items-center gap-4 pt-3">
                  <Avatar>
                    <AvatarImage src={review.image} alt="radix" />
                    <AvatarFallback>
                      {review.name.slice(0, 2)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    {review.link ? (
                      <Link href={review.link} className="underline">
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                      </Link>
                    ) : (
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
