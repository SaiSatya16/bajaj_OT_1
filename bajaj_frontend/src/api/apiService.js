const API_URL = process.env.REACT_APP_API_URL;

export async function processData(input) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: input,  
  });
  
  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}
//api