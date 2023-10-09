import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useNoteById = (noteId) => {
  const { token } = useAuth();

  const [note, setNote] = useState(null);
  const [errorMsg, seterrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:8000/notes/${noteId}`,

          {
            headers: {
              Authorization: token,
            },
          }
        );

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setNote(body.data.note);
      } catch (err) {
        seterrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchNote();
  }, [token, noteId]);

  return { note, errorMsg, loading };
};
export default useNoteById;
