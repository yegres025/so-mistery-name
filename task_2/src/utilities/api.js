export default async function getData() {
  const response = await fetch('https://v6.exchangerate-api.com/v6/6cbed18958c57dbd172de45a/latest/USD');
  try {
    if (response.ok) {
      const result = await response.json()      
      return result.conversion_rates      
    }
  } catch {
    throw new Error();
  }
}
