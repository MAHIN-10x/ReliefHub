import "./About.css";

function About() {
  return (
    <div className="about-page">
      <header className="about-navbar">
        <div className="about-logo">
          <span>🛟</span> ReliefHub
        </div>
        <nav className="about-nav">
          <a href="#mission">Mission</a>
          <a href="#impact">Impact</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#join">Join Us</a>
        </nav>
      </header>

      <main>
        <section className="about-hero">
          <div className="about-hero-text">
            <span className="about-badge">ABOUT RELIEFHUB</span>
            <h1>Helping communities recover faster, together.</h1>
            <p>
              ReliefHub is a disaster response platform built to connect people in
              crisis with the help they need—when they need it most. It brings
              emergency reporting, local coordination, and volunteer support into one
              simple, trusted system.
            </p>
          </div>
          <div className="about-hero-card">
            <h3>Our Mission</h3>
            <p>
              To make disaster response more organized, transparent, and immediate
              so no one is left without support during emergencies.
            </p>
          </div>
        </section>

        <section id="mission" className="about-section">
          <div className="section-heading">
            <span className="eyebrow">What We Stand For</span>
            <h2>Built for speed, trust, and community action.</h2>
          </div>

          <div className="mission-grid">
            <div className="mission-card">
              <div className="icon">⚡</div>
              <h3>Rapid Response</h3>
              <p>
                We help emergency teams and volunteers spot urgent needs quickly and
                coordinate action in real time.
              </p>
            </div>

            <div className="mission-card">
              <div className="icon">🤝</div>
              <h3>Community First</h3>
              <p>
                ReliefHub connects affected families, local volunteers, and partner
                organizations around shared needs and local recovery efforts.
              </p>
            </div>

            <div className="mission-card">
              <div className="icon">📊</div>
              <h3>Transparent Support</h3>
              <p>
                Clear updates, verified campaigns, and visible impact help people see
                exactly where support is going.
              </p>
            </div>
          </div>
        </section>

        <section id="impact" className="about-impact">
          <div className="impact-copy">
            <span className="eyebrow">Our Impact</span>
            <h2>Turning urgent needs into organized relief.</h2>
            <p>
              From floods and storms to shelter shortages and food insecurity,
              ReliefHub helps teams centralize requests, mobilize volunteers, and
              keep communities connected during critical moments.
            </p>
          </div>

          <div className="impact-stats">
            <div className="impact-item">
              <strong>24/7</strong>
              <span>Response Coordination</span>
            </div>
            <div className="impact-item">
              <strong>1 Platform</strong>
              <span>For crisis reporting and support</span>
            </div>
            <div className="impact-item">
              <strong>Local</strong>
              <span>Action, faster recovery</span>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="about-section steps-section">
          <div className="section-heading">
            <span className="eyebrow">How It Works</span>
            <h2>Simple steps, powerful relief.</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">01</span>
              <h3>Report</h3>
              <p>People share their emergency details, location, and urgent needs.</p>
            </div>
            <div className="step-card">
              <span className="step-number">02</span>
              <h3>Connect</h3>
              <p>Volunteers, NGOs, and agencies are matched to the right response.</p>
            </div>
            <div className="step-card">
              <span className="step-number">03</span>
              <h3>Respond</h3>
              <p>Resources, shelter, and support reach communities with speed.</p>
            </div>
          </div>
        </section>

        <section id="join" className="about-cta">
          <div>
            <span className="eyebrow">Join the Movement</span>
            <h2>Be part of a safer, more prepared future.</h2>
          </div>
          <button className="about-button">Get Involved</button>
        </section>
      </main>
    </div>
  );
}

export default About;
