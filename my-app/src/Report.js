import React from 'react';
import './styles/report.css'; // Import your CSS file for styling
import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin

const GenerateReport = () => {

    // Sample data for the summary table (replace this with your actual data)
    const [summaryData, setSummaryData] = useState([
        { category: 'Category A', total: 20, resolved: 15, unresolved: 5 },
        { category: 'Category B', total: 30, resolved: 25, unresolved: 5 },
        // Add more rows as needed with your actual data
    ]);

    // Function to update the summary data (simulated for demonstration)
    const updateSummaryData = () => {
        // Simulated updated data
        const updatedData = [
            { category: 'Category A', total: 25, resolved: 20, unresolved: 5 },
            { category: 'Category B', total: 35, resolved: 30, unresolved: 5 },
            // Updated or additional rows with your actual data
        ];

        setSummaryData(updatedData);
    };

    const [sectionContents, setSectionContents] = useState({
        executiveSummary: 'Executive summary content...',
        introduction: 'Introduction content...',
        methodology: 'Methodology content...',
        complaintAnalysis: 'Analysis content...',
        systemPerformance: 'Performance content...',
        recommendations: 'Recommendations content...',
        conclusion: 'Conclusion content...',
        appendix: 'Appendix content...',
    });

    const handleDownload = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Loop through sections and add their content to the PDF
        Object.keys(sectionContents).forEach((section) => {
            doc.text(`${section} Section`, 15, 15); // Add section title
            doc.text(sectionContents[section], 15, 25); // Add section content
            doc.addPage(); // Add a new page for each section
        });

        // Add content to the PDF
        doc.text('Tittle Street Complaint Management System Report', 15, 15);

        // Add summary table to the PDF
        let yPos = 30;
        doc.autoTable({
            startY: yPos,
            head: [['Category', 'Total', 'Resolved', 'Unresolved']],
            body: summaryData.map((data) => [data.category, data.total, data.resolved, data.unresolved]),
        });

        // Save the PDF when the "Download" button is clicked
        doc.save('ComplaintManagementReport.pdf');
    };

    return (
        <div className="report-container">
            <h1>Tittle Street Complaint Management System Report</h1>
            <hr />

            <section className="section">
                <h2>Executive Summary</h2>
                <p>Executive summary content...</p>
            </section>

            <section className="section">
                <h2>Introduction</h2>
                <p>Introduction content...</p>
            </section>

            <section className="section">
                <h2>Methodology</h2>
                <p>Methodology content...</p>
            </section>

            <section className="section">
                <h2>Complaint Analysis</h2>
                <p>Analysis content...</p>
            </section>

            <section className="section">
                <h2>System Performance</h2>
                <p>Performance content...</p>
            </section>

            <section className="section">
                <h2>Recommendations</h2>
                <p>Recommendations content...</p>
            </section>

            <section className="section">
                <h2>Conclusion</h2>
                <p>Conclusion content...</p>
            </section>

            <section className="section">
                <h2>Appendix</h2>
                <p>Appendix content...</p>
            </section>

            <section className="section">
                <h2>Summary Table</h2>
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Total</th>
                            <th>Resolved</th>
                            <th>Unresolved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summaryData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.category}</td>
                                <td>{data.total}</td>
                                <td>{data.resolved}</td>
                                <td>{data.unresolved}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={updateSummaryData} className="update-button">
                    Update Summary Data
                </button>

                <button onClick={handleDownload} style={{ backgroundColor: 'green' }}>
                    Dowload
                </button>

            </section>
        </div>
    );
};

export default GenerateReport;
