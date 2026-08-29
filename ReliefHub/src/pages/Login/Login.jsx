import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthBranding from '../../components/auth/AuthBranding';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import { validateEmail, validatePassword } from '../../utils/validators';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, authError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field-level error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password, 6);

    if (emailErr || passErr) {
      setErrors({
        email: emailErr,
        password: passErr,
      });
      return;
    }

    setErrors({});
    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      setSuccessMessage('Welcome back! Redirecting to Home...');
      setTimeout(() => {
        navigate('/');
      }, 800);
    }
  };

  return (
    <div className="relief-auth-page">
      {/* Left Branding Panel */}
      <AuthBranding />

      {/* Right Form Card Panel */}
      <div className="relief-auth-form-pane">
        <div className="relief-auth-card">
          {/* Top Segmented Pill Toggle */}
          <div className="relief-segmented-toggle">
            <button
              type="button"
              className="relief-toggle-btn relief-toggle-btn--active"
            >
              Sign In
            </button>
            <button
              type="button"
              className="relief-toggle-btn"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>

          {/* Heading */}
          <h2 className="relief-auth-title">Welcome back</h2>
          <p className="relief-auth-desc">
            Enter your account details to continue to ReliefHub.
          </p>

          {/* Success / Error alerts */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="relief-auth-form" noValidate>
            {/* Email Field */}
            <div className="relief-field-group">
              <label htmlFor="login-email" className="relief-field-label">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`relief-input ${errors.email ? 'relief-input--error' : ''}`}
                autoComplete="email"
              />
              {errors.email && (
                <span className="relief-field-error">{errors.email}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="relief-field-group">
              <label htmlFor="login-password" className="relief-field-label">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`relief-input ${errors.password ? 'relief-input--error' : ''}`}
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="relief-field-error">{errors.password}</span>
              )}
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="relief-auth-options-row">
              <label className="relief-checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="relief-checkbox"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="relief-forgot-link"
                onClick={() => alert('Password reset will be available once the backend is connected.')}
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              className="relief-auth-submit-btn"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Bottom Switch Link */}
          <div className="relief-auth-bottom-switch">
            <span>Don't have an account? </span>
            <Link to="/register" className="relief-auth-link-bold">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
