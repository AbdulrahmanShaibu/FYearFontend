import { useEffect, useState } from 'react';
import '../styles/report.css'; // Import your CSS file for styling
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const GenerateReport = () => {
    const [cleaningcompany, setCleaningCompanies] = useState([]);
    const [tools, setTools] = useState([]);
    const [client_site, setClientSites] = useState([]);
    const [company_staffs, setCompanyStaffs] = useState([]);
    const [staffs_complain, setStaffsComplain] = useState([]);

    useEffect(() => {
        fetchCleaningCompanies();
        fetchCompanyStaffs();
        fetchClientSites();
        fetchTools();
        fetchStaffsComplain()
    }, []);

    const fetchCleaningCompanies = () => {
        fetch('http://localhost:8080/api/v1/list')
            .then(response => response.json())
            .then(data => setCleaningCompanies(data))
            .catch(error => console.error('Error fetching cleaning companies:', error));
    };

    const fetchCompanyStaffs = () => {
        fetch('http://localhost:8080/api/v1/users/list')
            .then(response => response.json())
            .then(data => setCompanyStaffs(data))
            .catch(error => console.error('Error fetching ccompany staffs:', error));
    };

    const fetchClientSites = () => {
        fetch('http://localhost:8080/api/v1/get/client-sites')
            .then(response => response.json())
            .then(data => setClientSites(data))
            .catch(error => console.error('Error fetching client site:', error));
    };
    const fetchTools = () => {
        fetch('http://localhost:8080/api/v1/list/tools')
            .then(response => response.json())
            .then(data => setTools(data))
            .catch(error => console.error('Error fetching tools:', error));
    };
    const fetchStaffsComplain = () => {
        fetch('http://localhost:8080/api/v1/list/StaffComplain')
            .then(response => response.json())
            .then(data => setStaffsComplain(data))
            .catch(error => console.error('Error fetching staffs complain:', error));
    };

    const handleDownload = () => {
        const doc = new jsPDF();

        // Initial settings
        let y = 20; // Initial vertical position

        // Title
        doc.setFontSize(22);
        doc.setTextColor(40);
        doc.setFont("helvetica", "bold");
        doc.text('University Cleaners Management System', 14, y);
        y += 10; // Increase y position for next element

        doc.setFontSize(18);
        doc.setFont("helvetica", "normal");
        doc.setDrawColor(0, 0, 0);
        doc.line(14, y, 196, y); // Draw line separator
        y += 10; // Increase y position for next element

        // Client Sites section
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text('Client Sites', 14, y);
        y += 8; // Increase y position for next element
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        client_site.forEach((client, index) => {
            doc.text(`   - Client site:${index + 1}. ${client.name}`, 20, y);
            y += 5; // Adjust spacing between lines
            doc.text(`   - Client organisation: ${client.clientOrganisation.name}`, 25, y);
            y += 10; // Adjust spacing for next client site
        });

        // Tools section
        y += 5; // Space before next section
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text('Tools', 14, y);
        y += 8; // Increase y position for next element
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        tools.forEach((tool, index) => {
            doc.text(`${index + 1}. ${tool.toolType}`, 20, y);
            y += 5; // Adjust spacing between lines
            doc.text(`   - Quantity: ${tool.quantity}`, 25, y);
            y += 5;
            doc.text(`   - Client Site: ${tool.clientSite.name}`, 25, y);
            y += 5;
            doc.text(`   - Client Organisation: ${tool.clientSite.clientOrganisation.name}`, 25, y);
            y += 10; // Adjust spacing for next tool
        });

        // Cleaning Company section
        y += 5; // Space before next section
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text('Cleaning Company', 14, y);
        y += 8; // Increase y position for next element
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        cleaningcompany.forEach((company, index) => {
            doc.text(`${index + 1}. ${company.companyName}`, 20, y);
            y += 5; // Adjust spacing between lines
            doc.text(`   - Address: ${company.address}`, 25, y);
            y += 5;
            doc.text(`   - Staffs list:`, 25, y);
            y += 5;
            company.companyStaffs.forEach((staff, staffIndex) => {
                doc.text(`     ${staffIndex + 1}. ${staff.name}`, 30, y);
                y += 5;
                if (staff.clientOrganisations && staff.clientOrganisations.length > 0) {
                    doc.text(`       - Client Organisations:`, 35, y);
                    y += 5;
                    staff.clientOrganisations.forEach((org, orgIndex) => {
                        doc.text(`         ${orgIndex + 1}. ${org.name}`, 40, y);
                        y += 5;
                    });
                }
                y += 5; // Space before next staff member
            });
            y += 10; // Adjust spacing for next company
        });

        // Company Staffs section
        y += 5; // Space before next section
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text('Company Staffs', 14, y);
        y += 8; // Increase y position for next element
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        company_staffs.forEach((staff, index) => {
            doc.text(`${index + 1}. ${staff.username}`, 20, y);
            y += 5; // Adjust spacing between lines

            // Accessing cleaningCompany details
            const cleaningCompany = staff.cleaningCompany;
            if (cleaningCompany) {
                doc.text(`   - Cleaning Company: ${cleaningCompany.companyName}`, 25, y);
                y += 5;

                // Accessing clientOrganisations details
                const clientOrganisations = cleaningCompany.companyStaffs[0]?.clientOrganisations;
                if (clientOrganisations) {
                    clientOrganisations.forEach(org => {
                        doc.text(`   - Client Organisation: ${org.name}`, 25, y);
                        y += 5;
                    });
                }
            }
            y += 10; // Adjust spacing for next staff
        });

        // Staffs Complaints section
        y += 5; // Space before next section
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text('Staffs Complaints', 14, y);
        y += 8; // Increase y position for next element
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        staffs_complain.forEach((complaint, index) => {
            doc.text(`${index + 1}. ${complaint.description}`, 20, y);
            y += 5; // Adjust spacing between lines
            doc.text(`   - Submission Date: ${complaint.submissionDate}`, 25, y);
            y += 5;
            doc.text(`   - Staff Name: ${complaint.staff}`, 25, y);
            y += 5;
            doc.text(`   - Claim Types:`, 25, y);
            y += 5;
            complaint.claimTypes.forEach((claimType, claimIndex) => {
                doc.text(`     ${claimIndex + 1}. ${claimType.type}`, 30, y);
                y += 5; // Adjust spacing between claim types
            });
            y += 10; // Adjust spacing for next complaint
        });

        // Save and download PDF
        doc.save('system_report.pdf');
    };



    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1; // Change this value to show more items per page

    const pages = [
        {
            title: 'Overview 📊',
            content: (
                <>
                    <img
                        src="https://images.pexels.com/photos/38325/vacuum-cleaner-carpet-cleaner-housework-housekeeping-38325.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Overview"
                        style={{ float: 'right', margin: '0 0 10px 10px', width: '50%' }}
                    />
                    <p>
                        This system report delivers a thorough overview of the current status of the university
                        cleaners' management system, highlighting essential metrics and performance indicators.
                        It is intended to assist client_site and administrators in making well-informed decisions
                        regarding resource allocation, scheduling, and overall management efficiency. The report
                        covers various aspects of the system, including cleaner performance, task completion rates,
                        and adherence to cleaning standards. By providing a clear snapshot of the system’s functionality,
                        this overview helps identify areas of improvement and opportunities for enhancing operational effectiveness.
                        Additionally, the report includes comparative analysis against previous periods, helping to track
                        progress and recognize trends. This comprehensive overview serves as a foundation for strategic
                        planning, ensuring that the cleaning operations are consistently meeting the university's standards and goals.
                    </p>
                </>
            ),
        },
        {
            title: 'Details 📋',
            content: (
                <>
                    <img
                        src="https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Details"
                        style={{ float: 'right', margin: '0 0 10px 10px', width: '50%' }}
                    />
                    <p>
                        This section presents comprehensive information on system operations,
                        user activities, and any detected anomalies throughout the reporting period.
                        It is designed to offer detailed insights for troubleshooting and optimizing
                        system performance. Here, you will find in-depth data on individual cleaner activities,
                        frequency of tools performed, and any deviations from expected performance standards.
                        Additionally, this section includes an analysis of system alerts and error logs
                        to help pinpoint specific issues that may need attention. By delving into the finer
                        details of the system's operations, this section aims to provide the necessary information
                        to resolve problems efficiently and to implement strategies for continuous improvement.
                        Furthermore, it features case studies and examples of best practices, illustrating how
                        identified issues were resolved and highlighting successful optimization efforts.
                        These detailed insights not only facilitate immediate troubleshooting but also contribute
                        to long-term enhancements in the system's reliability and effectiveness.
                    </p>
                </>
            ),
        },
    ];

    const totalPages = Math.ceil(pages.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="system-report-container">
            <div className="system-report-header">
                <h2>System Report</h2>
            </div>
            <div className="system-report-content">
                <h3>{pages[currentPage - 1].title}</h3>
                {pages[currentPage - 1].content}
            </div>
            <div style={{ textAlign: 'center', marginTop: '5%' }}>
                <Button
                    variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}
                    onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="contained" color="primary" endIcon={<ArrowForwardIosIcon />}
                    onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
            <div className="generate-button-container">
                <button className="generate-button" onClick={handleDownload}>
                    Download Report
                </button>
            </div>
        </div>
    );
};

export default GenerateReport;
