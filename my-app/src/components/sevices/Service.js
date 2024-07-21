import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Icon_landscape from '../../assets/images/service/landscape.png';
import Icon_growing from '../../assets/images/service/growing.png';
import Icon_harvest from '../../assets/images/service/harvest.png';
import Icon_flower from '../../assets/images/service/flower.png';
import Icon_tree from '../../assets/images/service/tree.png';
import Icon_rubbish from '../../assets/images/service/rubbish.png';

const ServiceData = [
    {
        id: uuidv4(),
        heading: 'Cleaner Management',
        description: 'Efficiently manage the team of cleaners across various departments.',
        img: Icon_landscape,
        serviceLink: '/service-details',
    },
    {
        id: uuidv4(),
        heading: 'Complaint Handling',
        description: 'Address and resolve complaints regarding cleaning services promptly.',
        img: Icon_growing,
        serviceLink: '/service-details',
    },
    {
        id: uuidv4(),
        heading: 'Tool Inventory',
        description: 'Keep track of cleaning tools and ensure they are in good condition.',
        img: Icon_harvest,
        serviceLink: '/service-details',
    },
    {
        id: uuidv4(),
        heading: 'Department Coordination',
        description: 'Coordinate cleaning tasks across different university departments.',
        img: Icon_flower,
        serviceLink: '/service-details',
    },
    {
        id: uuidv4(),
        heading: 'Supervisor Assignment',
        description: 'Assign supervisors to oversee cleaning operations and maintain standards.',
        img: Icon_tree,
        serviceLink: '/service-details',
    },
    {
        id: uuidv4(),
        heading: 'Task Scheduling',
        description: 'Schedule cleaning tasks and ensure they are completed on time.',
        img: Icon_rubbish,
        serviceLink: '/service-details',
    },
];

const ServiceItem = ({ img, heading, description }) => {
    return (
        <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
            <div className="single-service" style={serviceItemStyle}>
                <div className="service-icon" style={iconStyle}>
                    <img src={img} alt="Service Icon" style={imgStyle} />
                </div>
                <h3 style={headingStyle}>{heading}</h3>
                <p style={descriptionStyle}>{description}</p>
            </div>
        </div>
    );
}

const Service = () => {
    return (
        <div className="service-area" style={serviceAreaStyle}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 text-center mb-4">
                        <div className="section-title">
                            <span style={sectionTitleSpanStyle}>Our Services</span>
                            <h2 style={sectionTitleH2Style}>
                                University Cleaners Management<br />& Ensuring a Clean Environment
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {ServiceData.map(data => (
                        <ServiceItem
                            key={data.id}
                            img={data.img}
                            heading={data.heading}
                            description={data.description}
                        />
                    ))}
                    <div className="col-xl-12 text-center mt-4">
                        <div className="single-service-large" style={largeServiceStyle}>
                            <h3 style={largeHeadingStyle}>
                                We are dedicated to <span style={highlightStyle}>Maintaining Cleanliness & Safety</span>
                            </h3>
                            <p style={largeDescriptionStyle}>
                                Our professional team ensures the university remains clean and safe, addressing all cleaning needs and complaints efficiently.
                            </p>
                            {/* <a href="/contact" className="btn btn-primary">Contact Us</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Inline styles
const serviceAreaStyle = {
    backgroundColor: '#f9f9f9',
    padding: '70px 0',
};

const sectionTitleSpanStyle = {
    display: 'block',
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
};

const sectionTitleH2Style = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
};

const serviceItemStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
};

const iconStyle = {
    marginBottom: '15px',
};

const imgStyle = {
    maxWidth: '60px',
};

const headingStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
};

const descriptionStyle = {
    fontSize: '16px',
    color: '#666',
};

const largeServiceStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
};

const largeHeadingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
};

const highlightStyle = {
    color: '#007bff',
};

const largeDescriptionStyle = {
    fontSize: '16px',
    color: '#666',
};

export default Service;
