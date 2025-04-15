import { useRouter } from "next/router";
import data from "../../api/destination";

const Page = () => {
  const router = useRouter();
  const { city } = router.query;

  // Ensure `city` is available before rendering
  if (!city) {
    return <p>Loading...</p>;
  }

  const selectedCityData = data.find(
    (item) => item.title.toLocaleLowerCase() === city
  );

  return (
    <div>
      <h1>Destination: {city}</h1>
      {selectedCityData ? (
        <div>
          <h2>{selectedCityData.title}</h2>
          <p>{selectedCityData.description}</p>
          <h3>Highlights</h3>
          <ul>
            {selectedCityData.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
          <h3>Duration</h3>
          <p>{selectedCityData.duration}</p>
          <h3>Ideal For</h3>
          <ul>
            {selectedCityData.idealFor.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>City data not found.</p>
      )}
      <h2>Book Your Ride</h2>
    </div>
  );
};

export default Page;
