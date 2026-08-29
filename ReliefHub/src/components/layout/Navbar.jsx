import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, AlertTriangle, HeartHandshake, Shield, User, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="relief-navbar-wrapper">
      <nav className="relief-navbar container">
        {/* Brand Logo */}
        <Link to="/" className="relief-brand" onClick={handleLinkClick}>
          <div className="relief-brand-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path
                d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
                fill="#e05252"
              />
              <circle cx="12" cy="12" r="3.5" fill="#ffffff" />
            </svg>
          </div>
          <span className="relief-brand-name">ReliefHub</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="relief-nav-links">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `relief-nav-item ${isActive ? 'relief-nav-item--active' : ''}`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              `relief-nav-item relief-nav-item--emergency ${isActive ? 'relief-nav-item--active' : ''}`
            }
          >
            Emergency
          </NavLink>

          <NavLink
            to="/donate"
            className={({ isActive }) =>
              `relief-nav-item ${isActive ? 'relief-nav-item--active' : ''}`
            }
          >
            Donate
          </NavLink>

          <NavLink
            to="/volunteers"
            className={({ isActive }) =>
              `relief-nav-item ${isActive ? 'relief-nav-item--active' : ''}`
            }
          >
            Volunteers
          </NavLink>

          <NavLink
            to="/shelters"
            className={({ isActive }) =>
              `relief-nav-item ${isActive ? 'relief-nav-item--active' : ''}`
            }
          >
            Shelters
          </NavLink>
        </div>

        {/* Right Actions (Auth / User) */}
        <div className="relief-nav-actions">
          {isAuthenticated ? (
            <div className="relief-user-menu">
              <span className="relief-user-pill">
                <User size={15} />
                <span className="relief-user-name">{user?.name || 'User'}</span>
              </span>
              <button
                className="relief-logout-btn"
                onClick={handleLogout}
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="relief-auth-links">
              <Link to="/login" className="relief-nav-auth-link">
                Sign In
              </Link>
              <Link to="/register" className="relief-nav-register-btn">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            className="relief-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="relief-mobile-drawer">
          <div className="relief-mobile-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relief-mobile-item ${isActive ? 'relief-mobile-item--active' : ''}`
              }
              onClick={handleLinkClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `relief-mobile-item ${isActive ? 'relief-mobile-item--active' : ''}`
              }
              onClick={handleLinkClick}
            >
              Services
            </NavLink>
            <NavLink
              to="/emergency"
              className={({ isActive }) =>
                `relief-mobile-item relief-mobile-item--danger ${isActive ? 'relief-mobile-item--active' : ''}`
              }
              onClick={handleLinkClick}
            >
              Emergency
            </NavLink>
            <NavLink
              to="/donate"
              className={({ isActive }) =>
                `relief-mobile-item ${isActive ? 'relief-mobile-item--active' : ''}`
              }
              onClick={handleLinkClick}
            >
              Donate
            </NavLink>
            <NavLink
              to="/volunteers"
              className={({ isActive }) =>
                `relief-mobile-item ${isActive ? 'relief-mobile-item--active' : ''}`
              }
              onClick={handleLinkClick}
            >
              Volunteers
            </NavLink>
            <NavLink
              to="/shelters"
              className={({ isActive }) =>
                `relief-mobile-item ${isActive ? 'relief-mobile-item--active' : ''}`
              }
              onClick={handleLinkClick}
            >
              Shelters
            </NavLink>
            <NavLink
              to="/campaigns"
              className={({ isActive }) =>
                `relief-mobile-item ${isActive ? 'relief-mobile-item--active' : ''}`
              }
              onClick={handleLinkClick}
            >
              Campaigns
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relief-mobile-item ${isActive ? 'relief-mobile-item--active' : ''}`
              }
              onClick={handleLinkClick}
            >
              About ReliefHub
            </NavLink>

            <div className="relief-mobile-divider" />

            {isAuthenticated ? (
              <button
                className="relief-mobile-item relief-mobile-logout"
                onClick={handleLogout}
              >
                <LogOut size={18} /> Sign Out ({user?.name})
              </button>
            ) : (
              <div className="relief-mobile-auth-grid">
                <Link
                  to="/login"
                  className="relief-mobile-auth-btn relief-mobile-login"
                  onClick={handleLinkClick}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="relief-mobile-auth-btn relief-mobile-register"
                  onClick={handleLinkClick}
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
