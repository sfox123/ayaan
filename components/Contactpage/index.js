import React from 'react';
import ContactForm from '../ContactFrom'

const Contactpage = () => {

    return(
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
                                        <span>Hotel Address</span>
                                    </div>
                                </div>
                                <h2>25 North Street,Dubai</h2>
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
                                <h2>info@varaus.com</h2>
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
                                <h2>+91 256-987-239</h2>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="contact-content">
                    <h2>Send a Message</h2>
                    <div className="contact-form">
                        <ContactForm/>
                    </div>
                </div>
                <div className="contact-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.11976314309273!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbd!4v1547528325671"></iframe>
                </div>
            </div>
        </div>
     )
        
}

export default Contactpage;
