import React from 'react';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  padding = 'normal', // 'none' | 'sm' | 'normal' | 'lg'
  ...props
}) => {
  const classes = [
    'relief-card',
    `relief-card--${variant}`,
    `relief-card--pad-${padding}`,
    onClick ? 'relief-card--clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
