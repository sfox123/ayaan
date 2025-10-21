"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./vehicleSelection.module.css";

const vehicles = [
  {
    id: "mini-car",
    name: "Mini Car",
    description: "Comfortable for solo travellers or couples with light luggage.",
    seats: "2 - 3 passengers",
    image: "/images/taxi/0.png",
  },
  {
    id: "sedan",
    name: "Sedan",
    description: "A balanced choice for city rides with medium luggage.",
    seats: "3 - 4 passengers",
    image: "/images/taxi/2.png",
  },
  {
    id: "mini-van",
    name: "Mini Van",
    description: "Ideal for small families or groups with extra bags.",
    seats: "5 - 6 passengers",
    image: "/images/taxi/3.png",
  },
  {
    id: "high-roof",
    name: "High Roof Van",
    description: "Spacious interior with generous cargo capacity.",
    seats: "8 - 12 passengers",
    image: "/images/taxi/6.png",
  },
];

export default function VehicleSelection({
  bookingDetails,
  onPrevious,
  onSubmit,
}) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [error, setError] = useState("");

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setError("");
  };

  const handleConfirm = () => {
    if (!selectedVehicle) {
      setError("Please choose a vehicle to continue.");
      return;
    }

    onSubmit?.(selectedVehicle);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Select a vehicle</h2>
        <p className={styles.description}>
          Tailor your ride from our curated fleet designed to suit every
          journey.
        </p>
      </div>

      {bookingDetails && (
        <div className={styles.summary}>
          <h3>Trip overview</h3>
          <p>
            {bookingDetails.pickupLocation || "Pickup"} →
            {" "}
            {bookingDetails.dropoffLocation || "Drop-off"}
          </p>
          {(bookingDetails.travelDate || bookingDetails.travelTime) && (
            <p>
              {[bookingDetails.travelDate, bookingDetails.travelTime]
                .filter(Boolean)
                .join(" at ")}
            </p>
          )}
        </div>
      )}

      <div className={styles.grid}>
        {vehicles.map((vehicle) => {
          const isSelected = selectedVehicle?.id === vehicle.id;
          return (
            <button
              type="button"
              key={vehicle.id}
              className={`${styles.card} ${isSelected ? styles.selected : ""}`}
              onClick={() => handleVehicleClick(vehicle)}
            >
              <span className={styles.badge}>{vehicle.seats}</span>
              <div className={styles.imageWrapper}>
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  width={280}
                  height={140}
                  priority={false}
                />
              </div>
              <h4>{vehicle.name}</h4>
              <p>{vehicle.description}</p>
            </button>
          );
        })}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onPrevious}
        >
          Go back
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleConfirm}
        >
          Confirm ride
        </button>
      </div>
    </div>
  );
}
