import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import ProjectStyleOneImg1 from '../../assets/images/project/garden-care.jpg';
import ProjectStyleOneImg2 from '../../assets/images/project/tree-plantation.jpg';
import ProjectStyleOneImg3 from '../../assets/images/project/branch-cutting.jpg';

const ProjectData = [
    
    {
        id: uuidv4(),
        img: ProjectStyleOneImg1,
        heading: 'Cleaner Assignments',
        description: 'Manage and assign cleaning tasks to university cleaners efficiently and effectively.',
        btnLink: '/project-details',
    },
    
    {
        id: uuidv4(),
        img: ProjectStyleOneImg2,
        heading: 'Complaint Management',
        description: 'Track and resolve complaints related to cleanliness and maintenance within the university.',
        btnLink: '/project-details',
    },
    
    {
        id: uuidv4(),
        img: ProjectStyleOneImg3,
        heading: 'Tool Inventory',
        description: 'Keep an up-to-date inventory of cleaning tools and supplies for optimal resource management.',
        btnLink: '/project-details',
    },

];

const ProjectItem = ({ img, heading, description, btnLink }) => {
    return (
        <>
            <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="single-project">
                    <div className="single-project-img bg-property bg-hover-style-1" style={{ backgroundImage: `url(${img})` }}>
                        <div className="single-project-img-icon">
                            <Link to={btnLink}><FaAngleDoubleRight /></Link>
                        </div>
                    </div>
                    <div className="single-project-content">
                        <h3>{heading}</h3>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const Project = () => {
    return (
        <>
            <div className="project-area pt-110 pb-110">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-title text-center mb-70">
                                <span>Our System</span>
                                <h2>Efficiently Manage Your University Cleaning Operations</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-60">
                        {ProjectData.map((data) => (
                            <ProjectItem
                                key={data.id}
                                img={data.img}
                                heading={data.heading}
                                description={data.description}
                                btnLink={data.btnLink}
                            />
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="project-btn text-center">
                                <Link to="/projects" className="l-btn">More Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project;
