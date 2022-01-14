export default async function () {
  const res = await fetch(`https://data.sfgov.org/resource/yitu-d5am.json?%24limit=10000`)
  const rawData = await res.json()

  return mergeLocations(rawData);
}

const mergeLocations = (rawData) => {
  return rawData.reduce((acc, curr) => {
    const location = curr.locations || null;

    // acc contains item with same title
    if (acc.find(item => item.title === curr.title)) {
      return acc.map(item => {
        if (item.title === curr.title) {
          item.locations.push(location);
        }
        return item;
      });
    }
    // make locations an array if not already in acc
    curr.locations = [location];

    // if acc doesn't contain item with same title, add it
    acc.push(curr);
    return acc;
}, [])
}
