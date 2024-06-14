import React from 'react';
import Feature1 from '../../assets/images/icon/satisfaction-guarantee.png';
import Feature2 from '../../assets/images/icon/professional-team.png';
import Feature3 from '../../assets/images/icon/material-instrument.png';
import Feature4 from '../../assets/images/icon/experience.png';

const Feature = () => {
    return (
        <>
            <div className="features-area bg-white pt-110 pb-110">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6">
                            <div className="single-feature text-center box-shadow-3">
                                <div className="single-feature-icon">
                                    <img src={Feature1} alt="" />
                                </div>
                                <h5>Efficient Management</h5>
                                <p>Manage all cleaning operations efficiently ensuring a clean and healthy environment.</p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6">
                            <div className="single-feature text-center box-shadow-3">
                                <div className="single-feature-icon">
                                    <img src={Feature2} alt="" />
                                </div>
                                <h5>Expert Cleaners</h5>
                                <p>Our team of professional cleaners ensures top-notch cleanliness standards across all departments.</p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6">
                            <div className="single-feature text-center box-shadow-3">
                                <div className="single-feature-icon">
                                    <img src={Feature3} alt="" />
                                </div>
                                <h5>Quality Tools</h5>
                                <p>Utilize the best cleaning tools and materials for effective and efficient cleaning operations.</p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6">
                            <div className="single-feature text-center box-shadow-3">
                                <div className="single-feature-icon">
                                    <img src={Feature4} alt="" />
                                </div>
                                <h5>Years of Experience</h5>
                                <p>With over 20 years of experience, our cleaning management system is both reliable and trusted.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feature;
