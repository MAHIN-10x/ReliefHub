import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <header className="navbar">
        <div className="logo">
          <span>🛟</span> ReliefHub
        </div>
        <nav>
          <a href="#services">Services</a>
          <a href="#emergency">Emergency</a>
          <a href="#donate">Donate</a>
        </nav>
        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn btn-solid">Register</Link>
        </div>
      </header>

      <section className="hero">
        <span className="badge">● LIVE DISASTER RESPONSE PLATFORM</span>
        <h1>When disaster strikes, every second matters.</h1>
        <p>
          ReliefHub connects disaster victims, volunteers, NGOs and emergency
          agencies in one platform so help can reach the people who need it faster.
        </p>
        <div className="hero-actions">
          <a href="#emergency" className="btn btn-danger">🚨 Report Emergency</a>
          <a href="#services" className="btn btn-light">Explore ReliefHub</a>
        </div>
      </section>

      <section className="stats">
        <div className="stat"><strong>128</strong><small>Active Emergencies</small></div>
        <div className="stat"><strong>542</strong><small>Available Volunteers</small></div>
        <div className="stat"><strong>34</strong><small>Partner NGOs</small></div>
        <div className="stat"><strong>27</strong><small>Active Shelters</small></div>
      </section>

      <section id="services" className="services">
        <h2>How ReliefHub Helps</h2>
        <div className="cards">
          <div className="card">
            <div className="icon">🚨</div>
            <h3>Report Emergency</h3>
            <p>Send a request with location, disaster type and required assistance.</p>
          </div>
          <div className="card">
            <div className="icon">🤝</div>
            <h3>Volunteer Missions</h3>
            <p>Find nearby missions and help with rescue, food and transport.</p>
          </div>
          <div className="card">
            <div className="icon">🏠</div>
            <h3>Find Shelter</h3>
            <p>See nearby shelters and check capacity, food and medical supplies.</p>
          </div>
          <div className="card">
            <div className="icon">💰</div>
            <h3>Donate & Track</h3>
            <p>Support verified campaigns and track how funds are distributed.</p>
          </div>
        </div>
      </section>

      <section id="emergency" className="emergency-banner">
        <div>
          <h3>Need urgent assistance?</h3>
          <p>Submit your location and emergency details to the response team.</p>
        </div>
        <button className="btn btn-danger">Report Emergency</button>
      </section>

      <section id="donate" className="donate">
        <h2>Active Relief Campaign</h2>
        <div className="campaign-card">
          <h3>🌊 Bangladesh Flood Relief 2026</h3>
          <p>Emergency food, clean water and medicine for flood-affected families.</p>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: "65%" }}></div>
          </div>
          <p><strong>৳327,500</strong> raised of <strong>৳500,000</strong></p>
          <button className="btn btn-solid">Donate Now</button>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 ReliefHub — Faster help, stronger communities.</p>
      </footer>
    </div>
  );
}

export default Home;
