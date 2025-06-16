import { ReactNode } from 'react';
import { classNames } from '@/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className, title }: CardProps) {
  return (
    <div className={classNames('bg-white rounded-lg shadow-sm border border-gray-200 p-6', className)}>
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}