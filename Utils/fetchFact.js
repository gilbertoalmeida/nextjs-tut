export const fetchFact = async () => {
  const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en')
  const json = await response.json()

  return json
}