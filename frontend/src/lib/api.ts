const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function fetchEntries(page = 1, limit = 20) {
  const res = await fetch(
    `${BASE_URL}/api/entries?page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error('Failed to fetch entries');
  return res.json();
}

export async function createEntry(body: any) {
  const res = await fetch(`${BASE_URL}/api/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  // read error body (prefer JSON) and attach to thrown Error
  let payload: any;
  try {
    payload = await res.json();
  } catch {
    payload = await res.text();
  }
  const err: any = new Error('Create failed');
  err.response = payload;
  throw err;
}

export async function updateEntry(id: number, body: any) {
  const res = await fetch(`${BASE_URL}/api/entries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let payload: any;
    try {
      payload = await res.json();
    } catch {
      payload = await res.text();
    }
    const err: any = new Error('Update failed');
    err.response = payload;
    throw err;
  }
  return res.json();
}

export async function deleteEntry(id: number) {
  const res = await fetch(`${BASE_URL}/api/entries/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete entry');
  return res.json();
}
