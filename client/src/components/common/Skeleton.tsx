import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  variant?: 'text' | 'title' | 'avatar' | 'rect';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
}) => {
  const variantClass = styles[variant] || styles.text;
  const customStyles: React.CSSProperties = {
    width,
    height,
    ...style,
  };

  return (
    <div
      className={`${styles.skeleton} ${variantClass} ${className}`}
      style={customStyles}
    />
  );
};

export default Skeleton;
