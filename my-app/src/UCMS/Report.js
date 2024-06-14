import React, { useEffect, useState } from 'react';
import '../styles/report.css'; // Import your CSS file for styling
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import SupervisorReport from '../ReportsList/supervisor';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const GenerateReport = () => {
    const [cleaners, setCleaners] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [supervisors, setSupervisors] = useState([]);

    useEffect(() => {
        fetchCleaners();
        fetchTasks();
        fetchSupervisors();
    }, []);

    const fetchCleaners = () => {
        const dummyCleaners = [
            { name: 'John Doe', position: 'Senior Cleaner', tasksAssigned: 10, claimsSubmitted: 3 },
            { name: 'Jane Smith', position: 'Junior Cleaner', tasksAssigned: 8, claimsSubmitted: 1 }
        ];
        setCleaners(dummyCleaners);
    };

    const fetchTasks = () => {
        const dummyTasks = [
            { name: 'Clean classroom 101', assignedTo: 'John Doe', status: 'In Progress' },
            { name: 'Clean lab 201', assignedTo: 'Jane Smith', status: 'Completed' }
        ];
        setTasks(dummyTasks);
    };

    const fetchSupervisors = () => {
        fetch('http://localhost:8080/api/v1/list/supervisors')
            .then(response => response.json())
            .then(data => setSupervisors(data))
            .catch(error => console.error('Error fetching supervisors:', error));
    };

    const handleDownload = () => {
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.setTextColor(40);
        doc.text('University Cleaners Management System Report', 14, 22);

        doc.setFontSize(12);
        doc.text('', 14, 30);

        doc.setFontSize(18);
        doc.text('Cleaners', 14, 40);
        doc.setFontSize(12);
        cleaners.forEach((cleaner, index) => {
            doc.text(`${index + 1}. ${cleaner.name} - ${cleaner.position}`, 20, 50 + index * 20);
            doc.text(`   - Tasks Assigned: ${cleaner.tasksAssigned}`, 25, 55 + index * 20);
            doc.text(`   - Claims Submitted: ${cleaner.claimsSubmitted}`, 25, 60 + index * 20);
        });

        doc.setFontSize(18);
        doc.text('Tasks', 14, 100);
        doc.setFontSize(12);
        tasks.forEach((task, index) => {
            doc.text(`${index + 1}. ${task.name}`, 20, 110 + index * 30);
            doc.text(`   - Assigned to: ${task.assignedTo}`, 25, 115 + index * 30);
            doc.text(`   - Status: ${task.status}`, 25, 120 + index * 30);
        });

        // -----Supervisor report----
        doc.addPage();
        doc.setFontSize(18);
        doc.text('Supervisors', 14, 20);
        doc.autoTable({
            head: [['Supervisor Id', 'Supervisor Name', 'Department Name']],
            body: supervisors.map((supervisor, index) => [
                index + 1,
                supervisor.supervisorName,
                supervisor.department && supervisor.department.length > 0 ?
                    supervisor.department[0].departmentName : "No department"
            ])
        });

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
                        It is intended to assist supervisors and administrators in making well-informed decisions
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
                        frequency of tasks performed, and any deviations from expected performance standards.
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
            <div style={{ textAlign:'center', marginTop:'5%' }}>
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
