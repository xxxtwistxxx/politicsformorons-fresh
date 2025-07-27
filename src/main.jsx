import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Users, FileText, Settings, Activity, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';

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
  adminButton: {
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '1px solid #d1d5db',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  adminButtonActive: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    borderColor: '#fca5a5'
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
  politiciansContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  searchContainer: {
    marginBottom: '2rem',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  searchInput: {
    flex: 1,
    minWidth: '300px',
    padding: '0.75rem',
    paddingLeft: '2.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem'
  },
  searchInputContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '300px'
  },
  searchIcon: {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    backgroundColor: 'white'
  },
  politiciansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem'
  },
  politicianCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'box-shadow 0.2s',
    display: 'block'
  },
  politicianHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  politicianPhoto: {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    marginRight: '1rem',
    backgroundColor: '#e5e7eb'
  },
  politicianName: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  politicianTags: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  tag: {
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: '500'
  },
  tagDemocrat: {
    backgroundColor: '#dbeafe',
    color: '#1e40af'
  },
  tagRepublican: {
    backgroundColor: '#fecaca',
    color: '#dc2626'
  },
  tagIndependent: {
    backgroundColor: '#f3f4f6',
    color: '#1f2937'
  },
  politicianBio: {
    color: '#6b7280',
    fontSize: '0.875rem',
    fontStyle: 'italic',
    marginBottom: '1rem'
  },
  politicianStats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statBadge: {
    textAlign: 'center'
  },
  corruptionScore: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem'
  },
  corruptionLow: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  corruptionMedium: {
    backgroundColor: '#fef3c7',
    color: '#92400e'
  },
  corruptionHigh: {
    backgroundColor: '#fecaca',
    color: '#dc2626'
  },
  givesADamnScore: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#3b82f6'
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.25rem'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem'
  },
  spinner: {
    width: '2rem',
    height: '2rem',
    border: '2px solid #f3f3f3',
    borderTop: '2px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem'
  },
  adminDashboard: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  adminTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '1rem'
  },
  statusHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem'
  },
  statusTitle: {
    fontWeight: '600',
    color: '#1f2937'
  },
  statusIcon: {
    fontSize: '1.125rem'
  },
  statusBadge: {
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.75rem'
  },
  statusRunning: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  statusProcessing: {
    backgroundColor: '#fef3c7',
    color: '#92400e'
  },
  statusIdle: {
    backgroundColor: '#f3f4f6',
    color: '#6b7280'
  },
  statusDetails: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '0.75rem'
  },
  runButton: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  controlsSection: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  controlsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  controlButton: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonRed: {
    backgroundColor: '#dc2626',
    color: 'white'
  },
  buttonBlue: {
    backgroundColor: '#3b82f6',
    color: 'white'
  },
  buttonGray: {
    backgroundColor: '#6b7280',
    color: 'white'
  },
  activityFeed: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem'
  },
  activityList: {
    maxHeight: '16rem',
    overflowY: 'auto'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '0.75rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.375rem',
    marginBottom: '0.75rem'
  },
  activityIcon: {
    fontSize: '0.875rem'
  },
  activityContent: {
    flex: 1
  },
  activityMessage: {
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.25rem'
  },
  activityTime: {
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  messageSuccess: {
    color: '#166534'
  },
  messageInfo: {
    color: '#3b82f6'
  },
  messageWarning: {
    color: '#92400e'
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

.politician-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
}

.run-button:hover {
  background-color: #2563eb !important;
}

.control-button:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem !important;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .search-input-container {
    min-width: 100% !important;
  }
  
  .nav-links {
    flex-wrap: wrap;
    gap: 0.75rem !important;
  }
}
`;

// Main App Component
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Inject CSS animations
    const style = document.createElement('style');
    style.textContent = cssAnimations;
    document.head.appendChild(style);
    
    // Apply body styles
    Object.assign(document.body.style, styles.body);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navigation isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/politicians" element={<PoliticianList />} />
          <Route path="/politician/:id" element={<PoliticianDetail />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
        </Routes>
      </div>
    </Router>
  );
};

// Navigation Component
const Navigation = ({ isAdmin, setIsAdmin }) => {
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
          <Link to="/articles" style={styles.navLink} className="nav-link">
            Articles
          </Link>
          <Link to="/dashboard" style={styles.navLink} className="nav-link">
            My Dashboard
          </Link>
          
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            style={{
              ...styles.adminButton,
              ...(isAdmin ? styles.adminButtonActive : {})
            }}
          >
            {isAdmin ? '🔧 Admin Mode' : 'Admin'}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Homepage Component
const HomePage = () => {
  const [stats, setStats] = useState({
    politicians: 537,
    corruptionLevel: '∞',
    problemsSolved: 0,
    avgAge: 64
  });

  const [tickerFacts] = useState([
    "29% of Americans can't find the Pacific Ocean on a map",
    "Congress has a 21% approval rating but 95% reelection rate",
    "Average politician is older than the internet",
    "More Americans can name all Kardashians than their representatives",
    "Student debt has increased 1,200% since 1980"
  ]);

  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % tickerFacts.length);
    }, 8000); // Changed from 3000 to 8000 (8 seconds)
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
            💡 Fun Fact: {tickerFacts[currentFact]}
          </p>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <StatCard
          title="Politicians Tracked"
          value={stats.politicians}
          icon={<Users size={32} color="#3b82f6" />}
          subtitle="All 537 disappointments"
        />
        <StatCard
          title="Corruption Level"
          value={stats.corruptionLevel}
          icon={<AlertTriangle size={32} color="#ef4444" />}
          subtitle="Off the charts"
        />
        <StatCard
          title="Problems Solved"
          value={stats.problemsSolved}
          icon={<TrendingUp size={32} color="#10b981" />}
          subtitle="Still waiting..."
        />
        <StatCard
          title="Average Age"
          value={stats.avgAge}
          icon={<Activity size={32} color="#8b5cf6" />}
          subtitle="Older than WiFi"
        />
      </div>

      <div style={styles.actionsGrid}>
        <ActionCard
          title="Find Your Rep"
          description="See who's supposed to represent you (spoiler: they don't)"
          link="/dashboard"
          icon="🗳️"
        />
        <ActionCard
          title="Browse Politicians"
          description="Rate their corruption levels and laugh at their bios"
          link="/politicians"
          icon="🏛️"
        />
        <ActionCard
          title="Latest Articles"
          description="Political news translated into millennial"
          link="/articles"
          icon="📰"
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

// Politician List Component
const PoliticianList = () => {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterParty, setFilterParty] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockPoliticians = [
      {
        id: 1,
        name: "Alexandria Ocasio-Cortez",
        party: "Democrat",
        state: "NY",
        chamber: "House",
        corruptionScore: 15,
        givesADamnRating: 9,
        bio: "Actually fights for millennials (shocking, we know)",
        photoUrl: "/api/placeholder/150/150"
      },
      {
        id: 2,
        name: "Mitch McConnell",
        party: "Republican",
        state: "KY",
        chamber: "Senate",
        corruptionScore: 95,
        givesADamnRating: 1,
        bio: "Turtle who thinks climate change is a hoax",
        photoUrl: "/api/placeholder/150/150"
      },
      {
        id: 3,
        name: "Bernie Sanders",
        party: "Independent",
        state: "VT",
        chamber: "Senate",
        corruptionScore: 20,
        givesADamnRating: 8,
        bio: "Still asking for your financial support",
        photoUrl: "/api/placeholder/150/150"
      }
    ];
    
    setTimeout(() => {
      setPoliticians(mockPoliticians);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPoliticians = politicians.filter(politician => {
    const matchesSearch = politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         politician.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParty = filterParty === 'all' || politician.party.toLowerCase() === filterParty.toLowerCase();
    return matchesSearch && matchesParty;
  });

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading politicians... (this might take a while, they're slow)</p>
      </div>
    );
  }

  return (
    <div style={styles.politiciansContainer}>
      <h1 style={styles.pageTitle}>
        Find Your Disappointment
      </h1>

      <div style={styles.searchContainer} className="search-container">
        <div style={styles.searchInputContainer} className="search-input-container">
          <Search style={styles.searchIcon} size={16} />
          <input
            type="text"
            placeholder="Search by name or state..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          style={styles.select}
          value={filterParty}
          onChange={(e) => setFilterParty(e.target.value)}
        >
          <option value="all">All Parties</option>
          <option value="democrat">Democrats</option>
          <option value="republican">Republicans</option>
          <option value="independent">Independents</option>
        </select>
      </div>

      <div style={styles.politiciansGrid}>
        {filteredPoliticians.map(politician => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>

      {filteredPoliticians.length === 0 && (
        <div style={styles.loading}>
          <p>No politicians found. Try different search terms.</p>
        </div>
      )}
    </div>
  );
};

// Politician Card Component
const PoliticianCard = ({ politician }) => {
  const getCorruptionStyle = (score) => {
    if (score < 30) return styles.corruptionLow;
    if (score < 60) return styles.corruptionMedium;
    return styles.corruptionHigh;
  };

  const getPartyStyle = (party) => {
    switch (party.toLowerCase()) {
      case 'democrat': return styles.tagDemocrat;
      case 'republican': return styles.tagRepublican;
      default: return styles.tagIndependent;
    }
  };

  return (
    <Link to={`/politician/${politician.id}`} style={styles.politicianCard} className="politician-card">
      <div style={styles.politicianHeader}>
        <img
          src={politician.photoUrl}
          alt={politician.name}
          style={styles.politicianPhoto}
        />
        <div>
          <h3 style={styles.politicianName}>{politician.name}</h3>
          <div style={styles.politicianTags}>
            <span style={{...styles.tag, ...getPartyStyle(politician.party)}}>
              {politician.party}
            </span>
            <span style={{...styles.tag, ...styles.tagIndependent}}>
              {politician.state} - {politician.chamber}
            </span>
          </div>
        </div>
      </div>

      <p style={styles.politicianBio}>"{politician.bio}"</p>

      <div style={styles.politicianStats}>
        <div style={styles.statBadge}>
          <div style={{...styles.corruptionScore, ...getCorruptionStyle(politician.corruptionScore)}}>
            {politician.corruptionScore}%
          </div>
          <div style={styles.statLabel}>Corrupt</div>
        </div>
        
        <div style={styles.statBadge}>
          <div style={styles.givesADamnScore}>
            {politician.givesADamnRating}/10
          </div>
          <div style={styles.statLabel}>Gives a Damn</div>
        </div>
      </div>
    </Link>
  );
};

// Other components with basic styling...
const PoliticianDetail = () => {
  const navigate = useNavigate();
  
  return (
    <div style={styles.container}>
      <button
        onClick={() => navigate(-1)}
        style={{...styles.controlButton, ...styles.buttonBlue, marginBottom: '1rem'}}
      >
        ← Back to Politicians
      </button>
      
      <div style={styles.statCard}>
        <h1 style={styles.pageTitle}>Politician Detail</h1>
        <p style={{color: '#6b7280'}}>Detailed politician profile coming soon...</p>
      </div>
    </div>
  );
};

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockArticles = [
      {
        id: 1,
        title: "Why Your Rep Thinks Avocado Toast Caused Inflation",
        summary: "Breaking down the latest economic hot takes from people who haven't bought groceries since 1987",
        publishedAt: "2025-01-27T10:00:00Z",
        category: "Economic Policy",
        readTime: "3 min read"
      },
      {
        id: 2,
        title: "Climate Change Denial: A Masterclass in Ignoring Science",
        summary: "How politicians continue to pretend the planet isn't literally on fire",
        publishedAt: "2025-01-27T08:00:00Z",
        category: "Environment",
        readTime: "5 min read"
      },
      {
        id: 3,
        title: "Student Loans: The Gift That Keeps on Taking",
        summary: "Why your education debt will outlive you (and possibly your children)",
        publishedAt: "2025-01-26T15:00:00Z",
        category: "Education",
        readTime: "4 min read"
      }
    ];

    setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>
        Political News for Humans
      </h1>

      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={styles.statCard}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
        <span style={{...styles.tag, ...styles.tagDemocrat}}>
          {article.category}
        </span>
        <span style={{fontSize: '0.875rem', color: '#6b7280'}}>{article.readTime}</span>
      </div>
      
      <h2 style={{...styles.actionTitle, cursor: 'pointer', marginBottom: '0.75rem'}}>
        {article.title}
      </h2>
      
      <p style={{...styles.actionDescription, marginBottom: '1rem'}}>{article.summary}</p>
      
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280'}}>
        <span>{formatDate(article.publishedAt)}</span>
        <button style={{...styles.controlButton, ...styles.buttonBlue, padding: '0.5rem 1rem'}}>
          Read More →
        </button>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [zipCode, setZipCode] = useState('');
  const [representatives, setRepresentatives] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleZipCodeSubmit = async (e) => {
    e.preventDefault();
    if (!zipCode) return;

    setLoading(true);
    
    setTimeout(() => {
      setRepresentatives({
        house: {
          name: "Alexandria Ocasio-Cortez",
          party: "Democrat",
          district: "NY-14",
          phone: "(202) 225-3965",
          email: "https://ocasio-cortez.house.gov/contact"
        },
        senators: [
          {
            name: "Chuck Schumer",
            party: "Democrat",
            phone: "(202) 224-6542",
            email: "https://schumer.senate.gov/contact"
          },
          {
            name: "Kirsten Gillibrand", 
            party: "Democrat",
            phone: "(202) 224-4451",
            email: "https://gillibrand.senate.gov/contact"
          }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>
        Your Political Dashboard
      </h1>

      <div style={{...styles.statCard, marginBottom: '2rem'}}>
        <h2 style={styles.sectionTitle}>
          Find Your Representatives
        </h2>
        
        <form onSubmit={handleZipCodeSubmit} style={{display: 'flex', gap: '1rem'}}>
          <input
            type="text"
            placeholder="Enter your ZIP code"
            style={{...styles.searchInput, flex: 1}}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            maxLength={5}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.controlButton,
              ...styles.buttonBlue,
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Searching...' : 'Find Reps'}
          </button>
        </form>
      </div>

      {representatives && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div style={styles.statCard}>
            <h3 style={{...styles.sectionTitle, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Users size={20} />
              House Representative
            </h3>
            <RepresentativeCard rep={representatives.house} />
          </div>

          <div style={styles.statCard}>
            <h3 style={{...styles.sectionTitle, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Users size={20} />
              Senators
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {representatives.senators.map((senator, index) => (
                <RepresentativeCard key={index} rep={senator} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RepresentativeCard = ({ rep }) => {
  const getPartyStyle = (party) => {
    switch (party.toLowerCase()) {
      case 'democrat': return styles.tagDemocrat;
      case 'republican': return styles.tagRepublican;
      default: return styles.tagIndependent;
    }
  };

  return (
    <div style={{border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
        <div>
          <h4 style={styles.politicianName}>{rep.name}</h4>
          {rep.district && (
            <p style={{fontSize: '0.875rem', color: '#6b7280'}}>{rep.district}</p>
          )}
        </div>
        <span style={{...styles.tag, ...getPartyStyle(rep.party)}}>
          {rep.party}
        </span>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{fontWeight: '500', color: '#374151', width: '4rem'}}>Phone:</span>
          <a href={`tel:${rep.phone}`} style={{color: '#3b82f6', textDecoration: 'none'}}>
            {rep.phone}
          </a>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{fontWeight: '500', color: '#374151', width: '4rem'}}>Contact:</span>
          <a href={rep.email} target="_blank" rel="noopener noreferrer" style={{color: '#3b82f6', textDecoration: 'none'}}>
            Send Message
          </a>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [systemStatus, setSystemStatus] = useState({
    newsScraper: { status: 'running', lastRun: '2 hours ago', itemsFound: 47 },
    contentGenerator: { status: 'processing', lastRun: '30 minutes ago', itemsProcessed: '3/6' },
    politicianTracker: { status: 'idle', lastRun: '1 day ago', itemsUpdated: 537 },
    databaseHealth: { status: 'healthy', connections: 12, queries: 1247 }
  });

  const handleManualTrigger = (component) => {
    alert(`Manually triggering ${component}...`);
  };

  return (
    <div style={styles.adminDashboard}>
      <h1 style={styles.adminTitle}>
        🎛️ Admin Dashboard - Your Willy Wonka Factory
      </h1>

      <div style={styles.statusGrid}>
        <SystemStatusCard
          title="News Scraper"
          status={systemStatus.newsScraper}
          onTrigger={() => handleManualTrigger('News Scraper')}
        />
        <SystemStatusCard
          title="Content Generator"
          status={systemStatus.contentGenerator}
          onTrigger={() => handleManualTrigger('Content Generator')}
        />
        <SystemStatusCard
          title="Politician Tracker"
          status={systemStatus.politicianTracker}
          onTrigger={() => handleManualTrigger('Politician Tracker')}
        />
        <SystemStatusCard
          title="Database Health"
          status={systemStatus.databaseHealth}
          onTrigger={() => handleManualTrigger('Database Maintenance')}
        />
      </div>

      <div style={styles.controlsSection}>
        <h2 style={styles.sectionTitle}>Manual Controls</h2>
        <div style={styles.controlsGrid}>
          <button
            onClick={() => handleManualTrigger('Breaking News Check')}
            style={{...styles.controlButton, ...styles.buttonRed}}
            className="control-button"
          >
            ⚠️ Force Breaking News Check
          </button>
          <button
            onClick={() => handleManualTrigger('Full System Update')}
            style={{...styles.controlButton, ...styles.buttonBlue}}
            className="control-button"
          >
            🔄 Run Full System Update
          </button>
          <button
            onClick={() => handleManualTrigger('System Diagnostics')}
            style={{...styles.controlButton, ...styles.buttonGray}}
            className="control-button"
          >
            🔧 System Diagnostics
          </button>
        </div>
      </div>

      <div style={styles.activityFeed}>
        <h2 style={styles.sectionTitle}>Live Activity Feed</h2>
        <div style={styles.activityList}>
          <ActivityItem
            time="2 minutes ago"
            message="Content Generator: Generated article 'Why Your Rep Thinks TikTok Causes Inflation'"
            type="success"
          />
          <ActivityItem
            time="15 minutes ago"
            message="News Scraper: Found 12 new political stories from RSS feeds"
            type="info"
          />
          <ActivityItem
            time="1 hour ago"
            message="Politician Tracker: Updated corruption scores for 47 representatives"
            type="success"
          />
          <ActivityItem
            time="2 hours ago"
            message="Breaking News Alert: Senator caught using TikTok during climate hearing"
            type="warning"
          />
        </div>
      </div>
    </div>
  );
};

const SystemStatusCard = ({ title, status, onTrigger }) => {
  const getStatusStyle = (statusValue) => {
    switch (statusValue) {
      case 'running': case 'healthy': return styles.statusRunning;
      case 'processing': return styles.statusProcessing;
      default: return styles.statusIdle;
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case 'running': case 'healthy': return '🟢';
      case 'processing': return '🟡';
      case 'error': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div style={styles.statusCard}>
      <div style={styles.statusHeader}>
        <h3 style={styles.statusTitle}>{title}</h3>
        <span style={styles.statusIcon}>{getStatusIcon(status.status)}</span>
      </div>
      
      <div style={{...styles.statusBadge, ...getStatusStyle(status.status)}}>
        {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
      </div>
      
      <div style={styles.statusDetails}>
        <div>Last run: {status.lastRun}</div>
        {status.itemsFound && <div>Items found: {status.itemsFound}</div>}
        {status.itemsProcessed && <div>Progress: {status.itemsProcessed}</div>}
        {status.itemsUpdated && <div>Updated: {status.itemsUpdated}</div>}
        {status.connections && <div>Connections: {status.connections}</div>}
        {status.queries && <div>Queries: {status.queries}</div>}
      </div>
      
      <button
        onClick={onTrigger}
        style={styles.runButton}
        className="run-button"
      >
        Run Now
      </button>
    </div>
  );
};

const ActivityItem = ({ time, message, type }) => {
  const getMessageStyle = (itemType) => {
    switch (itemType) {
      case 'success': return styles.messageSuccess;
      case 'warning': return styles.messageWarning;
      case 'error': return styles.messageWarning;
      default: return styles.messageInfo;
    }
  };

  const getTypeIcon = (itemType) => {
    switch (itemType) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <div style={styles.activityItem}>
      <span style={styles.activityIcon}>{getTypeIcon(type)}</span>
      <div style={styles.activityContent}>
        <p style={{...styles.activityMessage, ...getMessageStyle(type)}}>{message}</p>
        <p style={styles.activityTime}>{time}</p>
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

