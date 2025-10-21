"use client";

import React, { useState } from "react";
import styles from "./bookingDetailsForm.module.css";

const defaultValues = {
  passengerName: "",
  email: "",
  contactNumber: "",
  pickupLocation: "",
  dropoffLocation: "",
  travelDate: "",
  travelTime: "",
};

export default function BookingDetailsForm({ onNext }) {
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.passengerName.trim()) {
      nextErrors.passengerName = "Passenger name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.contactNumber.trim()) {
      nextErrors.contactNumber = "Contact number is required.";
    }

    if (!formData.pickupLocation.trim()) {
      nextErrors.pickupLocation = "Please add the pickup location.";
    }

    if (!formData.dropoffLocation.trim()) {
      nextErrors.dropoffLocation = "Please add the drop-off location.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onNext?.(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Plan your journey</h2>
        <p className={styles.description}>
          Provide your travel details so we can recommend the most suitable
          vehicle for your ride.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="passengerName">Passenger name</label>
            <input
              id="passengerName"
              name="passengerName"
              type="text"
              value={formData.passengerName}
              onChange={handleChange}
              placeholder="Alex Johnson"
              autoComplete="name"
            />
            {errors.passengerName && (
              <span className={styles.error}>{errors.passengerName}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="contactNumber">Contact number</label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+94 77 123 4567"
              autoComplete="tel"
            />
            {errors.contactNumber && (
              <span className={styles.error}>{errors.contactNumber}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              autoComplete="email"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="travelDate">Travel date</label>
            <input
              id="travelDate"
              name="travelDate"
              type="date"
              value={formData.travelDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="pickupLocation">Pickup location</label>
            <input
              id="pickupLocation"
              name="pickupLocation"
              type="text"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Bandaranaike International Airport"
              autoComplete="off"
            />
            {errors.pickupLocation && (
              <span className={styles.error}>{errors.pickupLocation}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="dropoffLocation">Drop-off location</label>
            <input
              id="dropoffLocation"
              name="dropoffLocation"
              type="text"
              value={formData.dropoffLocation}
              onChange={handleChange}
              placeholder="Colombo City Centre"
              autoComplete="off"
            />
            {errors.dropoffLocation && (
              <span className={styles.error}>{errors.dropoffLocation}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="travelTime">Preferred time</label>
            <input
              id="travelTime"
              name="travelTime"
              type="time"
              value={formData.travelTime}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.primaryButton}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
