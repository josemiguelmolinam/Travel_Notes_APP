const createnoteService = async (title, text, categoryId, file, token) => {
  const formData = new FormData();
  console.log(title);
  console.log(text);
  console.log(categoryId);
  console.log(token);
  formData.append('title', title);
  formData.append('text', text);
  formData.append('categoryId', categoryId);
  if (file) formData.append('image', file);
  const res = await fetch('http://localhost:8000/notes', {
    method: 'post',
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

export default createnoteService;
