import { useState } from 'react';
import PropTypes from 'prop-types';
import loginService from '../../services/loginService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './LoginForm.css';
const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const token = await loginService(email, password);

      login(token);
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <div className='button-container'>
        <button>Login</button>
      </div>

      {errMsg && <ErrorMessage msg={errMsg} />}
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func,
};
export default LoginForm;
