import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    lastname: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Please enter your name";
    }
    if (!formData.email) {
      newErrors.email = "Please enter your email";
    }
    if (!formData.subject) {
      newErrors.subject = "Please enter your subject";
    }
    if (!formData.lastname) {
      newErrors.lastname = "Please enter your Lastname";
    }
    if (!formData.message) {
      newErrors.message = "Please enter your message";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/resendContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormData({
        name: "",
        email: "",
        subject: "",
        lastname: "",
        message: "",
      });

      setErrors({});
      setSuccessMessage("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      setErrors({
        form: "Failed to send your message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="contact-form">
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="form-field">
            <input
              value={formData.name}
              onChange={changeHandler}
              type="text"
              name="name"
              placeholder="First Name"
            />
            <p>{errors.name}</p>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="form-field">
            <input
              value={formData.lastname}
              onChange={changeHandler}
              type="text"
              name="lastname"
              placeholder="Lastname"
            />
            <p>{errors.lastname}</p>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="form-field">
            <input
              value={formData.email}
              onChange={changeHandler}
              type="email"
              name="email"
              placeholder="Email"
            />
            <p>{errors.email}</p>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="form-field">
            <input
              value={formData.subject}
              onChange={changeHandler}
              type="text"
              name="subject"
              placeholder="Subject"
            />
            <p>{errors.subject}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="form-field">
            <textarea
              value={formData.message}
              onChange={changeHandler}
              name="message"
              placeholder="Message"
            ></textarea>
            <p>{errors.message}</p>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-submit">
            <button type="submit" className="theme-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.form && <p className="error-message">{errors.form}</p>}
      </div>
    </form>
  );
};

export default ContactForm;
