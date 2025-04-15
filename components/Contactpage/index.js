import React from "react";
import ContactForm from "../ContactFrom";

const Contactpage = () => {
  return (
    <div id="Contact" className="contact-area section-padding">
      <div className="container">
        <div className="wpo-contact-info">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="info-item">
                <div className="info-wrap">
                  <div className="info-icon">
                    <i className="fi flaticon-internet"></i>
                  </div>
                  <div className="info-text">
                    <span>Office Address</span>
                  </div>
                </div>
                <h2>32c/2 new Mosque Road Udathalawinna Madige Kandy</h2>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="info-item">
                <div className="info-wrap">
                  <div className="info-icon">
                    <i className="fi flaticon-email"></i>
                  </div>
                  <div className="info-text">
                    <span>Official Mail</span>
                  </div>
                </div>
                <h2>info@ayaantours.com</h2>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="info-item">
                <div className="info-wrap">
                  <div className="info-icon">
                    <i className="fi flaticon-null-1"></i>
                  </div>
                  <div className="info-text">
                    <span>Official Phone</span>
                  </div>
                </div>
                <h2>+94 77 374 1989</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-content">
          <h2>Send a Message</h2>
          <div className="contact-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactpage;
