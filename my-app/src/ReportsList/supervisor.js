import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';

const SupervisorReport = () => {

    const [supervisors, setSupervisors] = useState([]);

    useEffect(() => {
        fetchSupervisors();
    }, []);

    const fetchSupervisors = () => {
        fetch('http://localhost:8080/api/v1/list/supervisors')
            .then(response => response.json())
            .then(data => setSupervisors(data))
            .catch(error => console.error('Error fetching supervisors:', error)); // Add error handling
    };

    return (
        <TableContainer component={Paper} style={{
            margin: 'auto', maxWidth: '950px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px', overflow: 'hidden'
        }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Supervisor Id</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Supervisor Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Department Name</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {supervisors && supervisors.map((supervisor, index) => (
                        <TableRow key={supervisor.supervisorID}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{supervisor.supervisorName}</TableCell>
                            {/* <TableCell>
                                {supervisor.department && supervisor.department.length > 0 ?
                                    supervisor.department[0].departmentName : "No department"}
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default SupervisorReport;
