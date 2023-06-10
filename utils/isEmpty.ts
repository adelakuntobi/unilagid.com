export function findEmptyField(data, optionalFields = []) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // Check if the field is optional
      if (!optionalFields.includes(key)) {
        if (data[key] === undefined || data[key] === null || data[key] === "") {
          return key;
        }
      }
    }
  }
  return null;
}
