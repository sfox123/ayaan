import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { motion, AnimatePresence } from "framer-motion";

const vehicleOptions = [
  { name: "Mini Car", value: "mini-car", image: "/images/taxi/3.png" },
  { name: "Mini Van", value: "mini-van", image: "/images/taxi/4.png" },
  { name: "Van", value: "van", image: "/images/taxi/1.png" },
  { name: "Mini Bus", value: "mini-bus", image: "/images/taxi/5.png" },
];

const TaxiBookingPage = (props) => {
  const { handleVisible } = props || {};

  const [formData, setFormData] = useState({
    passengerName: "",
    email: "",
    contactNumber: "",
    vehicleType: "",
    from: "",
    to: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formKey, setFormKey] = useState(0);
  const [autocompleteFrom, setAutocompleteFrom] = useState(null);
  const [autocompleteTo, setAutocompleteTo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleVehicleSelection = (vehicleValue) => {
    setFormData((prev) => ({ ...prev, vehicleType: vehicleValue }));
    if (formErrors.vehicleType) {
      setFormErrors((prev) => ({ ...prev, vehicleType: undefined }));
    }
  };

  const handlePlaceSelectFrom = () => {
    if (autocompleteFrom) {
      const place = autocompleteFrom.getPlace();
      setFormData((prev) => ({
        ...prev,
        from: place?.formatted_address || "",
      }));
      if (formErrors.from) {
        setFormErrors((prev) => ({ ...prev, from: undefined }));
      }
    }
  };

  const handlePlaceSelectTo = () => {
    if (autocompleteTo) {
      const place = autocompleteTo.getPlace();
      setFormData((prev) => ({ ...prev, to: place?.formatted_address || "" }));
      if (formErrors.to) {
        setFormErrors((prev) => ({ ...prev, to: undefined }));
      }
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.passengerName?.trim()) {
      errors.passengerName = "Passenger name is required.";
    }
    if (!formData.email?.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.contactNumber?.trim()) {
      errors.contactNumber = "Contact number is required.";
    } else if (!/^\d{7,15}$/.test(formData.contactNumber)) {
      errors.contactNumber = "Invalid contact number (7-15 digits).";
    }
    if (!formData.vehicleType) {
      errors.vehicleType = "Please select a vehicle type.";
    }
    if (!formData.from?.trim()) {
      errors.from = "Pickup location is required.";
    }
    if (!formData.to?.trim()) {
      errors.to = "Drop-off location is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessMessage("🎉 Your ride request was submitted successfully!");
        setFormData({
          passengerName: "",
          email: "",
          contactNumber: "",
          vehicleType: "",
          from: "",
          to: "",
        });

        // Clear Autocomplete inputs visually
        // Note: The method to clear Autocomplete inputs can be tricky.
        // Directly setting the input value to "" might be necessary if `set("place", null)` isn't enough.
        // For this example, we rely on re-keying the form or direct input value manipulation if needed.
        const fromInput = document.getElementById("taxi-book__from");
        const toInput = document.getElementById("taxi-book__to");
        if (fromInput) fromInput.value = "";
        if (toInput) toInput.value = "";

        setFormKey((prev) => prev + 1); // Re-key to reset form state including Autocomplete
      } else {
        setErrorMessage(
          result.error || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
      libraries={["places"]}
    >
      {/* The main container for the form, acting as the 'popup' content */}
      <div
        id="taxi-book__container"
        className="taxi-book__container"
        // style={{ zIndex: 1000 }} // Keep z-index if it's a direct child of body for popup
      >
        {/* Form itself */}
        <form
          key={formKey}
          onSubmit={handleSubmit}
          className="taxi-book__form"
          noValidate
        >
          <h2>Book Your Ride</h2>

          {/* Success and Error Messages */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                className="taxi-book__success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                role="status"
                aria-live="polite"
              >
                {successMessage}
              </motion.div>
            )}
            {errorMessage && (
              <motion.div
                className="taxi-book__error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                role="alert"
                aria-live="assertive"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Rows */}
          <div className="taxi-book__form-row">
            <div className="taxi-book__form-group">
              <label htmlFor="taxi-book__passengerName">Passenger Name</label>
              <input
                type="text"
                id="taxi-book__passengerName"
                name="passengerName"
                value={formData.passengerName}
                onChange={handleChange}
                required
              />
              {formErrors.passengerName && (
                <span className="taxi-book__validation-error">
                  {formErrors.passengerName}
                </span>
              )}
            </div>

            <div className="taxi-book__form-group">
              <label htmlFor="taxi-book__email">Email</label>
              <input
                type="email"
                id="taxi-book__email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && (
                <span className="taxi-book__validation-error">
                  {formErrors.email}
                </span>
              )}
            </div>
          </div>

          <div className="taxi-book__form-row">
            <div className="taxi-book__form-group">
              <label htmlFor="taxi-book__contactNumber">Contact Number</label>
              <input
                type="text" // Consider type="tel"
                id="taxi-book__contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
              {formErrors.contactNumber && (
                <span className="taxi-book__validation-error">
                  {formErrors.contactNumber}
                </span>
              )}
            </div>
            {/* This form group now acts as a full-width container for vehicle buttons */}
            {/* To make it span a new visual row and be full width, it's best placed outside a taxi-book__form-row or the row itself only contains this one group. */}
          </div>

          <div className="taxi-book__form-group taxi-book__vehicle-selection-group taxi-book__full-width-group">
            <label>Select Vehicle Type</label>
            <div className="taxi-book__vehicle-options-container">
              {vehicleOptions.map((vehicle) => (
                <button
                  type="button"
                  key={vehicle.value}
                  className={`taxi-book__vehicle-option-button ${
                    formData.vehicleType === vehicle.value
                      ? "taxi-book__selected"
                      : ""
                  }`}
                  onClick={() => handleVehicleSelection(vehicle.value)}
                >
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    width={80} // Adjust as needed
                    height={50} // Adjust as needed
                    style={{ objectFit: "contain" }} // Updated from objectFit prop
                  />
                  <span>{vehicle.name}</span>
                </button>
              ))}
            </div>
            {formErrors.vehicleType && (
              <span className="taxi-book__validation-error">
                {formErrors.vehicleType}
              </span>
            )}
          </div>

          <div className="taxi-book__form-row">
            <div className="taxi-book__form-group">
              <label htmlFor="taxi-book__from">From</label>
              <Autocomplete
                onLoad={(autocomplete) => {
                  // console.log("Autocomplete From loaded:", autocomplete);
                  setAutocompleteFrom(autocomplete);
                }}
                onPlaceChanged={handlePlaceSelectFrom}
              >
                <div className="taxi-book__autocomplete-container">
                  <input
                    type="text"
                    id="taxi-book__from" // Ensure this ID is unique if form is used multiple times on one page
                    name="from"
                    placeholder="Pickup location"
                    // value={formData.from} // Controlled by Autocomplete once a place is selected or by direct typing
                    defaultValue={formData.from} // Use defaultValue for non-strictly controlled or when reset by key
                    onChange={(e) => {
                      // Allow typing and update form data
                      setFormData({ ...formData, from: e.target.value });
                      if (formErrors.from && e.target.value.trim()) {
                        setFormErrors((prev) => ({ ...prev, from: undefined }));
                      }
                    }}
                    required
                  />
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="taxi-book__location-icon"
                  />
                </div>
              </Autocomplete>
              {formErrors.from && (
                <span className="taxi-book__validation-error">
                  {formErrors.from}
                </span>
              )}
            </div>

            <div className="taxi-book__form-group">
              <label htmlFor="taxi-book__to">To</label>
              <Autocomplete
                onLoad={(autocomplete) => {
                  // console.log("Autocomplete To loaded:", autocomplete);
                  setAutocompleteTo(autocomplete);
                }}
                onPlaceChanged={handlePlaceSelectTo}
              >
                <div className="taxi-book__autocomplete-container">
                  <input
                    type="text"
                    id="taxi-book__to" // Ensure this ID is unique
                    name="to"
                    placeholder="Drop-off location"
                    // value={formData.to}
                    defaultValue={formData.to}
                    onChange={(e) => {
                      setFormData({ ...formData, to: e.target.value });
                      if (formErrors.to && e.target.value.trim()) {
                        setFormErrors((prev) => ({ ...prev, to: undefined }));
                      }
                    }}
                    required
                  />
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="taxi-book__location-icon"
                  />
                </div>
              </Autocomplete>
              {formErrors.to && (
                <span className="taxi-book__validation-error">
                  {formErrors.to}
                </span>
              )}
            </div>
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="taxi-book__submit-button"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Request Ride"}
          </button>
        </form>
      </div>
    </LoadScript>
  );
};

export default TaxiBookingPage;
