import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Users, FileText, Settings, Activity, AlertTriangle, TrendingUp, MapPin, Gavel, DollarSign, Calendar, Building } from 'lucide-react';

// Inline styles
const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
    backgroundColor: '#f9fafb',
    color: '#111827',
    lineHeight: 1.6
  },
  nav: {
    backgroundColor: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    borderBottom: '4px solid #3b82f6',
    padding: '1rem 0'
  },
  navContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    textDecoration: 'none'
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  navLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  hero: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#6b7280',
    marginBottom: '2rem'
  },
  ticker: {
    backgroundColor: '#fef2f2',
    borderLeft: '4px solid #ef4444',
    padding: '1rem',
    marginBottom: '2rem',
    borderRadius: '0.375rem'
  },
  tickerText: {
    color: '#b91c1c',
    fontWeight: '500',
    margin: 0
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    textAlign: 'center'
  },
  statIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  statTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  statSubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'box-shadow 0.2s',
    display: 'block'
  },
  actionIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem'
  },
  actionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  actionDescription: {
    color: '#6b7280'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '2rem'
  }
};

// Add CSS animations
const cssAnimations = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.nav-link:hover {
  color: #3b82f6 !important;
}

.action-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem !important;
  }
  
  .nav-links {
    flex-wrap: wrap;
    gap: 0.75rem !important;
  }
}
`;

// Main App Component
const App = () => {
  useEffect(() => {
    // Inject CSS animations
    const style = document.createElement('style');
    style.textContent = cssAnimations;
    document.head.appendChild(style);
    
    // Apply body styles
    Object.assign(document.body.style, styles.body);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/politicians" element={<PoliticianList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/bills" element={<BillsList />} />
          <Route path="/education" element={<EducationCenter />} />
          <Route path="/willy-wonka-factory" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

// Navigation Component
const Navigation = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          🏛️ PoliticsForMorons
        </Link>
        
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink} className="nav-link">
            Home
          </Link>
          <Link to="/politicians" style={styles.navLink} className="nav-link">
            Politicians
          </Link>
          <Link to="/bills" style={styles.navLink} className="nav-link">
            Bills & Votes
          </Link>
          <Link to="/articles" style={styles.navLink} className="nav-link">
            Articles
          </Link>
          <Link to="/education" style={styles.navLink} className="nav-link">
            Education
          </Link>
          <Link to="/dashboard" style={styles.navLink} className="nav-link">
            My Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Homepage Component
const HomePage = () => {
  const [stats, setStats] = useState({
    politicians: 537,
    billsThisSession: 1247,
    stockTrades: 3891,
    daysInSession: 147
  });

  const [tickerFacts] = useState([
    "Congress has a 21% approval rating but 95% reelection rate",
    "Average politician is 20 years older than the median American",
    "Members of Congress outperformed the S&P 500 by 12% in 2023",
    "Only 27% of Americans can name their House representative",
    "Congressional stock trades are disclosed 45 days after the fact"
  ]);

  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % tickerFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [tickerFacts.length]);

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle} className="hero-title">
          Welcome to the Shitshow
        </h1>
        <p style={styles.heroSubtitle}>
          Political transparency for millennials who can't even afford avocado toast
        </p>
        
        <div style={styles.ticker}>
          <p style={styles.tickerText}>
            💡 Fact: {tickerFacts[currentFact]}
          </p>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <StatCard
          title="Politicians Tracked"
          value={stats.politicians}
          icon={<Users size={32} color="#3b82f6" />}
          subtitle="All 537 federal representatives"
        />
        <StatCard
          title="Bills This Session"
          value={stats.billsThisSession.toLocaleString()}
          icon={<Gavel size={32} color="#10b981" />}
          subtitle="Introduced in 118th Congress"
        />
        <StatCard
          title="Stock Trades Disclosed"
          value={stats.stockTrades.toLocaleString()}
          icon={<DollarSign size={32} color="#f59e0b" />}
          subtitle="By members in 2024"
        />
        <StatCard
          title="Days in Session"
          value={stats.daysInSession}
          icon={<Calendar size={32} color="#8b5cf6" />}
          subtitle="Out of 365 this year"
        />
      </div>

      <div style={styles.actionsGrid}>
        <ActionCard
          title="Find Your Rep"
          description="See who represents you and how they vote on issues that matter"
          link="/dashboard"
          icon="🗳️"
        />
        <ActionCard
          title="Browse Politicians"
          description="Explore detailed profiles with voting records and financial data"
          link="/politicians"
          icon="🏛️"
        />
        <ActionCard
          title="Bills & Voting"
          description="Track legislation and see how your representatives vote"
          link="/bills"
          icon="📜"
        />
        <ActionCard
          title="Latest Articles"
          description="Political news and analysis based on factual data"
          link="/articles"
          icon="📰"
        />
        <ActionCard
          title="Education Center"
          description="Learn how government works and why it matters"
          link="/education"
          icon="🎓"
        />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, subtitle }) => {
  return (
    <div style={styles.statCard}>
      <div style={styles.statIcon}>{icon}</div>
      <h3 style={styles.statTitle}>{title}</h3>
      <p style={styles.statValue}>{value}</p>
      <p style={styles.statSubtitle}>{subtitle}</p>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ title, description, link, icon }) => {
  return (
    <Link to={link} style={styles.actionCard} className="action-card">
      <div style={styles.actionIcon}>{icon}</div>
      <h3 style={styles.actionTitle}>{title}</h3>
      <p style={styles.actionDescription}>{description}</p>
    </Link>
  );
};

// Simple placeholder components
const PoliticianList = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Congressional Directory</h1>
      <div style={styles.statCard}>
        <p style={{color: '#6b7280', textAlign: 'center'}}>
          Loading politicians from database...
        </p>
      </div>
    </div>
  );
};

const ArticleList = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Data-Driven Political Analysis</h1>
      <div style={styles.statCard}>
        <p style={{color: '#6b7280', textAlign: 'center'}}>
          Articles coming soon...
        </p>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Your Political Dashboard</h1>
      <div style={styles.statCard}>
        <p style={{color: '#6b7280', textAlign: 'center'}}>
          Dashboard features coming soon...
        </p>
      </div>
    </div>
  );
};

const BillsList = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Bills & Voting Records</h1>
      <div style={styles.statCard}>
        <p style={{color: '#6b7280', textAlign: 'center'}}>
          Bills and voting records section coming soon...
        </p>
      </div>
    </div>
  );
};

const EducationCenter = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Education Center</h1>
      <div style={styles.statCard}>
        <p style={{color: '#6b7280', textAlign: 'center'}}>
          Educational content about government and politics coming soon...
        </p>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>🎛️ Admin Dashboard - Willy Wonka Factory</h1>
      <div style={styles.statCard}>
        <p style={{color: '#6b7280', textAlign: 'center'}}>
          Admin dashboard coming soon...
        </p>
      </div>
    </div>
  );
};

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
