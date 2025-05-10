export const fetchProblemList = async () => {
    try {
      const response = await fetch('/data/questions.json');
      if (!response.ok) {
        throw new Error('Failed to fetch problem list');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching problem list:', error);
      return [];
    }
  };
  