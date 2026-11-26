import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import './Dashboard.css';

const APP_NAME = 'NexusBoard';
const APP_TAGLINE = 'Your personal space — tasks, posts and photos in one place';

const PAGES = [
  {
    to: 'todos',
    title: 'Todos',
    description: 'My tasks',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    to: 'posts',
    title: 'Posts',
    description: 'My posts and everyone else\'s',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    to: 'albums',
    title: 'Albums',
    description: 'My albums and photos',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
];

function Dashboard() {
  const { user } = useUser();

  return (
    <div className="dashboard">
      <section className="dashboard__hero">
        <svg className="dashboard__hero-art" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <linearGradient id="hero-drop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a5b4fc" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <path
            d="M100 14 168 52v96l-16 9.2v-77.4L100 48.4 48 78.4v77.4L32 146.6V52Z"
            fill="url(#hero-drop)"
            opacity="0.95"
          />
          <path d="M100 48.4 152 78.4v77.4L100 186l-52-30.2V78.4Z" fill="rgba(255,255,255,0.18)" />
          <path d="M100 86 126 101v30l-26 15-26-15v-30Z" fill="#fff" opacity="0.9" />
        </svg>

        <div className="dashboard__hero-content">
          <span className="dashboard__brand">{APP_NAME}</span>
          <h2>Hello {user?.name}</h2>
          <p>{APP_TAGLINE}</p>
        </div>
      </section>

      <nav className="dashboard__cards">
        {PAGES.map((page) => (
          <Link key={page.to} className="dashboard__card" to={page.to}>
            <span className="dashboard__card-icon">{page.icon}</span>
            <span className="dashboard__card-title">{page.title}</span>
            <span className="dashboard__card-description">{page.description}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Dashboard;
