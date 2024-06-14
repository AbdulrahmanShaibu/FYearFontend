import React from 'react';
import { Link } from 'react-router-dom';
import FooterBG from '../../assets/images/footer.png';
import { FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaAngleDoubleRight } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-top bg-property theme-bg-2 pt-110 pb-80" style={{ backgroundImage: `url(${FooterBG})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                <div className="footer-widget-1">
                                    <div className="footer-title">
                                        <h4>Contact Management</h4>
                                    </div>
                                    <div className="footer-text">
                                        <p>If you have any questions or need help, feel free to contact our team.</p>
                                    </div>
                                    <div className="footer-info">
                                        <Link to="/"><FaPhoneAlt /> (313) 666 7777</Link>
                                    </div>
                                    <div className="footer-text">
                                        <p>123 University Street, Campus City</p>
                                    </div>
                                    <div className="footer-info">
                                        <Link to="/"><FaPhoneAlt /> Get Directions</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
                                <div className="footer-widget-2">
                                    <div className="footer-title">
                                        <h4>Quick Links</h4>
                                    </div>
                                    <div className="footer-menu">
                                        <ul>
                                            <li><Link to="/">Contact Management</Link></li>
                                            <li><Link to="/">Cleaners</Link></li>
                                            <li><Link to="/">Tools</Link></li>
                                            <li><Link to="/">Departments</Link></li>
                                            <li><Link to="/">Supervisors</Link></li>
                                            <li><Link to="/">Tasks</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
                                <div className="footer-widget-3">
                                    <div className="footer-title">
                                        <h4>Our Services</h4>
                                    </div>
                                    <div className="footer-menu">
                                        <ul>
                                            <li><Link to="/">Floor Cleaning</Link></li>
                                            <li><Link to="/">Window Washing</Link></li>
                                            <li><Link to="/">Waste Disposal</Link></li>
                                            <li><Link to="/">Restroom Sanitization</Link></li>
                                            <li><Link to="/">Classroom Cleaning</Link></li>
                                            <li><Link to="/">Grounds Maintenance</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                <div className="footer-widget-4">
                                    <div className="footer-title">
                                        <h4>Newsletter</h4>
                                    </div>
                                    <div className="footer-text">
                                        <p>Established since 2000. Providing top-notch cleaning services for universities.</p>
                                    </div>
                                    <div className="footer-social mt-35">
                                        <h5>Follow Us:</h5>
                                        <ul>
                                            <li><Link to="/"><FaFacebookF /></Link></li>
                                            <li><Link to="/"><FaTwitter /></Link></li>
                                            <li><Link to="/"><FaInstagram /></Link></li>
                                            <li><Link to="/"><FaPinterestP /></Link></li>
                                        </ul>
                                    </div>
                                    <div className="footer-newsletter mt-40">
                                        <input type="text" placeholder="Email Address" />
                                        <button><FaAngleDoubleRight /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom bg-1 pt-40 pb-30">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                <div className="copyright">
                                    <p>© 2022 University Cleaners. All rights reserved. Developed by <a href="https://github.com/laksor">Ahmed Laskor</a>.</p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 text-xl-end text-lg-end text-md-end text-center">
                                <div className="footer-menu">
                                    <ul>
                                        <li><Link to="/">About University Cleaners</Link></li>
                                        <li><Link to="/">Careers</Link></li>
                                        <li><Link to="/">Privacy Policy</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
