import React from "react";
import './style1/start.css'
import './footerStyle/footer.css'
// import './scripts/images.js'
import './images/suza.png'
import CopyrightFooter from "./Footer";
import RegistrationForm from "./RegistrationForm";
import { useEffect, useState } from "react";
import { colors } from "@material-ui/core";
import { Link } from "react-router-dom";
<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" /> */ }

//background-color: #faf4f4;

const Start = () => {

    const OpenForm = () => {
        alert("Get Registered!");
        <RegistrationForm />
    }

    const styleImages = {
        borderRadius: '50px',
        margin: 'auto',
        height: '100px'
    }

    // const Documentation = () => {
    //     alert('Open another page that gives details about How to complain')
    // }

    const texts = ['Welcome to the University Cleaners Management System! We revolutionize the way academic institutions maintain their cleanliness and hygiene standards.Our comprehensive range of services at University Cleaners Management System',
        'To meet the unique cleaning and sanitation demands of modern universities. We recognize that each institution has distinct requirements, and our diverse offerings cater to those specific needs, ensuring a hygienic and welcoming environment across the campus. ',
        'Our comprehensive range of services at University Cleaners Management System',
        'To meet the unique cleaning and sanitation demands of modern universities. We recognize that each institution has distinct requirements, and our diverse offerings cater to those specific needs, ensuring a hygienic and welcoming environment across the campus. ',
        '']; // Array of texts to cycle through
    const [index, setIndex] = useState(0); // State to track the current text index

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length); // Change the index every 3 seconds
        }, 3000);

        return () => clearInterval(interval); // Cleanup function to clear the interval on component unmount
    }, [texts.length]);

    const changeLinks = {
        color: {
            color: 'green'
        }
    }

    return (
        <div>
            <nav>
                <div class="container">
                    <br /> <br /> <br />
                    <ul className="navbar" id="menu">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact_us">Contact</a></li>
                        {/* <li onClick={Documentation}><a href="#documentation">Documentation</a></li> */}
                        <Link to={'/system/doc'} style={{ textTransform: 'upperCase' }}>Documentation</Link>
                        <li onClick={OpenForm}><a href="/register">Get Registered</a></li>
                    </ul>
                </div>
            </nav>
            <header id="header">
                <div className="intro">
                    <div className="overlay">
                        <div className="container">
                            <div className="row" style={{ margin: 'auto' }}>
                                <div className="col-md-12 col-md-offset-2 intro-text">
                                    <h1 style={{
                                        color: 'green',
                                        fontSize: '60px'
                                    }}>University Cleaners Management System</h1>
                                    <br />
                                    <p style={{
                                        color: 'white',
                                        fontWeight: 'bolder',
                                        fontSize: '16px'
                                    }}>Welcome to the University Cleaners Management System!
                                        We revolutionize the way academic institutions maintain their cleanliness and hygiene standards. Our innovative approach merges cutting-edge technology with meticulous attention to detail,
                                        ensuring that universities uphold pristine environments conducive to learning and well-being.</p>
                                    <a href="#services" className="btn btn-custom btn-lg page-scroll" style={{
                                        fontWeight: 'bolder', color: 'blue'
                                    }}>More Info</a> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* <br /><br /><br /><br /> */}
            <section id="home">
                {/* <h1>Home Section</h1> */}
                {/* Content for the home section */}
                <div className="homeSection">
                    <div className="homeText">
                        <p style={{ fontSize: '21px', color: 'green', justifyContent: 'center' }}>
                            We understand the pivotal role cleanliness plays in fostering a conducive educational atmosphere. Our comprehensive suite of services is
                            designed to cater specifically to the diverse needs of universities,
                            addressing everything from routine janitorial tasks to specialized cleaning requirements across campuses
                            With a team of <b>highly-trained professionals.</b>
                        </p>
                    </div>
                    <div className="twoImages">
                        <img src="https://th.bing.com/th/id/OIG.zdFlvEQznIKGOHO6ocvC?w=173&h=173&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" alt="Image 1" />
                        <img src="https://th.bing.com/th/id/OIG.Y2l0Wjxe3O5KPnt1VIxn?w=173&h=173&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" alt="Image 2" />
                    </div>
                    <div className="about-desc">
                        <p>Our commitment extends beyond mere cleaning; we aim to contribute to the health, safety, and productivity of students, faculty, and staf.</p>
                        <p>Join us in maintaining an immaculate learning environment that reflects the dedication and excellence of your esteemed institution.</p>
                    </div>
                </div>
            </section>

            <section id="details">
                {/* <h1>About Us</h1> */}
                {/* <!-- Content for the details section --> */}
                <div className="paragraphStyling">
                    <br />
                    <div className="text-container" style={{
                        backgroundColor: '',
                        height: '150px',
                        margin: 'auto',
                        textAlign: 'center',
                        padding: '50px'
                    }}>
                        <p className="changing-text" style={{
                            textAlign: 'center',
                            fontSize: '28px',
                            color: 'green'
                        }}>{texts[index]}</p>
                    </div>

                    {/* <p className="paragraph">
                        freeCodeCamp is a donor-supported tax-exempt 501(c)(3)
                        charity organization (United States Federal Tax Identification Number: 82-0779546)

                        Our mission: to help people learn to code for free. We accomplish
                        this by creating thousands of videos, articles, and interactive
                        coding lessons - all freely available to the public.
                    </p> */}
                </div>

            </section>

            <section id="services">
                {/* <h1>Services Section</h1> */}
                {/* Content for the services section */}
                <div className="col-md-10 col-md-offset-1 section-title text-center" style={
                    {
                        backgroundColor: 'white'
                    }
                }>
                    <h2>Our Services</h2>
                    <hr style={{ height: '4px', width: '160px', margin: 'auto' }} /><br /><br />
                    <p>Our comprehensive range of services at University Cleaners Management System is tailored to meet the unique cleaning and sanitation demands of modern universities. </p>
                    <p>We recognize that each institution has distinct requirements, and our diverse offerings cater to those specific needs, ensuring a hygienic and welcoming environment across the campus.</p>
                    <p>Join us in maintaining learning environment that reflects the dedication and excellence of your institution.</p>
                    <br /><br /><br /><br /><br />
                </div>
                <div class="threeCards">
                    <div class="card">
                        <div>
                            <img src="https://images.pexels.com/photos/38325/vacuum-cleaner-carpet-cleaner-housework-housekeeping-38325.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Image 1" />
                        </div>
                        <div>
                            <br /><br />
                            <code style={{ fontWeight: 'bolder', fontSize: '18px' }}>Routine Cleaning Services</code>
                            <p> From classrooms to administrative offices.
                                We meticulously dust, vacuum, sanitize surfaces, and maintain restrooms to <b><i>impeccable standards</i></b> aroud the universities.
                            </p>
                            <br /><br />
                        </div>
                    </div>
                    <div class="card">
                        <div>
                            <img
                                src="https://media.istockphoto.com/id/502377899/photo/landscaping-tools-with-room-for-copy.jpg?b=1&s=612x612&w=0&k=20&c=F_60Gmxn_7k4rj3rwSvId0LVi-Vdp-fo_iQ9UoWX5lU=" alt="Image 2" />
                        </div>
                        <div>
                            <br /><br />
                            <code style={{ fontWeight: 'bold', fontSize: '18px' }}>Green Cleaning </code>
                            <p> We prioritize sustainability. Our eco-friendly approach includes using environmentally
                                safe products and methods to
                                minimize our ecological footprint while maximizing <b>cleanliness.</b>
                            </p>
                            <br /><br />
                        </div>
                    </div>
                    <div class="card">
                        <div>
                            <img src="https://images.pexels.com/photos/17651101/pexels-photo-17651101/free-photo-of-cleaning-equipment-in-front-of-a-building-entrance.png?auto=compress&cs=tinysrgb&w=600" alt="Image 3" />
                        </div>
                        <div>
                            <br /><br />
                            <code style={{ fontWeight: 'bold', fontSize: '18px' }}>Our commitment</code>
                            <p>
                                Is not just to clean spaces but to create environments that inspire
                                <b><i>wellness, and success</i></b> within the academic community. Explore our comprehensive
                                services to standards of institution.
                            </p>
                            <br /><br />
                        </div>
                    </div>
                </div>

            </section>

            {/* <section id="contact_us">
                <div className="footerSection">
                    <div>
                        <ul>
                            <a href="https://mail.google.com/mail/u/0/#sent?compose=new">
                                <li className="animated">0675704982|0692524034</li>
                                <li className="animated">kheria048@gmail.com</li>
                            </a>
                        </ul>
                        <ul>
                            <a href="https://www.google.com/maps/place/State+University+of+Zanzibar/@-6.197625,39.3057128,17z/data=!4m6!3m5!1s0x185cd86f80e1becd:0x670d4c8e55b47d57!8m2!3d-6.1985316!4d39.3074509!16s%2Fg%2F1pp2x6ky1?entry=ttu">
                                <li className="animated">Zanzibar,Tanzania</li>
                            </a>
                        </ul>
                        <ul>
                            <a href="https://github.com/AbdulrahmanShaibu"><li className="animated">gitHub link</li></a>
                            <a href="#"> <li className="animated">Instagram link</li></a>
                        </ul>
                        <ul>
                            <li>Others</li>
                            <a href="#">
                                <li>www.abdul.twitter.com</li>
                                <li>www.abdul.linkedin.com</li>
                            </a>
                        </ul>
                    </div>
                    <div style={{ backgroundColor: 'white', width: '250px' }}>
                        <sup style={{ color: 'red', textAlign: 'center' }}>To be fixed letter</sup>
                        <br /><br />
                        <img style={{ borderRadius: '10px', width: '100px' }}
                            src='https://images.pexels.com/photos/1181253/pexels-photo-1181253.jpeg?auto=compress&cs=tinysrgb&w=600' />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <img
                                style={{ borderRadius: '10px', width: '60px' }}
                                src="https://images.pexels.com/photos/1181253/pexels-photo-1181253.jpeg?auto=compress&cs=tinysrgb&w=600" />
                            <img
                                style={{ borderRadius: '10px', width: '60px' }}
                                src="https://images.pexels.com/photos/8653359/pexels-photo-8653359.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
                        </div>
                    </div>

                    <div>
                        <ul>
                            <li>News</li>
                            <li>Terms and Conditions</li>
                            <li>FAQ</li>
                        </ul>
                        <ul className="privacy">
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
                        <ul className="privacy">
                            <li>Support</li>
                            <li>Sponsors</li>
                            <li>Members</li>
                        </ul>
                    </div>
                </div>
            </section> */}

            <br /><br /><br /><br /><br />
            {/* <hr /> */}
            <div className="footer_section" id="contact_us">
                <div className="subscriber_head">
                    <h1 id="free_daily_updates" style={{ color: 'black', fontWeight: 'bold', color: 'black' }}>Free Daily Updates</h1>
                    <form action="" className="subscriber_search_box" method="get">
                        <input className="subscriber_search_bar" type="text" placeholder="Search for services" />
                        <button className="subscriber_button" type="submit">Subscribe</button>
                    </form>
                </div>

                <div className="subscriber_mid">
                    <div className="first_para">
                        <div className="footer_logo">
                            {/* <h1>LOGO</h1> */}
                            <div style={{ width: '175px', height: '105px', backgroundColor: 'white', fontWeight: 'bold' }}>
                                <img style={
                                    {
                                        width: '170px',
                                        height: '100px'
                                    }
                                } src="https://th.bing.com/th/id/OIG.d.UXFKrMR3EVWYoFW7GX?w=173&h=173&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" />
                            </div>
                        </div>
                        <div className="footer_para">
                            {/* <h3 id="footer_first_head">Contact Us Now</h3> */}
                            <br />
                            <h5>kheria048@gmail.com</h5>
                            {/* <h5>www.Devlop-Security.com</h5> */}
                        </div>
                    </div>

                    <div className="vertical2"></div>
                    <div className="horizontal"></div>

                    <div className="middle_para">
                        <div className="footer_About">
                            <h5 className="footer_About_para"><a className="footer_About_head" href="#" style={changeLinks.color}>News</a></h5>
                            <h5 className="footer_About_para"><a className="footer_About_links" href="#" style={changeLinks.color}>Terms of use</a></h5>
                            <h5 className="footer_About_para"><a className="footer_About_links" href="#" style={changeLinks.color}>Privacy Policy</a></h5>
                            <h5 className="footer_About_para"><a className="footer_About_links" href="https://github.com/AbdulrahmanShaibu" style={changeLinks.color}>gitHub link</a></h5>

                        </div>
                        <div className="footer_About">
                            <h4 className="footer_About_para"><a className="footer_About_head" href="#" style={changeLinks.color}>Support</a></h4>
                            <h5 className="footer_About_para"><a className="footer_About_links" href="#" style={changeLinks.color}>Sponsors</a></h5>
                            <h5 className="footer_About_para"><a className="footer_About_links" href="#" style={changeLinks.color}>Members</a></h5>
                            <h5 className="footer_About_para"><a className="footer_About_links" href="#" style={changeLinks.color}>abdul.twitter.com</a></h5>

                        </div>
                        <div className="footer_About">
                            <h4 className="footer_About_para"><a className="footer_About_head" href="#" style={changeLinks.color}>0675704982</a></h4>
                            <h5 className="footer_About_para"><a className="footer_About_links" href="https://mail.google.com/mail/u/0/#sent?compose=new" style={changeLinks.color}>kheria048@gmail.com</a></h5>
                            <h5 className="footer_About_para"><a className="footer_About_links" href="https://www.google.com/maps/place/State+University+of+Zanzibar/@-6.197625,39.3057128,17z/data=!4m6!3m5!1s0x185cd86f80e1becd:0x670d4c8e55b47d57!8m2!3d-6.1985316!4d39.3074509!16s%2Fg%2F1pp2x6ky1?entry=ttu" style={changeLinks.color}>Zanzibar,Tanzania</a></h5>
                        </div>
                    </div>

                    {/* starting */}
                    <div className="vertical"></div>
                    <div className="horizontal2"></div>

                    <div className="last_para">

                        <div className="footer_last">
                            <p className="quick_signup">Get Started</p>
                            <h5 id="free_daily_updates">This 3 Minute Will Take Your Newslatter To Harry Potter House So Dont
                                Forget To Join Us</h5>
                            <form action="" className="footer_form_mid" method="get">

                                <input className="footer_mid_subscribe_bar" type="text" placeholder="search for services" />


                                <button className="footer_mid_subscriber_button" type="submit">Subscribe</button>
                            </form>
                        </div>

                        <div className="contacts">
                            <div className="icon_section">
                                <a className="footer_mid_icons" href=""><i className="fab fa-twitter footer_mid_icons_inner"></i></a>
                                <a className="footer_mid_icons" href=""><i className="fab fa-instagram footer_mid_icons_inner"></i></a>
                                <a className="footer_mid_icons" href=""><i className="fab fa-linkedin footer_mid_icons_inner"></i></a>
                                <a className="footer_mid_icons" href=""><i className="fab fa-youtube footer_mid_icons_inner"></i></a>
                                <a className="footer_mid_icons" href=""><i className="fab fa-twitter footer_mid_icons_inner"></i></a>
                            </div>
                        </div>

                    </div>
                    {/* ending */}
                </div>

                <CopyrightFooter />
            </div>

        </div>
    );
};
export default Start;
