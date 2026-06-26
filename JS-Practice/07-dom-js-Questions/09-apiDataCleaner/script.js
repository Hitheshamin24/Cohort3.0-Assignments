const getPost = async () => {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await response.json();
    console.log(data);
    let mapped = data.map(({ id, title }) => {
      return { id, title };
    });
    return mapped;
  } catch (err) {
    console.error(err.message);
  }
};
(async () => {
  const result = await getPost();
  console.log(result);
})();
