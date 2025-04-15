const generateBookingEmail = (data) => {
  return `
    <h1>New Booking Request</h1>
    <p><strong>Name:</strong> ${data.name} ${data.lastname}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong> ${data.message}</p>
  `;
};

export default generateBookingEmail;
