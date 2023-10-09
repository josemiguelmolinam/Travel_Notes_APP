import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import NoteCreateForm from '../../components/NoteCreateForm/NoteCreateForm';

const NoteCreatePage = () => {
  const { token } = useAuth();

  if (!token) return <Navigate to='/' />;

  return (
    <main className='noteCreate'>
      <NoteCreateForm token={token} />
    </main>
  );
};

export default NoteCreatePage;
