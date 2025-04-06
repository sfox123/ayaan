const generateConfirmationEmail = (name) => {
  return `
    <h2>Thank you for booking with Ayaan Tours!</h2>
    <p>Hi ${name},</p>
    <p>We've received your booking request. We're already working on finding you a driver.</p>
    <p>You'll hear from us shortly. Sit tight!</p>
    <br />
    <p>🚖 Ayaan Tours Team</p>
  `;
};

module.exports = generateConfirmationEmail;
