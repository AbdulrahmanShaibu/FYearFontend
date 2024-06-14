import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Icon_landscape from '../../assets/images/service/landscape.png';
import Icon_growing from '../../assets/images/service/growing.png';
import Icon_harvest from '../../assets/images/service/harvest.png';
import Icon_flower from '../../assets/images/service/flower.png';
import Icon_tree from '../../assets/images/service/tree.png';
import Icon_rubbish from '../../assets/images/service/rubbish.png';
import { FaLongArrowAltRight } from 'react-icons/fa';

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

const ServiceItem = ({ img, heading, description, serviceLink }) => {
    return (
        <>
            <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="single-service">
                    <div className="service-icon">
                        <img src={img} alt="Service Icon" />
                    </div>
                    <h3>{heading}</h3>
                    <p>{description}</p>
                    {/* <a href={serviceLink}>Read More <FaLongArrowAltRight /></a> */}
                </div>
            </div>
        </>
    )
}

const Service = () => {
    return (
        <>
            <div className="service-area bg-4 pt-110 pb-110">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-title text-center mb-70">
                                <span>Our Services</span>
                                <h2>University Cleaners Management<br />& Ensuring a Clean Environment</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {ServiceData.map((data) => (
                            <ServiceItem
                                key={data.id}
                                img={data.img}
                                heading={data.heading}
                                description={data.description}
                                serviceLink={data.serviceLink}
                            />
                        ))}
                        <div className="col-xl-6 col-lg-12 col-md-12">
                            <div className="single-service-large">
                                <h3>We are dedicated to <span>Maintaining Cleanliness & Safety</span></h3>
                                <p>Our professional team ensures the university remains clean and safe, addressing all cleaning needs and complaints efficiently.</p>
                                <a href="/contact" className="l-btn">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service;
