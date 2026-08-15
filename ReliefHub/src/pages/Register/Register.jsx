function Register({ onRegister, onLoginClick }) {
  return (
    <div className="auth-layout">
      <div className="hero-panel">
        <div className="brand-row">
          <span className="brand-name">ReliefHub</span>
        </div>

        <div className="hero-badge">LIVE DISASTER RESPONSE PLATFORM</div>

        <h1 className="hero-title">
          When disaster strikes,
          <span>every second matters.</span>
        </h1>

        <p className="hero-text">
          ReliefHub connects disaster victims, volunteers, NGOs and emergency
          agencies so help can reach the people who need it faster.
        </p>

        <ul className="hero-list">
          <li>Respond to emergency requests faster</li>
          <li>Connect volunteers and NGOs</li>
          <li>Coordinate available shelters</li>
        </ul>
      </div>

      <div className="form-panel">
        <div className="auth-card">
          <div className="switch-row">
            <button type="button" className="switch-btn" onClick={onLoginClick}>
              Sign In
            </button>
            <button type="button" className="switch-btn active">
              Register
            </button>
          </div>

          <form className="auth-form" onSubmit={onRegister}>
            <h2>Create account</h2>
            <p className="subtitle">
              Join the ReliefHub disaster response network.
            </p>

            <label>
              Full name
              <input type="text" placeholder="Your full name" />
            </label>

            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                defaultValue="you@example.com"
              />
            </label>

            <label>
              I want to join as
              <select defaultValue="">
                <option value="" disabled>
                  Select your role
                </option>
                <option>Volunteer</option>
                <option>Victim / Person Seeking Help</option>
                <option>NGO / Organization</option>
                <option>Emergency Responder</option>
              </select>
            </label>

            <label>
              Password
              <input type="password" placeholder="At least 8 characters" />
            </label>

            <label>
              Confirm password
              <input type="password" placeholder="Re-enter your password" />
            </label>

            <button type="submit" className="primary-button">
              Create Account
            </button>

            <p className="helper-text">
              Already have an account?
              <button
                type="button"
                className="link-button inline"
                onClick={onLoginClick}
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
