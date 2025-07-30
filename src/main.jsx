import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Users, FileText, Settings, Activity, AlertTriangle, TrendingUp, MapPin, Gavel, DollarSign, Calendar, Building } from 'lucide-react';

// API Configuration
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://snhwy1na8i.execute-api.us-east-1.amazonaws.com/prod';


// API Helper Functions
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'PoliticsForMorons-Frontend/1.0',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Inline styles (same as before)
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
  backgroundColor: '#e5e7eb',
  objectFit: 'cover',        // This preserves aspect ratio!
  objectPosition: 'center'   // Centers the image in the circle
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
  error: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.5rem',
    padding: '1rem',
    color: '#dc2626',
    textAlign: 'center'
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

// Homepage Component with real API data
const HomePage = () => {
  const [stats, setStats] = useState({
    politicians: 0,
    billsThisSession: 0,
    stockTrades: 0,
    daysInSession: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Load real stats from API
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/stats');
        setStats(data);
        setError(null);
      } catch (error) {
        console.error('Error loading stats:', error);
        setError('Failed to load statistics. Using fallback data.');
        // Fallback to mock data if API fails
        setStats({
          politicians: 537,
          billsThisSession: 1247,
          stockTrades: 3891,
          daysInSession: 147
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadStats();
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading real data from secure database...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {error && (
        <div style={styles.error}>
          <p>{error}</p>
        </div>
      )}
      
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

// Politician List Component with real API data
const PoliticianList = () => {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterParty, setFilterParty] = useState('all');
  const [filterChamber, setFilterChamber] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPoliticians = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (filterParty !== 'all') params.append('party', filterParty);
        if (filterChamber !== 'all') params.append('chamber', filterChamber);
        
        const data = await apiCall(`/politicians?${params.toString()}`);
        setPoliticians(data.politicians || []);
        setError(null);
      } catch (error) {
        console.error('Error loading politicians:', error);
        setError('Failed to load politicians from database.');
        setPoliticians([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPoliticians();
  }, [searchTerm, filterParty, filterChamber]);

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading politicians from secure database...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>
        Congressional Directory
      </h1>

      {error && (
        <div style={styles.error}>
          <p>{error}</p>
        </div>
      )}

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

        <select
          style={styles.select}
          value={filterChamber}
          onChange={(e) => setFilterChamber(e.target.value)}
        >
          <option value="all">Both Chambers</option>
          <option value="house">House</option>
          <option value="senate">Senate</option>
        </select>
      </div>

      <div style={styles.politiciansGrid}>
        {politicians.map(politician => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>

      {politicians.length === 0 && !loading && (
        <div style={styles.loading}>
          <p>No politicians found. Try different search terms.</p>
        </div>
      )}
    </div>
  );
};

// Enhanced Politician Card Component
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
    <div style={styles.politicianCard} className="politician-card">
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
              {politician.state}{politician.district ? `-${politician.district}` : ''} - {politician.chamber}
            </span>
          </div>
        </div>
      </div>

      <div style={{marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280'}}>
        <div>📊 Bills Sponsored: {politician.billsSponsored}</div>
        <div>💰 Stock Trades: {politician.stockTrades}</div>
      </div>

      <div style={styles.politicianStats}>
        <div style={styles.statBadge}>
          <div style={{...styles.corruptionScore, ...getCorruptionStyle(politician.corruptionScore)}}>
            {politician.corruptionScore}%
          </div>
          <div style={styles.statLabel}>Corruption Risk</div>
        </div>
        
        <div style={styles.statBadge}>
          <div style={styles.givesADamnScore}>
            {politician.givesADamnRating}/10
          </div>
          <div style={styles.statLabel}>People First Score</div>
        </div>
      </div>
    </div>
  );
};

// Article List Component with real API data
const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/articles');
        setArticles(data.articles || []);
        setError(null);
      } catch (error) {
        console.error('Error loading articles:', error);
        setError('Failed to load articles.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
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
        Data-Driven Political Analysis
      </h1>

      {error && (
        <div style={styles.error}>
          <p>{error}</p>
        </div>
      )}

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
        <button style={{padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer'}}>
          Read More →
        </button>
      </div>
    </div>
  );
};

// Admin Dashboard Component with real API data
const AdminDashboard = () => {
  const [systemStatus, setSystemStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAdminStatus = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/admin/status');
        setSystemStatus(data);
        setError(null);
      } catch (error) {
        console.error('Error loading admin status:', error);
        setError('Failed to load admin status.');
      } finally {
        setLoading(false);
      }
    };
    
    loadAdminStatus();
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>
        🎛️ Admin Dashboard - Willy Wonka Factory
      </h1>

      {error && (
        <div style={styles.error}>
          <p>{error}</p>
        </div>
      )}

      <div style={styles.statCard}>
        <h2>System Status</h2>
        <pre style={{backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto'}}>
          {JSON.stringify(systemStatus, null, 2)}
        </pre>
      </div>
    </div>
  );
};

// Simple placeholder components
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

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
