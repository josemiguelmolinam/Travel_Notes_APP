import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import editNoteService from '../../services/editNoteService';
import useAuth from '../../hooks/useAuth';
import useNoteById from '../../hooks/useNoteById';

const EditNotePage = () => {
  const { noteId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { note } = useNoteById(noteId);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [file] = useState();
  const [errMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setText(note.text);
      setCategoryId(note.categoryId);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      await editNoteService(note.id, title, text, categoryId, file, token);

      navigate('/notes');
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Nota</h2>
      <label htmlFor='title'>Titulo:</label>
      <input
        type='text'
        id='title'
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor='text'>Nota:</label>
      <input
        type='text'
        id='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        required
      />

      <select
        className='categoria'
        name='category'
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value=''>Selecciona una categoria</option>
        <option value='1'>Cultura y Patrimonio</option>
        <option value='2'>Naturaleza y Paisajes</option>
        <option value='3'>Aventuras y Exploración</option>
        <option value='4'>Gastronomía y Experiencias Culinarias</option>
        <option value='5'>Negocios y Viajes de Trabajo</option>
        <option value='6'>Historia y Tradiciones</option>
        <option value='7'>Consejos y Recomendaciones de Viaje</option>
        <option value='8'>Alojamiento y Hospedaje</option>
      </select>

      <button disabled={loading}>Guardar</button>

      {errMsg && <ErrorMessage msg={errMsg} />}
    </form>
  );
};

EditNotePage.propTypes = {
  token: PropTypes.string,
  noteToEdit: PropTypes.object,
};

export default EditNotePage;
