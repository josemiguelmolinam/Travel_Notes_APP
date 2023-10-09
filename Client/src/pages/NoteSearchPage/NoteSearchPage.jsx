import useNotes from '../../hooks/useNotes';
import Note from '../../components/Note/Note';
import { NavLink } from 'react-router-dom';
import './NoteSearchPage.css';

const NoteSearchPage = () => {
  const { notes, deleteNote } = useNotes();

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
  };

  return (
    <main className='note-search'>
      <div className='head'>
        <h2>Listado de Notas</h2>
        <NavLink to='/' className='return-button'>
          Volver
        </NavLink>
      </div>
      <ul>
        {notes.length > 0 ? (
          notes.map((note) => (
            <Note key={note.id} note={note} onDelete={handleDeleteNote} />
  
          ))
        ) : (
          <li>¡No hay Notas Disponibles!</li>
        )}
      </ul>
    </main>
  );
};

export default NoteSearchPage;
