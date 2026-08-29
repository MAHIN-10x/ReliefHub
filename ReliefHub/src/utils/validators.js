/**
 * Frontend Validation Helpers
 * Provides clean, beginner-friendly validation rules for ReliefHub forms.
 */

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email address is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password, minLength = 6) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  return '';
};

export const validateMatch = (value1, value2, fieldName = 'Passwords') => {
  if (!value2) {
    return `Please confirm your ${fieldName.toLowerCase()}`;
  }
  if (value1 !== value2) {
    return `${fieldName} do not match`;
  }
  return '';
};

export const validateRequired = (value, fieldName = 'This field') => {
  if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return '';
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return 'Phone number is required';
  }
  const phoneRegex = /^[0-9+\s\-()]{7,18}$/;
  if (!phoneRegex.test(phone.trim())) {
    return 'Please enter a valid phone number';
  }
  return '';
};

export const validatePositiveNumber = (num, fieldName = 'Number') => {
  const parsed = Number(num);
  if (isNaN(parsed) || parsed <= 0) {
    return `${fieldName} must be greater than 0`;
  }
  return '';
};
