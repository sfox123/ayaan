const generateBookingEmail = (data) => {
  return `
    <h2>🚕 New Taxi Booking Request</h2>
    <p><strong>Name:</strong> ${data.passengerName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Contact:</strong> ${data.contactNumber}</p>
    <p><strong>Vehicle:</strong> ${data.vehicleType}</p>
    <p><strong>From:</strong> ${data.from}</p>
    <p><strong>To:</strong> ${data.to}</p>
    <hr />
    <p>Respond ASAP!</p>
  `;
};

module.exports = generateBookingEmail;
