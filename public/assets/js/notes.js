let noteTitle = document.getElementById('note-title');
let noteText = document.getElementById('note-text');
let saveNoteBtn = document.getElementById('save-note');
let newNoteBtn = document.getElementById('new-note');
let clearNoteBtn = document.getElementById('clear-note');
let noteList = document.getElementById('note-list');

const fetchNotes = async () => {
  try {
    const res = await fetch('/api/notes');
    if (!res.ok) throw new Error('Failed to fetch notes');
    const notes = await res.json();
    displayNotes(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};

const displayNotes = (notes) => {
  noteList.innerHTML = '';
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.textContent = note.title;
    li.addEventListener('click', () => loadNote(note));
    noteList.appendChild(li);
  });
};

const loadNote = (note) => {
  noteTitle.value = note.title;
  noteText.value = note.text;
  saveNoteBtn.classList.add('hidden');
  clearNoteBtn.classList.remove('hidden');
};

newNoteBtn.addEventListener('click', () => {
  noteTitle.value = '';
  noteText.value = '';
  saveNoteBtn.classList.remove('hidden');
  clearNoteBtn.classList.remove('hidden');
});

saveNoteBtn.addEventListener('click', async () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNote),
  });
  fetchNotes();
  noteTitle.value = '';
  noteText.value = '';
  saveNoteBtn.classList.add('hidden');
  clearNoteBtn.classList.add('hidden');
});

clearNoteBtn.addEventListener('click', () => {
  noteTitle.value = '';
  noteText.value = '';
  clearNoteBtn.classList.add('hidden');
});

fetchNotes();
