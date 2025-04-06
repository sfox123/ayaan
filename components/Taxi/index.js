import React, { useState } from "react";
import dynamic from "next/dynamic";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

// Dynamically import Lottie (so it doesn’t render on server side)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import taxiAnimation from "../../public/taxi.json";

const page = () => {
  const [formData, setFormData] = useState({
    passengerName: "",
    email: "",
    contactNumber: "",
    vehicleType: "Car",
    from: "",
    to: "",
  });

  const [loading, setLoading] = useState(false);
  const [autocompleteFrom, setAutocompleteFrom] = useState(null);
  const [autocompleteTo, setAutocompleteTo] = useState(null);

  // Basic onChange handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Autocomplete
  const handlePlaceSelectFrom = () => {
    if (autocompleteFrom) {
      const place = autocompleteFrom.getPlace();
      setFormData({ ...formData, from: place?.formatted_address || "" });
    }
  };

  const handlePlaceSelectTo = () => {
    if (autocompleteTo) {
      const place = autocompleteTo.getPlace();
      setFormData({ ...formData, to: place?.formatted_address || "" });
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add more robust validations here if needed
    if (
      !formData.passengerName.trim() ||
      !formData.email.trim() ||
      !formData.contactNumber.trim() ||
      !formData.vehicleType.trim() ||
      !formData.from.trim() ||
      !formData.to.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Example of capturing form data in a query parameter
    const queryParams = new URLSearchParams(formData).toString();
    const url = `https://example.com/submit?${queryParams}`;
    console.log("Form submitted to:", url);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted successfully!");
    }, 2000);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
      libraries={["places"]}
    >
      <div className="taxi-booking-container">
        <div className="row">
          {/* Left Column: Lottie Animation */}
          <div className="col-lg-6 col-md-12 taxi-animation">
            <Lottie
              animationData={taxiAnimation}
              loop
              autoplay
              className="lottie-animation"
            />
          </div>

          {/* Right Column: Form */}
          <div className="col-lg-6 col-md-12 form-container">
            <form onSubmit={handleSubmit} className="taxi-booking-form">
              <h2>Book Your Ride</h2>

              {/* First row: Passenger Name & Email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="passengerName">Passenger Name</label>
                  <input
                    type="text"
                    id="passengerName"
                    name="passengerName"
                    value={formData.passengerName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Second row: Contact Number & Vehicle Type */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vehicleType">Vehicle Type</label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="Tuk Tuk">Tuk Tuk</option>
                  </select>
                </div>
              </div>

              {/* Third row: From & To */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from">From</label>
                  <Autocomplete
                    onLoad={(autocomplete) => setAutocompleteFrom(autocomplete)}
                    onPlaceChanged={handlePlaceSelectFrom}
                  >
                    <div className="autocomplete-container">
                      <input
                        type="text"
                        id="from"
                        name="from"
                        placeholder="Enter pickup location"
                        value={formData.from}
                        onChange={(e) =>
                          setFormData({ ...formData, from: e.target.value })
                        }
                        required
                      />
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="location-icon"
                      />
                    </div>
                  </Autocomplete>
                </div>

                <div className="form-group">
                  <label htmlFor="to">To</label>
                  <Autocomplete
                    onLoad={(autocomplete) => setAutocompleteTo(autocomplete)}
                    onPlaceChanged={handlePlaceSelectTo}
                  >
                    <div className="autocomplete-container">
                      <input
                        type="text"
                        id="to"
                        name="to"
                        placeholder="Enter drop-off location"
                        value={formData.to}
                        onChange={(e) =>
                          setFormData({ ...formData, to: e.target.value })
                        }
                        required
                      />
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="location-icon"
                      />
                    </div>
                  </Autocomplete>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default page;
