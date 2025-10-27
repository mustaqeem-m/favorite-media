// frontend/src/components/EntryRow.tsx
import React, { useState } from 'react';
import { deleteEntry } from '../lib/api';
import EntryForm from './EntryForm';
import type { EntryShape } from './EntryForm';

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

  return (
    <>
      <tr className="border-t">
        <td className="p-3">{entry.title}</td>
        <td className="p-3">{entry.type}</td>
        <td className="p-3">{entry.director}</td>
        <td className="p-3">{entry.budget}</td>
        <td className="p-3">{entry.location}</td>
        <td className="p-3">{entry.duration}</td>
        <td className="p-3">{entry.year}</td>
        <td className="p-3">
          <button
            onClick={() => setEditing(true)}
            className="mr-2 px-2 py-1 bg-yellow-300 rounded"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-2 py-1 bg-red-400 text-white rounded"
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
