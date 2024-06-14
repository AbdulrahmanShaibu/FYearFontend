import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';

const SupervisorReport = ({ supervisors }) => {
    return (
        <TableContainer component={Paper} style={{
            margin: 'auto', maxWidth: '950px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px', overflow: 'hidden'
        }}>
            <Table id="supervisor-table">
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
                            <TableCell>{supervisor.department && supervisor.department.length > 0 ?
                                supervisor.department[0].departmentName : "No department"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default SupervisorReport;
