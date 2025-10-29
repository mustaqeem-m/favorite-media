// frontend/src/App.tsx
import React, { useState } from 'react';
import { useAuth } from '../src/hooks/useAuth';
import { Link } from 'react-router-dom';
import EntriesTable from './components/EntriesTable';

export default function App() {
  const [adding, setAdding] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Favorite Movies & TV Shows</h1>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button className="btn" onClick={() => setAdding(true)}>
                  + Add Entry
                </button>
                <button
                  className="text-sm text-gray-600"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">
                  Login
                </Link>
                <Link to="/register" className="text-sm text-gray-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </header>

        <main>
          <EntriesTable adding={adding} setAdding={setAdding} />
        </main>
      </div>
    </div>
  );
}
