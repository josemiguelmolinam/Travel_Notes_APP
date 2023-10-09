const categoryService = async (name, token) => {
  const formData = new FormData();
  console.log(name);
  console.log(token);
  formData.append('title', name);
  const res = await fetch('http://localhost:8000/categories', {
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

export default categoryService;
