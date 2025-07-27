import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Users, FileText, Settings, Activity, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';
import './index.css';

// Main App Component
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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
    <nav className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            🏛️ PoliticsForMorons
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/politicians" className="text-gray-600 hover:text-blue-600 font-medium">
              Politicians
            </Link>
            <Link to="/articles" className="text-gray-600 hover:text-blue-600 font-medium">
              Articles
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
              My Dashboard
            </Link>
            
            {/* Admin Toggle */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                isAdmin 
                  ? 'bg-red-100 text-red-800 border border-red-300' 
                  : 'bg-gray-100 text-gray-600 border border-gray-300'
              }`}
            >
              {isAdmin ? '🔧 Admin Mode' : 'Admin'}
            </button>
          </div>
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
    }, 3000);
    return () => clearInterval(interval);
  }, [tickerFacts.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to the Shitshow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Political transparency for millennials who can't even afford avocado toast
        </p>
        
        {/* Scrolling Ticker */}
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-8">
          <p className="text-red-700 font-medium">
            💡 Fun Fact: {tickerFacts[currentFact]}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Politicians Tracked"
          value={stats.politicians}
          icon={<Users className="w-8 h-8 text-blue-500" />}
          subtitle="All 537 disappointments"
        />
        <StatCard
          title="Corruption Level"
          value={stats.corruptionLevel}
          icon={<AlertTriangle className="w-8 h-8 text-red-500" />}
          subtitle="Off the charts"
        />
        <StatCard
          title="Problems Solved"
          value={stats.problemsSolved}
          icon={<TrendingUp className="w-8 h-8 text-green-500" />}
          subtitle="Still waiting..."
        />
        <StatCard
          title="Average Age"
          value={stats.avgAge}
          icon={<Activity className="w-8 h-8 text-purple-500" />}
          subtitle="Older than WiFi"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ title, description, link, icon }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

// Politician List Component
const PoliticianList = () => {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterParty, setFilterParty] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data for now - will be replaced with real API calls
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading politicians... (this might take a while, they're slow)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Find Your Disappointment
      </h1>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or state..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filterParty}
          onChange={(e) => setFilterParty(e.target.value)}
        >
          <option value="all">All Parties</option>
          <option value="democrat">Democrats</option>
          <option value="republican">Republicans</option>
          <option value="independent">Independents</option>
        </select>
      </div>

      {/* Politicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoliticians.map(politician => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>

      {filteredPoliticians.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No politicians found. Try different search terms.</p>
        </div>
      )}
    </div>
  );
};

// Politician Card Component
const PoliticianCard = ({ politician }) => {
  const getCorruptionColor = (score) => {
    if (score < 30) return 'text-green-600 bg-green-100';
    if (score < 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPartyColor = (party) => {
    switch (party.toLowerCase()) {
      case 'democrat': return 'bg-blue-100 text-blue-800';
      case 'republican': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/politician/${politician.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex items-center mb-4">
          <img
            src={politician.photoUrl}
            alt={politician.name}
            className="w-16 h-16 rounded-full mr-4 bg-gray-200"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{politician.name}</h3>
            <div className="flex gap-2 mt-1">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getPartyColor(politician.party)}`}>
                {politician.party}
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {politician.state} - {politician.chamber}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-sm italic">"{politician.bio}"</p>

        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className={`text-lg font-bold px-2 py-1 rounded ${getCorruptionColor(politician.corruptionScore)}`}>
              {politician.corruptionScore}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Corrupt</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {politician.givesADamnRating}/10
            </div>
            <div className="text-xs text-gray-500 mt-1">Gives a Damn</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Politician Detail Component
const PoliticianDetail = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Politicians
      </button>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Politician Detail</h1>
        <p className="text-gray-600">Detailed politician profile coming soon...</p>
      </div>
    </div>
  );
};

// Article List Component
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Political News for Humans
      </h1>

      <div className="space-y-6">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

// Article Card Component
const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {article.category}
        </span>
        <span className="text-sm text-gray-500">{article.readTime}</span>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
        {article.title}
      </h2>
      
      <p className="text-gray-600 mb-4">{article.summary}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{formatDate(article.publishedAt)}</span>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          Read More →
        </button>
      </div>
    </div>
  );
};

// User Dashboard Component
const UserDashboard = () => {
  const [zipCode, setZipCode] = useState('');
  const [representatives, setRepresentatives] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleZipCodeSubmit = async (e) => {
    e.preventDefault();
    if (!zipCode) return;

    setLoading(true);
    
    // Mock API call - will be replaced with real API
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Your Political Dashboard
      </h1>

      {/* Zip Code Input */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Find Your Representatives
        </h2>
        
        <form onSubmit={handleZipCodeSubmit} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter your ZIP code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength={5}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Find Reps'}
          </button>
        </form>
      </div>

      {/* Representatives Results */}
      {representatives && (
        <div className="space-y-6">
          {/* House Representative */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              House Representative
            </h3>
            <RepresentativeCard rep={representatives.house} />
          </div>

          {/* Senators */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Senators
            </h3>
            <div className="space-y-4">
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

// Representative Card Component
const RepresentativeCard = ({ rep }) => {
  const getPartyColor = (party) => {
    switch (party.toLowerCase()) {
      case 'democrat': return 'bg-blue-100 text-blue-800';
      case 'republican': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{rep.name}</h4>
          {rep.district && (
            <p className="text-sm text-gray-600">{rep.district}</p>
          )}
        </div>
        <span className={`px-2 py-1 rounded text-sm font-medium ${getPartyColor(rep.party)}`}>
          {rep.party}
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-16">Phone:</span>
          <a href={`tel:${rep.phone}`} className="text-blue-600 hover:text-blue-800">
            {rep.phone}
          </a>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-16">Contact:</span>
          <a href={rep.email} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            Send Message
          </a>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const [systemStatus, setSystemStatus] = useState({
    newsScraper: { status: 'running', lastRun: '2 hours ago', itemsFound: 47 },
    contentGenerator: { status: 'processing', lastRun: '30 minutes ago', itemsProcessed: '3/6' },
    politicianTracker: { status: 'idle', lastRun: '1 day ago', itemsUpdated: 537 },
    databaseHealth: { status: 'healthy', connections: 12, queries: 1247 }
  });

  const handleManualTrigger = (component) => {
    alert(`Manually triggering ${component}...`);
    // This would trigger the actual automation
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        🎛️ Admin Dashboard - Your Willy Wonka Factory
      </h1>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      {/* Manual Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manual Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleManualTrigger('Breaking News Check')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
          >
            ⚠️ Force Breaking News Check
          </button>
          <button
            onClick={() => handleManualTrigger('Full System Update')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            🔄 Run Full System Update
          </button>
          <button
            onClick={() => handleManualTrigger('System Diagnostics')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            🔧 System Diagnostics
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Activity Feed</h2>
        <div className="space-y-3 max-h-64 overflow-y-auto">
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

// System Status Card Component
const SystemStatusCard = ({ title, status, onTrigger }) => {
  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case 'running': case 'healthy': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-lg">{getStatusIcon(status.status)}</span>
      </div>
      
      <div className={`px-2 py-1 rounded text-sm font-medium mb-3 ${getStatusColor(status.status)}`}>
        {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
      </div>
      
      <div className="text-xs text-gray-600 space-y-1 mb-3">
        <div>Last run: {status.lastRun}</div>
        {status.itemsFound && <div>Items found: {status.itemsFound}</div>}
        {status.itemsProcessed && <div>Progress: {status.itemsProcessed}</div>}
        {status.itemsUpdated && <div>Updated: {status.itemsUpdated}</div>}
        {status.connections && <div>Connections: {status.connections}</div>}
        {status.queries && <div>Queries: {status.queries}</div>}
      </div>
      
      <button
        onClick={onTrigger}
        className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
      >
        Run Now
      </button>
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ time, message, type }) => {
  const getTypeColor = (itemType) => {
    switch (itemType) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
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
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
      <span className="text-sm">{getTypeIcon(type)}</span>
      <div className="flex-1">
        <p className={`text-sm font-medium ${getTypeColor(type)}`}>{message}</p>
        <p className="text-xs text-gray-500">{time}</p>
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
