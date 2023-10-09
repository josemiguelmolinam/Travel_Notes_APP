const editNoteService = async (
  noteId,
  title,
  text,
  categoryId,
  file,
  token
) => {
  const formData = new FormData();

  formData.append('title', title);
  formData.append('text', text);
  formData.append('categoryId', categoryId);

  if (file) formData.append('image', file);

  const res = await fetch(`http://localhost:8000/notes/${noteId}`, {
    method: 'put',
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }
};

export default editNoteService;
