// frontend/src/components/EntryForm.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
  onClose?: () => void;
  onSaved?: (entry: any) => void;
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

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && initial && initial.id) {
        const updated = await updateEntry(initial.id, form);
        if (onSaved) onSaved(updated);
      } else {
        const created = await createEntry(form);
        if (onSaved) onSaved(created);
      }
      if (onClose) onClose();
    } catch (err: any) {
      console.error('SAVE ERROR', err, err?.response);
      const server = err?.response ? JSON.stringify(err.response) : null;
      const msg = server ?? err?.message ?? 'Unknown error';
      alert('Save failed: ' + msg);
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <div
      // Inline styles to force full-screen overlay and top z-index
      style={{
        position: 'fixed',
        inset: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 2147483647, // ridiculously high to beat anything
      }}
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={submit}
        style={{
          width: 'min(900px, 96%)',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'white',
          padding: '1.25rem',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      >
        <h2
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          {isEdit ? 'Edit Entry' : 'Add Entry'}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as any })}
            style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
          >
            <option>Movie</option>
            <option>TV Show</option>
          </select>

          <input
            placeholder="Director"
            value={form.director}
            onChange={(e) => setForm({ ...form, director: e.target.value })}
            style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
          />
          <input
            placeholder="Budget"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
          />
          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
          />
          <input
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
          />
          <input
            placeholder="Year/Time"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
          />
          <input
            placeholder="Poster URL"
            value={form.posterUrl}
            onChange={(e) => setForm({ ...form, posterUrl: e.target.value })}
            style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
          />
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            style={{
              padding: 8,
              border: '1px solid #ddd',
              borderRadius: 6,
              gridColumn: '1 / -1',
            }}
          />
        </div>

        <div
          style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}
        >
          <button
            type="button"
            onClick={() => onClose && onClose()}
            style={{
              marginRight: 8,
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #ddd',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              background: '#16a34a',
              color: 'white',
              border: 'none',
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(modal, document.body);
}
