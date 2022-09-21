export async function get(endpoint: string) {
  return new Promise((res, rej) => {
    fetch(endpoint)
      .then((response) => {
        const obj = response.json();
        res(obj);
      })
      .catch((err) => {
        rej(err);
      });
  });
}
