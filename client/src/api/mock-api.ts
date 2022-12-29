import localforage from "localforage";

type Note = {
    id: string;
    title: string;
    content: string;
}

export async function getNotes(): Promise<Note[]> {
  let notes = await localforage.getItem<Note[]>("notes");
  if (!notes) notes = [];
  return notes;
}

export async function createNote({ title, content }: Note) {
  let id = Math.random().toString(36).substring(2, 9);
  let note = { id, title, content };
  // let note = { id, title: '', content: '' };
  let notes = await getNotes();
  notes.unshift(note);
  await set(notes);
  return note;
}

export async function getNote(id: string) {
  let notes = await localforage.getItem<Note[]>("notes");
  if (!notes) return false;
  let note = notes.find((note) => note.id === id);
  return note ?? null;
}

export async function deleteNote(id: string) {
  let notes = await localforage.getItem<Note[]>("notes");
  if (!notes) return false;
  let index = notes?.findIndex((note) => note.id === id);
  if (index > -1) {
    notes.splice(index, 1);
    await set(notes);
    return true;
  }
  return false;
}

function set(notes: Note[]) {
  return localforage.setItem("notes", notes);
}