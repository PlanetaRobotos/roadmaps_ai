import { ReactNode } from 'react';

interface ScrollablePageProps {
  children: ReactNode;
  className?: string;
  maxHeight?: string; // Available options: h-screen, h-[calc(100vh-64px)], etc.
  direction?: 'vertical' | 'horizontal' | 'both';
}

const ScrollablePage = ({
  children,
  className = '',
  maxHeight = 'h-screen',
  direction = 'vertical'
}: ScrollablePageProps) => {
  const getScrollClass = () => {
    switch (direction) {
      case 'horizontal':
        return 'overflow-x-auto overflow-y-hidden';
      case 'both':
        return 'overflow-auto';
      default:
        return 'overflow-y-auto overflow-x-hidden';
    }
  };

  return (
    <div
      className={`
        ${maxHeight}
        ${getScrollClass()}
        ${className}
        scrollbar-thin
        scrollbar-thumb-gray-400
        scrollbar-track-gray-100
      `}
    >
      {children}
    </div>
  );
};

export default ScrollablePage;
