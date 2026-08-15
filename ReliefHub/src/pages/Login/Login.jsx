function Login({ onLogin, onRegisterClick }) {
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
            <button type="button" className="switch-btn active">
              Sign In
            </button>
            <button
              type="button"
              className="switch-btn"
              onClick={onRegisterClick}
            >
              Register
            </button>
          </div>

          <form className="auth-form" onSubmit={onLogin}>
            <h2>Welcome back</h2>
            <p className="subtitle">
              Enter your account details to continue to ReliefHub.
            </p>

            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                defaultValue="you@example.com"
              />
            </label>

            <label>
              Password
              <input type="password" placeholder="Enter your password" />
            </label>

            <div className="remember-row">
              <label className="check-row">
                <input type="checkbox" />
                Remember me
              </label>
              <button type="button" className="link-button">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="primary-button">
              Sign In
            </button>

            <p className="helper-text">
              Don’t have an account?
              <button
                type="button"
                className="link-button inline"
                onClick={onRegisterClick}
              >
                Create an account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
