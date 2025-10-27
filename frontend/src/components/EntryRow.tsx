import React from 'react';
import { deleteEntry } from '../lib/api';

export default function EntryRow({ entry }: { entry: any }) {
  const onDelete = async () => {
    if (!confirm('Delete this entry?')) return;
    try {
      await deleteEntry(entry.id);
      // naive: reload page (you can optimize to update state instead)
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <tr className="border-t">
      <td className="p-3">{entry.title}</td>
      <td className="p-3">{entry.type}</td>
      <td className="p-3">{entry.director}</td>
      <td className="p-3">{entry.budget}</td>
      <td className="p-3">{entry.location}</td>
      <td className="p-3">{entry.duration}</td>
      <td className="p-3">{entry.year}</td>
      <td className="p-3">
        <button className="mr-2 px-2 py-1 bg-yellow-300 rounded">Edit</button>
        <button
          onClick={onDelete}
          className="px-2 py-1 bg-red-400 text-white rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
