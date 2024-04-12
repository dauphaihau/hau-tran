export const getPrices = async () => {
  return fetch(
    "https://interview.switcheo.com/prices.json",
  )
    .then((response) => response.json())
    .catch(err => {
      console.log('error', err)
    });
}
