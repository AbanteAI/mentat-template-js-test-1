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
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        padding: '20px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Logo */}
      <div>
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
        }}
      >
        <h1>Horseradish Sauce</h1>

        {/* Recipe */}
        <div className="section">
          <h2
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '16px',
            }}
          >
            Basic Horseradish Sauce Recipe
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#1f2937',
                marginBottom: '8px',
              }}
            >
              Ingredients:
            </h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>1/2 cup freshly grated horseradish root</li>
              <li>1/4 cup white vinegar</li>
              <li>1/4 cup sour cream</li>
              <li>1 tablespoon mayonnaise</li>
              <li>1/2 teaspoon salt</li>
              <li>1/4 teaspoon sugar</li>
              <li>Pinch of white pepper</li>
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#1f2937',
                marginBottom: '8px',
              }}
            >
              Instructions:
            </h3>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>
                Peel and grate fresh horseradish root (work in a well-ventilated
                area!)
              </li>
              <li>
                In a bowl, combine grated horseradish with vinegar immediately
                to preserve color
              </li>
              <li>Add sour cream, mayonnaise, salt, sugar, and white pepper</li>
              <li>Mix well until smooth and creamy</li>
              <li>Taste and adjust seasoning as needed</li>
              <li>Refrigerate for at least 30 minutes before serving</li>
              <li>Store covered in refrigerator for up to 1 week</li>
            </ol>
          </div>

          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#fef3c7',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          >
            <strong>Tip:</strong> Fresh horseradish is very potent! Work quickly
            and avoid inhaling the fumes. The sauce will mellow after
            refrigeration.
          </div>
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
