function fun() {
  const salons = Salon.find();
  return salons;
}

fun()
  .then(() => {
    const salonsWithDistance = salons
      ?.filter((salon) => salon?.location && salon?.location?.coordinates)
      .map((salon) => {
        const [lon, lat] = salon.location.coordinates; // GeoJSON format: [longitude, latitude]
        const distance = getDistanceFromLatLonInMeters(
          parseFloat(latitude),
          parseFloat(longitude),
          lat,
          lon
        );
        return { ...salon._doc, distance };
      });

    // Sort salons by distance (nearest first)
    salonsWithDistance.sort((a, b) => a.distance - b.distance);

    // Return the sorted salons
    res.json(salonsWithDistance);
  })
  .catch((err) => {
    console.log(err);
  });




  MONGODB_URI =mongodb+srv://shohrab119:YcAfudhAebweUhMH@shohrabapi.ksbe4gt.mongodb.net/?retryWrites=true&w=majority&appName=shohrabApi