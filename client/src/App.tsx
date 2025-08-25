import { useState, useEffect } from 'react';
import mentatLogo from '/mentat.png';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackendMessage = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api');

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBackendMessage();
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        padding: '20px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      {/* Logo */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <a href="https://mentat.ai" target="_blank">
          <img src={mentatLogo} alt="Mentat Logo" />
        </a>
      </div>

      {/* Main content */}
      <div
        className="paper"
        style={{
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h1>Mentat Template JS</h1>

        {/* Tech stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          {[
            ['Frontend', 'React, Vite, Vitest'],
            ['Backend', 'Node.js, Express, Jest'],
            ['Utilities', 'TypeScript, ESLint, Prettier'],
          ].map(([title, techs]) => (
            <div
              className="section"
              style={{ textAlign: 'center' }}
              key={title}
            >
              <div
                style={{
                  fontWeight: '500',
                  fontSize: '14px',
                  color: '#1f2937',
                  marginBottom: '4px',
                }}
              >
                {title}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{techs}</div>
            </div>
          ))}
        </div>

        {/* Server message */}
        <div className="section">
          <div
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1f2937',
              marginBottom: '8px',
            }}
          >
            Message from server:
          </div>
          <div style={{ fontSize: '14px', color: '#1f2937' }}>
            {loading ? (
              'Loading message from server...'
            ) : error ? (
              <span style={{ color: '#dc2626' }}>Error: {error}</span>
            ) : message ? (
              message
            ) : (
              <span style={{ color: '#6b7280', fontStyle: 'italic' }}>
                No message from server
              </span>
            )}
          </div>
        </div>

        {/* Call to action */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
          Create a new GitHub issue and tag{' '}
          <code
            style={{
              backgroundColor: '#f8fafc',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '13px',
              color: '#1f2937',
            }}
          >
            @MentatBot
          </code>{' '}
          to get started.
        </div>
      </div>
    </div>
  );
}

export default App;
