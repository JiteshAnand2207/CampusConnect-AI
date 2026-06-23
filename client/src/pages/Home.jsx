const Home = () => {
  return (
    <main className="cc-home">
      <section className="cc-hero">
        <div className="cc-orb cc-orb-one"></div>
        <div className="cc-orb cc-orb-two"></div>
        <div className="cc-grid-glow"></div>

        <div className="cc-hero-content">
          <div className="cc-greeting-pill">
            <span className="cc-pulse-dot"></span>
            Welcome to CampusConnect AI
          </div>

          <h1 className="cc-hero-title">
            Your Smart Campus,
            <span> Connected In One Place.</span>
          </h1>

          <p className="cc-hero-subtitle">
            Manage college events, report campus issues, track notifications,
            and use an AI assistant built for students, organizers, and admins.
          </p>

          <div className="cc-hero-actions">
            <a href="/register" className="cc-primary-btn">
              Get Started
            </a>
            <a href="/events" className="cc-secondary-btn">
              Explore Events
            </a>
          </div>

          <div className="cc-mini-stats">
            <div>
              <strong>Events</strong>
              <span>Discover & register</span>
            </div>
            <div>
              <strong>Problems</strong>
              <span>Report campus issues</span>
            </div>
            <div>
              <strong>AI</strong>
              <span>Ask campus questions</span>
            </div>
          </div>
        </div>

        <div className="cc-hero-visual">
          <div className="cc-window">
            <div className="cc-window-top">
              <span></span>
              <span></span>
              <span></span>
              <p>campusconnect.ai</p>
            </div>

            <div className="cc-window-body">
              <aside className="cc-sidebar-preview">
                <h4>Campus Modules</h4>
                <p className="active">Dashboard</p>
                <p>Events</p>
                <p>Problems</p>
                <p>AI Assistant</p>
              </aside>

              <div className="cc-code-preview">
                <div className="cc-code-line glow"></div>
                <div className="cc-code-line short"></div>
                <div className="cc-code-line"></div>
                <div className="cc-code-line medium"></div>

                <div className="cc-preview-card">
                  <span>Live Status</span>
                  <strong>Campus system running smoothly</strong>
                  <small>Events, tickets, reports and AI are online.</small>
                </div>

                <div className="cc-card-row">
                  <div className="cc-small-card">
                    <span>24/7</span>
                    <p>Campus access</p>
                  </div>
                  <div className="cc-small-card">
                    <span>AI</span>
                    <p>Smart assistant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cc-floating-card cc-float-one">
            <span>New Event</span>
            <strong>Tech Fest registration open</strong>
          </div>

          <div className="cc-floating-card cc-float-two">
            <span>Problem Tracker</span>
            <strong>Issues can be reported instantly</strong>
          </div>
        </div>
      </section>

      <section className="cc-section">
        <div className="cc-section-heading">
          <span>What CampusConnect AI does</span>
          <h2>Everything your college platform needs.</h2>
          <p>
            Designed as a smooth full-stack system where every role has its own
            clear workflow.
          </p>
        </div>

        <div className="cc-feature-grid">
          <article className="cc-feature-card">
            <div className="cc-icon">🎫</div>
            <h3>Event Management</h3>
            <p>
              Students can explore events, register, and receive ticket codes
              for verification.
            </p>
          </article>

          <article className="cc-feature-card">
            <div className="cc-icon">🛠️</div>
            <h3>Problem Reporting</h3>
            <p>
              Report campus issues, track status, and help admins resolve them
              faster.
            </p>
          </article>

          <article className="cc-feature-card">
            <div className="cc-icon">🤖</div>
            <h3>AI Assistant</h3>
            <p>
              A floating assistant helps users understand features and campus
              workflows.
            </p>
          </article>

          <article className="cc-feature-card">
            <div className="cc-icon">🔔</div>
            <h3>Notifications</h3>
            <p>
              Stay updated about approvals, events, problem updates, and system
              actions.
            </p>
          </article>
        </div>
      </section>

      <section className="cc-showcase">
        <div className="cc-showcase-card">
          <span>Built with MERN</span>
          <h2>Frontend, backend, database, auth and deployment working together.</h2>
          <p>
            React powers the interface, Express handles APIs, MongoDB stores the
            data, and Render hosts the complete full-stack app from one place.
          </p>
          <a href="/login" className="cc-primary-btn">
            Open Dashboard
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
