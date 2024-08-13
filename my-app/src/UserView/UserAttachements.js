import React, { useEffect, useState } from "react";
import {
    Card, CardContent, CardMedia, Typography,
    FormControl, Select, MenuItem, Button, Stack, Grid
} from '@mui/material';
import { Alert } from "@mui/material";
import axios from "axios";
import UserHome from "./UserHome";

const UserAttachments = () => {
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
        const response = await axios.get('http://localhost:8080/api/v1/all-jwt-users');
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

    return (
        <div style={{ display: 'block', margin: 'auto', marginTop: '150px', width: '90%' }}>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert
                    severity="info"
                    sx={{
                        position: 'relative',
                        '& .MuiAlert-title': {
                            fontWeight: 'bold',
                            fontSize: '16px',
                        },
                        '& .MuiAlert-message': {
                            marginTop: '4px',
                        }
                    }}
                >
                    <div>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            Attachments
                        </Typography>
                        <Typography variant="body2">
                            Please attach your complaint here
                        </Typography>
                    </div>
                </Alert>
            </Stack>
            <UserHome />
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input type="file" onChange={handleFileChange} required />
                <FormControl fullWidth>
                    <Select value={staffId} onChange={handleStaffChange} required>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {staffs.map(staff => (
                            <MenuItem key={staff.StaffID} value={staff.id}>
                                {staff.firstName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit">{editing ? 'Update' : 'Attach Complaint'}</Button>
            </form>
            <Grid container spacing={3}>
                {attachments.map((attachment) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={attachment.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:8080/api/v1/images/${attachment.id}`}
                                alt={attachment.fileName}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {attachment.fileName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {attachment.staffs ? attachment.staffs.StaffName : 'No Staff Assigned'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default UserAttachments;
