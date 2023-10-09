import { useState } from 'react';
import registerService from '../../services/registerService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await registerService(username, email, password);

      navigate('/login');
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <label htmlFor='username'>Usuario:</label>
      <input
        type='text'
        id='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
        required
      />
      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        required
      />
      <label htmlFor='password'>Contraseña:</label>
      <input
        type='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        required
      />
      <button>Registrarse</button>

      {errMsg && <ErrorMessage msg={errMsg} />}
    </form>
  );
};
export default RegisterForm;
