// frontend/src/components/EntryForm.tsx
import React, { useState, useEffect } from 'react';
import { createEntry, updateEntry } from '../lib/api';

export type EntryShape = {
  id?: number;
  title: string;
  type: 'Movie' | 'TV Show';
  director?: string;
  budget?: string;
  location?: string;
  duration?: string;
  year?: string;
  notes?: string;
  posterUrl?: string;
};

type Props = {
  initial?: EntryShape;
  onClose: () => void;
  onSaved: (entry: any) => void;
};

export default function EntryForm({ initial, onClose, onSaved }: Props) {
  const [form, setForm] = useState<EntryShape>(
    initial ?? {
      title: '',
      type: 'Movie',
      director: '',
      budget: '',
      location: '',
      duration: '',
      year: '',
      notes: '',
      posterUrl: '',
    }
  );
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(initial && initial.id);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && initial && initial.id) {
        const updated = await updateEntry(initial.id, form);
        onSaved(updated);
      } else {
        const created = await createEntry(form);
        onSaved(created);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow max-w-lg w-full"
      >
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? 'Edit Entry' : 'Add Entry'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-2 border rounded"
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as any })}
            className="p-2 border rounded"
          >
            <option>Movie</option>
            <option>TV Show</option>
          </select>

          <input
            placeholder="Director"
            value={form.director}
            onChange={(e) => setForm({ ...form, director: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Budget"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Year/Time"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Poster URL"
            value={form.posterUrl}
            onChange={(e) => setForm({ ...form, posterUrl: e.target.value })}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="p-2 border rounded md:col-span-2"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-3 py-1 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
