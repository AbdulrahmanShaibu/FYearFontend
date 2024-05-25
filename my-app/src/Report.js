import React, { useEffect, useState } from 'react';
import './styles/report.css'; // Import your CSS file for styling
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import SupervisorReport from './ReportsList/supervisor';

const GenerateReport = () => {
    const [cleaners, setCleaners] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch data from APIs
        fetchCleaners();
        fetchTasks();
    }, []);

    const fetchCleaners = () => {
        // Fetch cleaners data from API
        // Example: fetch('cleanersAPI')
        //     .then(response => response.json())
        //     .then(data => setCleaners(data));
        // For demonstration purpose, let's use dummy data
        const dummyCleaners = [
            { name: 'John Doe', position: 'Senior Cleaner', tasksAssigned: 10, claimsSubmitted: 3 },
            { name: 'Jane Smith', position: 'Junior Cleaner', tasksAssigned: 8, claimsSubmitted: 1 }
        ];
        setCleaners(dummyCleaners);
    };

    const fetchTasks = () => {
        // Fetch tasks data from API
        // Example: fetch('tasksAPI')
        //     .then(response => response.json())
        //     .then(data => setTasks(data));
        // For demonstration purpose, let's use dummy data
        const dummyTasks = [
            { name: 'Clean classroom 101', assignedTo: 'John Doe', status: 'In Progress' },
            { name: 'Clean lab 201', assignedTo: 'Jane Smith', status: 'Completed' }
        ];
        setTasks(dummyTasks);
    };

    const handleDownload = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(22);
        doc.setTextColor(40);
        doc.text('University Cleaners Management System Report', 14, 22);

        // Add some spacing
        doc.setFontSize(12);
        doc.text('', 14, 30);

        // Add content for each section
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

        // Now adding supervisor report
        const supervisorReport = new jsPDF();
        supervisorReport.text("Supervisor Report", 20, 10);
        supervisorReport.autoTable({ html: '#supervisor-table' });
        doc.addPage();
        doc.addImage(supervisorReport.output('datauri'), 'JPEG', 10, 140, 190, 0);

        // Save the PDF
        doc.save('system_report.pdf');
    };

    return (
        <div className="system-report-container">
            <h2>System Report</h2>
            <div className="generate-button-container">
                <button className="generate-button" onClick={handleDownload}>Generate Report</button>
            </div>
            <div id="supervisor-table" style={{ display: 'none' }}>
                <SupervisorReport />
            </div>
        </div>
    );
};

export default GenerateReport;
