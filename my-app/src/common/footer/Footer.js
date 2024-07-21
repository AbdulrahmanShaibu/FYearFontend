import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const adRef = useRef(null);

    useEffect(() => {
        // Replace the URL with a real API endpoint if available
        axios.get('https://fake-json-api.mock.beeceptor.com/notifications')
            .then(response => {
                // Ensure response.data.urls is an array
                setAdvertisements(Array.isArray(response.data.urls) ? response.data.urls : []);
            })
            .catch(error => {
                setAdvertisements([]);
                console.error('There was an error fetching the advertisements!', error);
            });

        if (adRef.current) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);

    useEffect(() => {
        if (advertisements.length > 0) {
            const interval = setInterval(() => {
                setCurrentAdIndex(prevIndex => (prevIndex + 1) % advertisements.length);
            }, 3000); // Change slide every 3 seconds

            return () => clearInterval(interval);
        }
    }, [advertisements]);

    const currentYear = new Date().getFullYear();

    const iconStyle = {
        color: 'blue',
        fontSize: '20px',
        transition: 'color 0.3s ease-in-out',
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        display: 'block',
        marginTop: '10px'
    };

    return (
        <footer style={{ background: 'whitesmoke', color: '#fff', padding: '40px 20px' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '20px',
                    width: '100%',
                    maxWidth: '800px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ textAlign: 'center', flex: '1' }}>
                        <h4 style={{ margin: '0 0 10px' }}>Contact Us</h4>
                        <p>If you have any questions or need help, feel free to contact us.</p>
                        <p><FaPhoneAlt /> (+255) 675 709 82</p>
                        <Link to="https://www.google.com/maps/place/State+University+of+Zanzibar/@-6.1985316,39.3074509,17z/data=!3m1!4b1!4m6!3m5!1s0x185cd86f80e1becd:0x670d4c8e55b47d57!8m2!3d-6.1985316!4d39.3074509!16s%2Fg%2F1pp2x6ky1?authuser=0&entry=ttu"
                            style={linkStyle}>
                            <p>SUZA, Tunguu</p>
                        </Link>
                    </div>
                    <div style={{ textAlign: 'center', flex: '1' }}>
                        <h4 style={{ margin: '0 0 10px' }}>Newsletter</h4>
                        <p>Established since 2000. Providing top-notch cleaning services for universities.</p>
                        <div style={{ marginTop: '20px' }}>
                            <h5>Follow Us:</h5>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                <Link to="/" style={iconStyle} aria-label="Facebook">
                                    <FaFacebookF />
                                </Link>
                                <Link to="/" style={iconStyle} aria-label="Twitter">
                                    <FaTwitter />
                                </Link>
                                <Link to="/" style={iconStyle} aria-label="Instagram">
                                    <FaInstagram />
                                </Link>
                                <Link to="/" style={iconStyle} aria-label="Pinterest">
                                    <FaPinterestP />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '20px', width: '100%', maxWidth: '800px', textAlign: 'center' }}>
                    <h4 style={{ margin: '0 0 10px' }}>Advertisements</h4>
                    {advertisements.length > 0 ? (
                        <img src={advertisements[currentAdIndex]} alt="Advertisement" style={{ width: '100%', maxWidth: '800px', borderRadius: '10px' }} />
                    ) : (
                        <div style={{ width: '100%', maxWidth: '800px', borderRadius: '10px' }}>
                            <ins className="adsbygoogle"
                                style={{ display: 'block', width: '100%' }}
                                data-ad-client="ca-pub-1234567890123456"
                                data-ad-slot="1234567890"
                                data-ad-format="auto"
                                data-full-width-responsive="true"
                                ref={adRef}></ins>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'white', color: '#fff', textAlign: 'center', marginTop: '20px' }}>
                <p style={{ margin: '0' }}>
                    © {currentYear} University Cleaners. All rights reserved. Developed by
                    <a href="https://github.com/AbdulrahmanShaibu"
                        style={{ color: '#fff', textDecoration: 'underline', marginLeft: '5px' }}
                        aria-label="Developer's GitHub">
                        Suza Student
                    </a>.
                </p>
                <div style={{ marginTop: '10px' }}>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }} aria-label="About University Cleaners">
                        About University Cleaners
                    </Link>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }} aria-label="Careers">
                        Careers
                    </Link>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }} aria-label="Privacy Policy">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
