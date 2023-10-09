import RegisterForm from '../../components/RegisterForm/RegisterForm';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const { token } = useAuth();
  if (token) return <Navigate to='/' />;

  return (
    <main className='register'>
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
