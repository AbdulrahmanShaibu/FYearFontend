import React, { useEffect, useState } from "react";
import {
    Card, CardContent, CardMedia, Typography, CardActions, Button,
    Grid, Container, Snackbar
} from '@mui/material';
import { Edit, Delete, FileCopy, Person, CalendarToday, Description } from "@mui/icons-material";
import Home from "./Home";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Attachments = () => {
    const [attachments, setAttachments] = useState([]);
    const [file, setFile] = useState(null);
    const [id, setId] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [foundStaff, setFoundStaff] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


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
        setId(e.target.value); // Set the staff ID
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

        if (!id) {
            setSnackbarMessage("Please select a valid staff");
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        try {
            if (editing) {
                await axios.put(`http://localhost:8080/api/v1/update/attachments/${currentId}`, formData);
                setEditing(false);
                setCurrentId(null);
            } else {
                await axios.post('http://localhost:8080/api/v1/upload/attachment', formData);
            }
            setFile(null);
            setId('');
            fetchAttachments();
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    const handleEdit = (attachment) => {
        setEditing(true);
        setCurrentId(attachment.id);
        setId(attachment.staffs ? attachment.staffs.id : '');
        findStaffById(attachment.staffs ? attachment.staffs.id : '');
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this attachment?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/delete/attachments/${id}`);
                fetchAttachments();
                setSnackbarMessage("Attachment deleted successfully");
                setSnackbarOpen(true);
            } catch (error) {
                console.error("Error deleting attachment", error);
            }
        }
    };

    const getStaffNameById = (id) => {
        const staff = staffs.find(staff => staff.id === id);
        return staff ? staff.firstName : 'N/A';
    };

    return (
        <Container>
            <Home />
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="info">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <div style={{ marginTop: '150px' }}>
                <Alert variant="h5" gutterBottom>
                    Submitted Attachments
                </Alert>
                {foundStaff && (
                    <Card variant="outlined" style={{ marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="h6">Found Staff Details</Typography>
                            <Typography>ID: {foundStaff.id}</Typography>
                            <Typography>Name: {foundStaff.fileName}</Typography>
                            <Typography>Email: {foundStaff.email}</Typography>
                            <Typography>Last Name: {foundStaff.lastName}</Typography>
                            {foundStaff.clientSite && (
                                <div>
                                    <Typography variant="subtitle1">Client Site</Typography>
                                    <Typography>ID: {foundStaff.clientSite.id}</Typography>
                                    <Typography>Name: {foundStaff.clientSite.name}</Typography>
                                    {foundStaff.clientSite.clientOrganisation && (
                                        <div>
                                            <Typography variant="subtitle2">Client Organisation</Typography>
                                            <Typography>ID: {foundStaff.clientSite.clientOrganisation.id}</Typography>
                                            <Typography>Name: {foundStaff.clientSite.clientOrganisation.name}</Typography>
                                        </div>
                                    )}
                                </div>
                            )}
                            {foundStaff.attachments && foundStaff.attachments.length > 0 && (
                                <div>
                                    <Typography variant="subtitle1">Attachments</Typography>
                                    <ul>
                                        {foundStaff.attachments.map(attachment => (
                                            <li key={attachment.id}>{attachment.fileName}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
                <Grid container spacing={3}>
                    {attachments.map((attachment) => (
                        <Grid item xs={12} sm={6} md={4} key={attachment.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`http://localhost:8080/api/v1/images/${attachment.id}`}
                                    alt={attachment.fileName}
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        <FileCopy style={{ verticalAlign: 'middle' }} /> {attachment.fileName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
                                        <Person style={{ verticalAlign: 'middle', marginRight: 4 }} /> Staff Name: {getStaffNameById(attachment.id)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
                                        <CalendarToday style={{ verticalAlign: 'middle', marginRight: 4 }} /> Description: submitted on {new Date().toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
                                        <Description style={{ verticalAlign: 'middle', marginRight: 4 }} /> Status: submitted
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleEdit(attachment)}>
                                        <Edit />
                                    </Button>
                                    <Button size="small" color="secondary" onClick={() => handleDelete(attachment.id)}>
                                        <Delete />
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
};

export default Attachments;
