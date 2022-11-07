export const generateAvailableCoordinates = (size: number) => {
  const coordinates = [];

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      coordinates.push([x, y]);
    }
  }

  return coordinates;
};
