import { NavItem } from '@/types';

export const DEFAULT_SUGGESTIONS_LIMIT = '7';
// export const DEFAULT_EMAIL_PATH = `https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=myrskyi.work@gmail.com`;
export const EMAIL_PATH = `mailto:myrskyi.work@gmail.com`;
export const TWITTER_PATH = 'https://x.com/myrsk_pavlo';
export const DISCORD_PATH = 'https://discord.gg/n7mrzyWT';
export const TELEGRAM_PATH = 'https://t.me/pavlo_myrskyi';
export const INSTAGRAM_PATH = 'https://www.instagram.com/myrskyi.pavlo/';
export const TRELLO_PATH = 'https://trello.com/b/TelXBqrK';
export const FEATURE_FORM_PATH = 'https://forms.gle/dvTboTYzWcmo7iP96';
export const TUTORIAL_PATH = 'https://youtu.be/8r-vxnW4kAQ';

export const ORDER_REF_STORAGE_TITLE = 'currentOrderReference';

export const S3_COURSE_THUMBNAIL_URL =
  'https://levenue-minicourses.s3.us-east-1.amazonaws.com/thumbnails';
export const S3_CATEGORY_THUMBNAIL_URL =
  'https://levenue-minicourses.s3.us-east-1.amazonaws.com/categories/thumbnails';

export const company = {
  name: 'Levenue MiniCourses',
  logo: `/images/logo.png`,
  // plan: 'Enterprise',
  description: 'AI Course network'
};

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Home',
    url: '/dashboard/overview',
    icon: 'house',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Explore',
    url: '/dashboard/roadmaps/explore',
    icon: 'explore',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Library',
    url: '/dashboard/roadmaps/library',
    icon: 'book',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [], // Empty array as there are no child items for Dashboard
    separator: true
  },
  {
    title: 'Create',
    url: '/dashboard/roadmaps/create',
    icon: 'badgePlus',
    isActive: false,
    shortcut: ['u', 'u'],
    items: []
  }
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,
  //
  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // }
];
