import React from 'react';
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import TestimonialImg1 from '../../assets/images/testimonial/1.jpg';
import TestimonialImg2 from '../../assets/images/testimonial/2.jpg';
import TestimonialImg3 from '../../assets/images/testimonial/3.jpg';
import TestimonialImg4 from '../../assets/images/testimonial/4.jpg';
import TestimonialImg5 from '../../assets/images/testimonial/5.jpg';

const TestimonialData = [
    
    {
        id: uuidv4(),
        img: TestimonialImg1,
        name: 'Alice Johnson',
        position: 'Head Cleaner, University Cleaning Services',
        description: 'Our university cleaning team has been using this management system for a while now, and it has significantly improved our efficiency in managing cleaners, complaints, tools, departments, supervisors, and tasks.',
    },
    
    {
        id: uuidv4(),
        img: TestimonialImg2,
        name: 'John Smith',
        position: 'Supervisor, University Cleaning Department',
        description: 'As a supervisor, I find this system very helpful in overseeing our cleaning operations. It allows me to easily track tasks, address complaints, and allocate resources effectively.',
    },
    
    {
        id: uuidv4(),
        img: TestimonialImg3,
        name: 'Emily Davis',
        position: 'Student Representative, University Council',
        description: 'I appreciate the transparency and accountability this system brings to our university cleaning services. It ensures that student complaints are addressed promptly and tasks are completed efficiently.',
    },
    
    {
        id: uuidv4(),
        img: TestimonialImg4,
        name: 'Michael Brown',
        position: 'Facilities Manager, University Facilities Department',
        description: 'Managing a large university facility requires a robust system for organizing cleaning activities. This management system provides the tools needed to streamline our cleaning processes and maintain a clean environment for students and staff.',
    },
    
    {
        id: uuidv4(),
        img: TestimonialImg5,
        name: 'Sophia Martinez',
        position: 'Dean of Students, University Administration',
        description: 'Ensuring a clean and safe campus environment is essential for student well-being. With this management system, we can effectively manage our cleaning staff, address any issues that arise, and maintain high standards of cleanliness across campus.',
    },
];

const TestimonialItem = ({ img, name, position, description }) => {
    return (
        <>
            <div className="single-testimonial">
                <img src={img} alt="" />
                <h3>{name}</h3>
                <span>{position}</span>
                <p>{description}</p>
                <div className="star-rating">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
            </div>
        </>
    )
}

const Testimonial = () => {
    const TestimonialSlider = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div className="testimonial-area bg-4 pt-90 pb-110">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-title text-center mb-70">
                                <span>Happy Customers</span>
                                <h2>What Our Users Say <br /> About Our System</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Slider {...TestimonialSlider} className="testimonial-slider">
                            {TestimonialData.map((data) => (
                                <TestimonialItem
                                    key={data.id}
                                    img={data.img}
                                    name={data.name}
                                    position={data.position}
                                    description={data.description}
                                />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonial;
