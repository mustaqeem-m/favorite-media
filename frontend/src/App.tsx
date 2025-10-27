import React from 'react';
import EntriesTable from './components/EntriesTable';
import EntryForm from './components/EntryForm';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Favorite Movies & TV Shows</h1>
          <EntryForm />
        </header>

        <main>
          <EntriesTable />
        </main>
      </div>
    </div>
  );
}
