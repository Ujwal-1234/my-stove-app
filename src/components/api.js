async function fetchData(endpoint, options = {}) {
    const BASE_URL = 'http://pradnyaconsultant.in:3000';
    const url = `${BASE_URL}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options.data),
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  }

  export default fetchData;