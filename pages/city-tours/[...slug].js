import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Scrollbar from "../../components/scrollbar";
import BlogList from "../../components/BlogList";
import Footer from "../../components/footer";
import cities from "../../api/city"; // Import your city array

const CityTours = () => {
  const router = useRouter();
  const { slug } = router.query; // Expected: [city, optionId]
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const cityParam = slug[0]; // e.g. "kandy" or "Kandy"
    const optionId = slug[1] ? parseInt(slug[1], 10) : null;

    // Filter the city array by title (case-insensitive)
    const cityFiltered = cities.filter(
      (c) => c.title.toLowerCase() === cityParam.toLowerCase()
    );
    if (cityFiltered.length && optionId !== null) {
      const selectedCity = cityFiltered[0];
      // Find the option with the matching id in the options array
      const selectedOption = selectedCity.options.find(
        (option) => option.id === optionId
      );
      setData(selectedOption || null);
    }
  }, [slug]);

  if (!slug) return null;

  return (
    <Fragment>
      <Navbar hclass={"wpo-header-style-3"} />
      <BlogList
        data={data}
        id={slug[1] ? parseInt(slug[1], 10) : null}
        title={slug[0]}
        blLeft={"order-lg-1"}
        blRight={"order-lg-2"}
      />
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default CityTours;
