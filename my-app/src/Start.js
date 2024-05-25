import * as React from 'react';
import './style1/start.css'
import './footerStyle/footer.css'
// import './scripts/images.js'
import './images/suza.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CopyrightFooter from "./Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Email, GitHub, NewReleases, Phone, ShareLocation, Support, Twitter } from "@mui/icons-material";


const Start = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            handleCloseNavMenu(); // Close the menu after clicking
        }
    };

    const navigate = useNavigate();

    function documentationPage() {
        navigate('/system/doc');
    }

    function registrationPage() {
        navigate('/register')
    }

    function adjustMessage() {
        alert(('Welcome To University Cleaners Management System'))
    }

    const pages = [
        { label: 'Home', sectionId: 'home' },
        { label: 'Services', sectionId: 'services' },
        { label: 'Contact', sectionId: 'contact' },
        { label: 'Documentation' },
        { label: '', onclick: registrationPage(adjustMessage()) },
    ];

    const texts = ['Welcome to the University Cleaners Management System! We revolutionize the way academic institutions maintain their cleanliness and standards in the Universities',
        'We recognize that each institution has distinct requirements, and our diverse offerings cater to those specific needs, ensuring a hygienic and welcoming environment across the campus. ',
        'Our comprehensive range of services at University Cleaners Management System',
        'Targeted to meet the unique cleaning and sanitation demands of the available modern universities.',
        '']; // Array of texts to cycle through

    const changeLinks = {
        color: {
            color: 'green'
        }
    }

    const [index, setIndex] = useState(0); // State to track the current text index

    return (
        <div>
            <AppBar style={{ backgroundColor: '#333' }}>
                <Container maxWidth="xl">
                    <Toolbar >
                        <AdbIcon />
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: 'bolder'
                            }}
                        >
                            UCMS
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page.label}
                                        onClick={() => scrollToSection(page.sectionId)}
                                    >
                                        <Typography textAlign="center">{page.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => scrollToSection(page.sectionId)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>

                    </Toolbar>
                </Container>

            </AppBar>
            <Container maxWidth="xl">
                <Box my={-5.5} id="home">
                    <Typography variant="h4" component="h1" gutterBottom>

                        {/* HEADER SECTION */}
                        <br /><br /><br /><br />
                        <header id="header">
                            <div className="intro">
                                <div className="overlay">
                                    <div className="container">
                                        <header className="text-center" id="header">
                                            <div className="intro bg-light p-5 rounded">
                                                <div className="overlay">
                                                    <h1>University Cleaners Management System</h1>
                                                    <p>Welcome to the University Cleaners Management System!
                                                        We revolutionize the way academic institutions maintain their cleanliness and hygiene standards.
                                                        Our innovative approach merges cutting-edge technology with meticulous attention to detail,
                                                        ensuring that universities uphold pristine environments conducive to learning and well-being.
                                                    </p>
                                                    <a href="#registration" className="btn btn-primary btn-lg">Register Here</a>
                                                </div>
                                            </div>
                                        </header>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* HOME SECTION */}

                        <section id="home" className="mt-5">
                            <div className="homeSection">
                                <p className="lead text-center text-success">We understand the pivotal role cleanliness plays in fostering a conducive educational atmosphere. Our comprehensive suite of services is designed to cater specifically to the diverse needs of universities, addressing everything from routine janitorial tasks to specialized cleaning requirements across campuses. With a team of <b>highly-trained professionals.</b></p>
                                <div className="twoImages">
                                    <img src="https://images.pexels.com/photos/4920270/pexels-photo-4920270.jpeg?auto=compress&cs=tinysrgb&w=600" className="img-fluid m-2" alt="Image 1" />
                                    <img src="https://images.pexels.com/photos/5027619/pexels-photo-5027619.jpeg?auto=compress&cs=tinysrgb&w=600" className="img-fluid m-2" alt="Image 2" />
                                    <img src="https://th.bing.com/th/id/OIG.Y2l0Wjxe3O5KPnt1VIxn?w=173&h=173&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" className="img-fluid m-2" alt="Image 3" />
                                    <img src="https://images.pexels.com/photos/5231044/pexels-photo-5231044.jpeg?auto=compress&cs=tinysrgb&w=600" className="img-fluid m-2" alt="Image 4" />
                                </div>
                                <div className="about-desc text-center">
                                    <p>Our commitment extends beyond mere cleaning; we aim to contribute to the health, safety, and productivity of students and staff.</p>
                                    <p>Join us in maintaining an immaculate learning environment that reflects the dedication and excellence of your esteemed institution.</p>
                                </div>
                            </div>
                        </section>

                        {/* DETAILS SECTION */}

                        <section id="details" className="mt-5">
                            <div className="text-container text-center">
                                <p className="lead text-success">{texts[index]}</p>
                            </div>
                        </section>

                    </Typography>
                </Box>

                {/* SERVICES SECTION */}

                <Box my={4} id="services">
                    <Typography variant="h4" component="h2" gutterBottom>
                        <section id="services" className="mt-5">
                            <div className="text-center">
                                <h2>Our Services</h2>
                                <hr className="my-4" />
                                <p>We recognize that each institution has distinct requirements, and our diverse offerings cater to those specific needs, ensuring a hygienic and welcoming environment across the campus.</p>
                                <p>Join us in maintaining a learning environment that reflects the dedication and excellence of your institution.</p>
                                <p>Our comprehensive range of services at University Cleaners Management System is tailored to meet the unique cleaning and sanitation demands of modern universities.</p>
                            </div>
                            <div className="container">
                                <div className="threeCards">
                                    <div className="card">
                                        <img src="https://images.pexels.com/photos/38325/vacuum-cleaner-carpet-cleaner-housework-housekeeping-38325.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Image 1" />
                                        <div className="card-content">
                                            <h2 className='card-eading'>Routine Cleaning Services</h2>
                                            <p>From classrooms to administrative offices, we meticulously dust, vacuum, sanitize surfaces, and maintain restrooms to impeccable standards around the universities.</p>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <img src="https://media.istockphoto.com/id/502377899/photo/landscaping-tools-with-room-for-copy.jpg?b=1&s=612x612&w=0&k=20&c=F_60Gmxn_7k4rj3rwSvId0LVi-Vdp-fo_iQ9UoWX5lU=" alt="Image 2" />
                                        <div className="card-content">
                                            <h2 className='card-eading'>Green Cleaning</h2>
                                            <p>We prioritize sustainability. Our eco-friendly approach includes using environmentally safe products and methods to minimize our ecological footprint while maximizing cleanliness.</p>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <img src="https://images.pexels.com/photos/17651101/pexels-photo-17651101/free-photo-of-cleaning-equipment-in-front-of-a-building-entrance.png?auto=compress&cs=tinysrgb&w=600" alt="Image 3" />
                                        <div className="card-content">
                                            <h2 className='card-eading'>Our Commitment</h2>
                                            <p>Our commitment is not just to clean spaces but to create environments that inspire wellness and success within the academic community. Explore our comprehensive services to standards of institution.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Typography>
                    <br /><br /><br />
                </Box>

                {/* CONTACTS SECTION */}

                <Box my={4} id="contact">
                    <Typography variant="h4" component="h2" gutterBottom>
                        <div id="contact_us" className="mt-5">
                            <div className="subscriber_mid text-center bg-light p-5 rounded">
                                <div className="row">
                                    <div className="footer_logo">
                                        {/* <h1>LOGO</h1> */}
                                        <div style={{ width: '175px', height: '105px', backgroundColor: 'white', fontWeight: 'bolder' }}>
                                            <img style={
                                                {
                                                    width: '170px',
                                                    height: '100px'
                                                }
                                            } src="https://th.bing.com/th/id/OIG.d.UXFKrMR3EVWYoFW7GX?w=173&h=173&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" />
                                        </div>
                                    </div>

                                </div>

                                <div className="vertical2"></div>
                                <div className="horizontal"></div>

                                <div className="middle_para">
                                    <div className="footer_About">
                                        <h6 ><NewReleases /><a href="#" style={changeLinks.color}>News</a></h6>
                                        <h6 ><a href="#" style={changeLinks.color}>Terms of use</a></h6>
                                        <h6 ><a href="https://github.com/AbdulrahmanShaibu"><GitHub /></a>gitHub</h6>
                                    </div>

                                    <div className="footer_About">
                                        <h6 ><Phone /><a href="#">0675704982</a></h6>
                                        <h6 ><Email /><a href="https://mail.google.com/mail/u/0/#sent?compose=new">kheria048@gmail.com</a></h6>
                                        <h6 ><ShareLocation /><a href="https://www.google.com/maps/place/State+University+of+Zanzibar/@-6.197625,39.3057128,17z/data=!4m6!3m5!1s0x185cd86f80e1becd:0x670d4c8e55b47d57!8m2!3d-6.1985316!4d39.3074509!16s%2Fg%2F1pp2x6ky1?entry=ttu">Zanzibar,Tanzania</a></h6>
                                    </div>
                                    <div className="footer_About">
                                        <h6 ><Support /><a href="#" style={changeLinks.color}>Support</a></h6>
                                        {/* <h6 ><a  href="#" style={changeLinks.color}>Sponsors</a></h6> */}
                                        <h6 ><a href="#" style={changeLinks.color}>Members</a></h6>
                                        <h6 ><a href="#"><Twitter />twitter</a></h6>

                                    </div>
                                </div>

                                {/* starting */}
                                <div className="vertical"></div>
                                <div className="horizontal2"></div>

                                <div className="last_para">
                                    <div style={{ width: '175px', height: '105px', backgroundColor: 'white', fontWeight: 'bold' }}>
                                        <img style={
                                            {
                                                width: '170px',
                                                height: '100px'
                                            }
                                        } src="https://th.bing.com/th/id/OIG.d.UXFKrMR3EVWYoFW7GX?w=173&h=173&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" />
                                    </div>
                                </div>
                                {/* ending */}
                            </div>

                            <CopyrightFooter />
                        </div>
                    </Typography>
                </Box>

                {/* DOCUMENTATION SECTION */}
                <Box my={4}></Box>

                {/* REGISTRATION SECTION */}
                <Box my={4} id="registration"></Box>

            </Container>
        </div>
    );
}

export default Start;
