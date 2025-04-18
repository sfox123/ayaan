import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { motion, AnimatePresence } from "framer-motion";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import taxiAnimation from "../../public/taxi.json";

const TaxiBooking = () => {
  const [formData, setFormData] = useState({
    passengerName: "",
    email: "",
    contactNumber: "",
    vehicleType: "Car",
    from: "",
    to: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formKey, setFormKey] = useState(0); // 👈 to reset form
  const [autocompleteFrom, setAutocompleteFrom] = useState(null);
  const [autocompleteTo, setAutocompleteTo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceSelectFrom = () => {
    if (autocompleteFrom) {
      const place = autocompleteFrom.getPlace();
      setFormData((prev) => ({
        ...prev,
        from: place?.formatted_address || "",
      }));
    }
  };

  const handlePlaceSelectTo = () => {
    if (autocompleteTo) {
      const place = autocompleteTo.getPlace();
      setFormData((prev) => ({ ...prev, to: place?.formatted_address || "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    setSuccessMessage("");

    try {
      const res = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessMessage("🎉 Your ride request was submitted successfully!");

        // Reset form data
        setFormData({
          passengerName: "",
          email: "",
          contactNumber: "",
          vehicleType: "Car",
          from: "",
          to: "",
        });

        if (autocompleteFrom) autocompleteFrom.set("place", null);
        if (autocompleteTo) autocompleteTo.set("place", null);

        // Force re-render to reset all input values
        setFormKey((prev) => prev + 1);
      } else {
        alert(result.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
      libraries={["places"]}
    >
      <div className="taxi-booking-container" style={{ zIndex: 1000 }}>
        <div className="row" style={{ zIndex: 100 }}>
          {/* Animation */}
          <div
            className="col-lg-6 col-md-12 taxi-animation"
            style={{ zIndex: 10 }}
          >
            <Lottie
              animationData={taxiAnimation}
              loop
              autoplay
              className="lottie-animation"
            />
          </div>

          {/* Form */}
          <div
            className="col-lg-6 col-md-12 form-container"
            style={{ zIndex: 1 }}
          >
            <form
              key={formKey}
              onSubmit={handleSubmit}
              className="taxi-booking-form"
            >
              <h2>Book Your Ride</h2>

              {/* Success Message */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {successMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name & Email */}
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

              {/* Contact & Vehicle */}
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

              {/* From & To */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from">From</label>
                  <Autocomplete
                    onLoad={setAutocompleteFrom}
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
                    onLoad={setAutocompleteTo}
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

              {/* Submit */}
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

export default TaxiBooking;
