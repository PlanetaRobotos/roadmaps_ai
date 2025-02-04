'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

// This allows to add custom title as well
const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
  '/dashboard/employee': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Employee', link: '/dashboard/employee' }
  ],
  '/dashboard/product': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Product', link: '/dashboard/product' }
  ],
  '/dashboard/roadmaps': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Roadmaps', link: '/dashboard/roadmaps' }
  ],
  '/dashboard/roadmaps/create': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Roadmaps', link: '/dashboard/roadmaps' },
    { title: 'Create', link: '/dashboard/roadmaps/create' }
  ],
  '/dashboard/roadmaps/library': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Roadmaps', link: '/dashboard/roadmaps' },
    { title: 'Library', link: '/dashboard/roadmaps/library' }
  ],
  '/dashboard/roadmaps/progress': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Roadmaps', link: '/dashboard/roadmaps' },
    { title: 'Progress', link: '/dashboard/roadmaps/progress' }
  ],
  '/dashboard/roadmaps/edit': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Roadmaps', link: '/dashboard/roadmaps' },
    { title: 'Edit', link: '/dashboard/roadmaps/edit' }
  ]
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Check if we have a custom mapping for this exact path
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // If no exact match, fall back to generating breadcrumbs from the path
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
