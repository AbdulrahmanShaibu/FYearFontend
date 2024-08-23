import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core';
import Home from "./Home";
import { Alert, AlertTitle, Typography } from "@mui/material";
import axios from "axios";
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download'; // Use MUI's built-in icon

const StaffComplain = () => {
  const [description, setDescription] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [claims, setClaims] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [complainType, setClaimTypes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claimToDelete, setClaimToDelete] = useState(null);

  const [attachements, setAttachments] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const style = {
    table: {
      backgroundColor: 'black',
      color: 'white',
      fontWeight: 'bold'
    }
  };

  useEffect(() => {
    fetchComplains();
    fetchClaimTypes();
    fetchStaffs();
    fetchAttachments();
  }, []);

  const fetchClaimTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/list/claim-type');
      setClaimTypes(response.data);
    } catch (error) {
      console.error('Error fetching claim types:', error);
    }
  };
  const fetchComplains = () => {
    axios.get('http://localhost:8080/api/v1/list/StaffComplain')
      .then(response => setClaims(response.data))
      .catch(error => console.error('Error fetching complains:', error));
  };

  const fetchStaffs = () => {
    axios.get('http://localhost:8080/api/v1/all-jwt-users')
      .then(response => setStaffs(response.data))
      .catch(error => console.error('Error fetching staffs:', error));
  };

  const fetchAttachments = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/get/attachments');
    setAttachments(response.data);
  };

  const saveAPI = 'http://localhost:8080/api/v1/save/StaffComplain';
  const deleteAPI = 'http://localhost:8080/api/v1/delete/StaffComplain';
  const updateAPI = 'http://localhost:8080/api/v1/update/StaffComplain';

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      description: description,
      submissionDate: submissionDate,
      staffs: selectedStaff
    };

    axios.post(saveAPI, data)
      .then(response => {
        setClaims([...claims, response.data]);
        resetFormFields();
      })
      .catch(error => console.error('Error saving complain:', error));
  };

  const handleDelete = () => {
    axios.delete(`${deleteAPI}/${claimToDelete}`)
      .then(response => {
        if (response.status === 200) {
          setClaims(claims.filter(claim => claim.complainID !== claimToDelete));
          handleCloseConfirmDialog(); // Close the confirmation dialog after successful delete
        } else {
          console.error('Error deleting complain:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting complain:', error.message));
  };

  const handleUpdate = (id) => {
    const data = {
      description: description,
      submissionDate: submissionDate,
      staffs: selectedStaff
    };

    axios.put(`${updateAPI}/${id}`, data)
      .then(response => {
        if (response.status === 200) {
          const updatedClaims = claims.map(claim =>
            claim.complainID === id ? { ...claim, ...data } : claim
          );
          setClaims(updatedClaims);
          handleCloseModal(); // Close the modal after successful update
        } else {
          console.error('Error updating complain:', response.statusText);
        }
      })
      .catch(error => console.error('Error updating complain:', error));
  };

  const handleOpenModal = (claim) => {
    setSelectedClaim(claim);
    setDescription(claim.description);
    setSubmissionDate(claim.submissionDate);
    setSelectedStaff(claim.staffs);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenConfirmDialog = (id) => {
    setClaimToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setClaimToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const resetFormFields = () => {
    setDescription('');
    setSubmissionDate('');
    setSelectedStaff('');
  };



  const downloadAttachments = async () => {
    const doc = new jsPDF();

    // Set document metadata
    doc.setProperties({
      title: 'Complaint Details',
      subject: 'Complaints and Attachments',
      author: 'Your Company',
    });

    // Title for the document
    doc.setFontSize(18);
    doc.text('Complaint Details', 10, 20);
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25); // Horizontal line
    doc.setFontSize(12);

    // Adding complaints with attachments
    let yPosition = 30;
    claims.forEach((complaint, index) => {
      // Add Complaint Details
      doc.setFontSize(14);
      doc.text(`Complaint ${index + 1}`, 10, yPosition);
      doc.setFontSize(12);

      yPosition += 10;
      doc.text(`Description: ${complaint.description}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Submission Date: ${complaint.submissionDate}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Claim Types: ${complaint.claimTypes.join(', ')}`, 10, yPosition);
      yPosition += 15;

      // Add corresponding attachments
      const relatedAttachments = attachements.filter(att => att.complaintId === complaint.id);

      if (relatedAttachments.length > 0) {
        doc.setFontSize(14);
        doc.text('Attachments:', 10, yPosition);
        yPosition += 10;

        relatedAttachments.forEach((attachment, i) => {
          if (yPosition + 60 > 280) { // Check if space is running out on the page
            doc.addPage();
            yPosition = 20;
          }

          const imageData = `data:image/jpeg;base64,${attachment.imageData}`;
          doc.addImage(imageData, 'JPEG', 10, yPosition, 50, 50); // Displaying the image
          doc.text(attachment.fileName, 70, yPosition + 30); // Displaying the filename next to the image

          yPosition += 60;
        });
      }

      yPosition += 10; // Add some space before the next complaint
      if (yPosition >= 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    // Save the PDF
    doc.save('attachments_and_complaints.pdf');
  };


  return (
    <div style={{ margin: 'auto', marginTop: '80px', width: '950px' }}>
      <Home />
      <div>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <Typography variant="h6">Submitted Complains</Typography>
        </Alert>
        <div style={{ margin: 'auto', backgroundColor: 'whitesmoke' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={style.table}>S/N</TableCell>
                  <TableCell style={style.table}>Description</TableCell>
                  <TableCell style={style.table}>Date Submitted</TableCell>
                  <TableCell style={style.table}>Complain Type</TableCell>
                  {/* <TableCell style={style.table}>Staff Name</TableCell> */}
                  <TableCell style={style.table}>Update</TableCell>
                  <TableCell style={style.table}>Delete</TableCell>
                  <TableCell style={style.table}>Attachments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((claim, index) => (
                  <TableRow key={claim.complainID}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{claim.description}</TableCell>
                    <TableCell>{claim.submissionDate}</TableCell>
                    <TableCell>{claim.claimTypes.map(ct => ct.type).join(', ')}</TableCell>
                    {/* <TableCell>{claim.staffs ? `${claim.staffs.firstName} ${claim.staffs.lastName}` : 'N/A'}</TableCell> */}
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenModal(claim)}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpenConfirmDialog(claim.complainID)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ color: 'green' }}
                        onClick={downloadAttachments}
                        startIcon={<DownloadIcon />} // Use the icon directly
                        sx={{
                          padding: '10px 20px',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          '&:hover': {
                            backgroundColor: '#2e7d32', // Darker green for hover
                          },
                          '&:active': {
                            backgroundColor: '#1b5e20', // Even darker green for active
                          },
                          '& .MuiButton-startIcon': {
                            marginRight: '8px',
                          },
                        }}
                        aria-label="Download attachments"
                      >
                        <Typography variant="button">Download</Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={claims.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>

      {/* Modal Form for Updating */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Update Complaint</DialogTitle>
        <DialogContent>
          <form onSubmit={() => handleUpdate(selectedClaim.complainID)}>
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Submission Date"
              fullWidth
              variant="outlined"
              type="date"
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Staff"
              fullWidth
              variant="outlined"
              select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option disabled={true} value=""></option>
              {staffs.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.firstName} {staff.lastName}
                </option>
              ))}
            </TextField>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Deleting */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this complaint?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffComplain;
