import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  icon: Icon,
  className = '',
  ...props
}) => {
  const classes = [
    'relief-btn',
    `relief-btn--${variant}`,
    `relief-btn--${size}`,
    fullWidth ? 'relief-btn--full' : '',
    disabled ? 'relief-btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && <span className="relief-btn-icon"><Icon size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} /></span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
