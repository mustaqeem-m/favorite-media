import React, { useState } from 'react';
import { createEntry } from '../lib/api';

export default function EntryForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: 'Movie',
    director: '',
    budget: '',
    location: '',
    duration: '',
    year: '',
    notes: '',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEntry(form);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Create failed');
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form
            onSubmit={submit}
            className="bg-white p-6 rounded shadow max-w-lg w-full"
          >
            <h2 className="text-lg font-semibold mb-4">Add Entry</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="p-2 border rounded"
              />
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
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
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="p-2 border rounded"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mr-2 px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
