import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button,
    TextField, MenuItem, FormControl, Select
} from '@material-ui/core';
import { Edit, Delete } from "@mui/icons-material";
import Home from "./Home";
import axios from "axios";

const Attachments = () => {
    const [attachments, setAttachments] = useState([]);
    const [file, setFile] = useState(null);
    const [staffId, setStaffId] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

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
        setStaffId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('staffId', staffId);

        if (editing) {
            await axios.put(`http://localhost:8080/api/v1/update/attachments/${currentId}`, formData);
            setEditing(false);
            setCurrentId(null);
        } else {
            await axios.post('http://localhost:8080/api/v1/upload', formData);
        }

        setFile(null);
        setStaffId('');
        fetchAttachments();
    };

    const handleEdit = (attachment) => {
        setEditing(true);
        setCurrentId(attachment.id);
        setStaffId(attachment.staffs.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/delete/attachments/${id}`);
        fetchAttachments();
    };

    return (
        <div style={{ display: 'block', margin: 'auto', marginTop: '150px', width: '950px' }}>
            <Home />
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <FormControl fullWidth>
                    <Select value={staffId} onChange={handleStaffChange} required>
                        {staffs.map(staff => (
                            <MenuItem key={staff.id} value={staff.id}>
                                {staff.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit">{editing ? 'Update' : 'Upload'}</Button>
            </form>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>File Name</TableCell>
                            <TableCell>Staff</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attachments.map((attachment) => (
                            <TableRow key={attachment.id}>
                                <TableCell>{attachment.id}</TableCell>
                                <TableCell>{attachment.fileName}</TableCell>
                                <TableCell>{attachment.staffs ? attachment.staffs.StaffName : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(attachment)}><Edit /></Button>
                                    <Button onClick={() => handleDelete(attachment.id)}><Delete /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Attachments;
