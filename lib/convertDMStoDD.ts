export default function convertDMStoDD(input: string) {
  const parts = input.split(",");
  const latitude = parseFloat(parts[0].substring(0, 6));
  const longitude = parseFloat(parts[1].substring(0, 7));

  return {
    latitude,
    longitude,
  };
}
