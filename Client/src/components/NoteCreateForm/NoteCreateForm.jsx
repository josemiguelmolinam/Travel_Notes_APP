import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import createnoteService from '../../services/createnoteService';
import PropTypes from 'prop-types';
import './NoteCreateForm.css';

const NoteCreateForm = ({ token }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [file, setFile] = useState();
  const [errMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      await createnoteService(title, text, categoryId, file, token);

      navigate('/notes');
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Crea tu nota de viaje</h2>
      <label htmlFor='title'>Titulo:</label>
      <input
        type='text'
        id='title'
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor='text'>Nota:</label>
      <textarea
        type='text'
        id='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        required
      ></textarea>

      <select
        className='categoria'
        name='category'
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value=''>Selecciona una Categoria</option>
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

NoteCreateForm.propTypes = {
  token: PropTypes.string,
};

export default NoteCreateForm;
