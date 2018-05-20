async function fetching(url: ?string): Promise {
  try {
    let res = await fetch(url);
    let resJson = await res.json();

    return Promise.resolve(resJson);
  } catch (error) {
    return error;
  }
}

export default fetching;
