const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      // Check if response has error message
      if (data && data.message) {
        throw new Error(
          `Request failed with status ${response.status}: ${data.message}`,
        );
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export default fetchData;
