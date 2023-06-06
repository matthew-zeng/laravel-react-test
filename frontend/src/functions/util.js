export function getFirstLetters(string) {
  const firstLetters = string.split(" ").map(word => word.charAt(0));
  return firstLetters
}

export function getUniqueValues(array, attribute) {
  const uniqueValues = [];

  array.forEach(obj => {
    const value = obj[attribute];
    if (!uniqueValues.includes(value)) {
      uniqueValues.push(value);
    }
  });

  return uniqueValues;
}