import React, { useState } from 'react';
import { deleteEntry } from '../lib/api';
import EntryForm, { EntryShape } from './EntryForm';

export default function EntryRow({
  entry,
  onUpdated,
  onDeleted,
}: {
  entry: any;
  onUpdated: (e: any) => void;
  onDeleted: (id: number) => void;
}) {
  const [editing, setEditing] = useState(false);

  const onDelete = async () => {
    if (!confirm('Delete this entry?')) return;
    try {
      await deleteEntry(entry.id);
      onDeleted(entry.id);
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };
  const posterExists = Boolean(entry.posterUrl);

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 text-gray-900 font-medium">{entry.title}</td>
        <td className="px-4 py-3 text-gray-700">{entry.type}</td>
        <td className="px-4 py-3 text-gray-700">{entry.director}</td>
        <td className="px-4 py-3 text-gray-700">{entry.budget}</td>
        <td className="px-4 py-3 text-gray-700">{entry.location}</td>
        <td className="px-4 py-3 text-gray-700">{entry.duration}</td>
        <td className="px-4 py-3 text-gray-700">{entry.year}</td>

        {/* Poster column */}
        <td className="px-4 py-3">
          {posterExists ? (
            <img
              src={entry.posterUrl}
              alt={entry.title}
              className="w-12 h-16 rounded-md object-cover border border-gray-200"
            />
          ) : (
            // simple placeholder: circle with initials
            <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-600 border border-gray-200">
              {(entry.title || '')
                .split(' ')
                .slice(0, 2)
                .map((s) => s[0])
                .join('')
                .toUpperCase() || '??'}
            </div>
          )}
        </td>

        <td className="px-4 py-3 flex items-center gap-2">
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center rounded-md bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
          >
            Delete
          </button>
        </td>
      </tr>

      {editing && (
        <EntryForm
          initial={entry as EntryShape}
          onClose={() => setEditing(false)}
          onSaved={(updated) => {
            setEditing(false);
            onUpdated(updated);
          }}
        />
      )}
    </>
  );
}
