// frontend/src/App.tsx
import React, { useState } from 'react';
import EntriesTable from './components/EntriesTable';

export default function App() {
  const [adding, setAdding] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Favorite Movies & TV Shows</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                console.log('HEADER ADD CLICKED — before setAdding');
                setAdding(true);
                console.log('HEADER ADD CLICKED — after setAdding', {
                  adding: true,
                });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700"
            >
              + Add Entry
            </button>
          </div>
        </header>

        <main>
          <EntriesTable adding={adding} setAdding={setAdding} />
        </main>
      </div>
    </div>
  );
}
