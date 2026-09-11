import React from 'react';
import './Badge.css';


const Badge = ({
  children,
  variant = 'neutral',
  dot = false,
  className = '',
  size = 'md',
  ...props
}) => {
  const classes = [
    'relief-badge',
    `relief-badge--${variant}`,
    `relief-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {dot && <span className="relief-badge-dot" />}
      {children}
    </span>
  );
};

export default Badge;
