import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button,
    FormControl, Select, MenuItem
} from '@material-ui/core';
import { Edit, Delete } from "@mui/icons-material";
// import Home from "./Home";
import axios from "axios";
import UserHome from "./UserHome";

const UserAttachments = () => {
    const [attachments, setAttachments] = useState([]);
    const [file, setFile] = useState(null);
    const [staffId, setStaffId] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [foundStaff, setFoundStaff] = useState(null);

    useEffect(() => {
        fetchAttachments();
        fetchStaffs();
    }, []);

    const fetchAttachments = async () => {
        const response = await axios.get('http://localhost:8080/api/v1/get/attachments');
        setAttachments(response.data);
    };

    const fetchStaffs = async () => {
        const response = await axios.get('http://localhost:8080/api/v1/staffs/list');
        setStaffs(response.data);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleStaffChange = (e) => {
        setStaffId(e.target.value); // Set the staff ID
    };

    const findStaffById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/staffs/${id}`);
            setFoundStaff(response.data);
        } catch (error) {
            console.error("Error finding staff by ID", error);
            setFoundStaff(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate staffId
        if (!staffId) {
            alert("Please select a valid staff");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('staffId', staffId);

        if (editing) {
            await axios.put(`http://localhost:8080/api/v1/update/attachments/${currentId}`, formData);
            setEditing(false);
            setCurrentId(null);
        } else {
            await axios.post('http://localhost:8080/api/v1/upload/attachment', formData);
        }

        setFile(null);
        setStaffId('');
        fetchAttachments();
    };

    const handleEdit = (attachment) => {
        setEditing(true);
        setCurrentId(attachment.id);
        setStaffId(attachment.staffs ? attachment.staffs.StaffID : '');
        findStaffById(attachment.staffs ? attachment.staffs.StaffID : '');
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/delete/attachments/${id}`);
        fetchAttachments();
    };

    return (
        <div style={{ display: 'block', margin: 'auto', marginTop: '150px', width: '950px' }}>
          <UserHome/>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <FormControl fullWidth>
                    <Select value={staffId} onChange={handleStaffChange} required>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {staffs.map(staff => (
                            <MenuItem key={staff.StaffID} value={staff.StaffID}>
                                {staff.StaffName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit">{editing ? 'Update' : 'Attach Complain'}</Button>
            </form>
            {foundStaff && (
                <div>
                    <h3>Found Staff Details</h3>
                    <p>ID: {foundStaff.StaffID}</p>
                    <p>Name: {foundStaff.StaffName}</p>
                    <p>Email: {foundStaff.StaffEmail}</p>
                    <p>Phone: {foundStaff.StaffPhone}</p>
                    {foundStaff.clientSite && (
                        <div>
                            <h4>Client Site</h4>
                            <p>ID: {foundStaff.clientSite.id}</p>
                            <p>Name: {foundStaff.clientSite.name}</p>
                            {foundStaff.clientSite.clientOrganisation && (
                                <div>
                                    <h5>Client Organisation</h5>
                                    <p>ID: {foundStaff.clientSite.clientOrganisation.id}</p>
                                    <p>Name: {foundStaff.clientSite.clientOrganisation.name}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {foundStaff.attachments && foundStaff.attachments.length > 0 && (
                        <div>
                            <h4>Attachments</h4>
                            <ul>
                                {foundStaff.attachments.map(attachment => (
                                    <li key={attachment.id}>{attachment.fileName}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>File Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Staff</TableCell>
                            {/* <TableCell>Actions</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attachments.map((attachment, index) => (
                            <TableRow key={attachment.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{attachment.fileName}</TableCell>
                                <TableCell>
                                    <img src={`http://localhost:8080/api/v1/images/${attachment.id}`} alt={attachment.fileName} style={{ width: '100px', height: '100px' }} />
                                </TableCell>
                                <TableCell>{attachment.staffs ? attachment.staffs.StaffName : 'N/A'}</TableCell>
                                {/* <TableCell>
                                    <Button onClick={() => handleEdit(attachment)}><Edit /></Button>
                                    <Button onClick={() => handleDelete(attachment.id)}><Delete /></Button>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserAttachments;
