import React from 'react';
import HomeAboutImg from '../../assets/images/about/about.jpg';

const HomeAbout = () => {
    return (
        <>
            <div className="about-area gray-bg-2 pt-200 pb-160">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="about-img-style-1">
                                <img src={HomeAboutImg} alt="" />
                                <div className="about-award">
                                    <h3>Providing Excellence Since 2000! Over 200 Awards</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="about-text-wrapper pt-30">
                                <div className="section-title mb-40">
                                    <span>Dedicated to Maintaining Clean Campus Environments</span>
                                    <h2 className="mb-30">20 Years of Excellence in University Cleaning Services</h2>
                                    <p>Our system ensures that all cleaning tasks are efficiently managed and complaints are promptly addressed.
                                        <br /><br /> With a structured approach, we guarantee a clean and healthy environment for all university departments, supported by a team of skilled supervisors and cleaners. </p>
                                </div>
                                <a href="/contact" className="l-btn">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeAbout;
