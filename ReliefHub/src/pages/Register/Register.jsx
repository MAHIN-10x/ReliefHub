import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthBranding from '../../components/auth/AuthBranding';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import {
  validateEmail,
  validatePassword,
  validateMatch,
  validatePhone,
  validateRequired,
} from '../../utils/validators';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, authError } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {
      fullName: validateRequired(formData.fullName, 'Full name'),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      location: validateRequired(formData.location, 'Location'),
      password: validatePassword(formData.password, 6),
      confirmPassword: validateMatch(formData.password, formData.confirmPassword, 'Passwords'),
    };

    if (!formData.agreeToTerms) {
      nextErrors.agreeToTerms = 'You must accept the terms to continue';
    }

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      password: formData.password,
    });

    if (result.success) {
      setSuccessMessage('Account created successfully! Redirecting to sign in...');
      setTimeout(() => navigate('/login'), 900);
    }
  };

  return (
    <div className="relief-auth-page">
      <AuthBranding />

      <div className="relief-auth-form-pane">
        <div className="relief-auth-card">
          <div className="relief-segmented-toggle">
            <button
              type="button"
              className="relief-toggle-btn"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
            <button
              type="button"
              className="relief-toggle-btn relief-toggle-btn--active"
            >
              Register
            </button>
          </div>

          <h2 className="relief-auth-title">Create your account</h2>
          <p className="relief-auth-desc">
            Join ReliefHub to respond, volunteer, and support communities in need.
          </p>

          {successMessage && (
            <div className="relief-form-alert relief-form-alert--success">
              {successMessage}
            </div>
          )}
          {authError && (
            <div className="relief-form-alert relief-form-alert--error">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="relief-auth-form" noValidate>
            <div className="relief-field-group">
              <label htmlFor="register-fullName" className="relief-field-label">
                Full name
              </label>
              <input
                id="register-fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={`relief-input ${errors.fullName ? 'relief-input--error' : ''}`}
              />
              {errors.fullName && <span className="relief-field-error">{errors.fullName}</span>}
            </div>

            <div className="relief-field-group">
              <label htmlFor="register-email" className="relief-field-label">
                Email address
              </label>
              <input
                id="register-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`relief-input ${errors.email ? 'relief-input--error' : ''}`}
                autoComplete="email"
              />
              {errors.email && <span className="relief-field-error">{errors.email}</span>}
            </div>

            <div className="relief-field-group">
              <label htmlFor="register-phone" className="relief-field-label">
                Phone number
              </label>
              <input
                id="register-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
                className={`relief-input ${errors.phone ? 'relief-input--error' : ''}`}
              />
              {errors.phone && <span className="relief-field-error">{errors.phone}</span>}
            </div>

            <div className="relief-field-group">
              <label htmlFor="register-location" className="relief-field-label">
                Location
              </label>
              <input
                id="register-location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City or district"
                className={`relief-input ${errors.location ? 'relief-input--error' : ''}`}
              />
              {errors.location && <span className="relief-field-error">{errors.location}</span>}
            </div>

            <div className="relief-field-group">
              <label htmlFor="register-password" className="relief-field-label">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={`relief-input ${errors.password ? 'relief-input--error' : ''}`}
                autoComplete="new-password"
              />
              {errors.password && <span className="relief-field-error">{errors.password}</span>}
            </div>

            <div className="relief-field-group">
              <label htmlFor="register-confirmPassword" className="relief-field-label">
                Confirm password
              </label>
              <input
                id="register-confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`relief-input ${errors.confirmPassword ? 'relief-input--error' : ''}`}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className="relief-field-error">{errors.confirmPassword}</span>
              )}
            </div>

            <label className="relief-checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="relief-checkbox"
              />
              <span>I agree to the terms and privacy policy</span>
            </label>
            {errors.agreeToTerms && (
              <span className="relief-field-error">{errors.agreeToTerms}</span>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              className="relief-auth-submit-btn"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="relief-auth-bottom-switch">
            <span>Already have an account? </span>
            <Link to="/login" className="relief-auth-link-bold">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
