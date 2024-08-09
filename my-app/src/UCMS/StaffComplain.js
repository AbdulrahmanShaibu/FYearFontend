import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core';
import Home from "./Home";
import { Alert, AlertTitle, Typography } from "@mui/material";
import axios from "axios";

const StaffComplain = () => {
  const [description, setDescription] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [claims, setClaims] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

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
    fetchStaffs();
  }, []);

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

  const handleDelete = (id) => {
    axios.delete(`${deleteAPI}/${id}`)
      .then(response => {
        if (response.status === 200) {
          setClaims(claims.filter(claim => claim.complainID !== id));
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
                  <TableCell style={style.table}>Staff Name</TableCell>
                  <TableCell style={style.table}>Update</TableCell>
                  <TableCell style={style.table}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((claim, index) => (
                  <TableRow key={claim.complainID}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{claim.description}</TableCell>
                    <TableCell>{claim.submissionDate}</TableCell>
                    <TableCell>{claim.staffs ? `${claim.staffs.firstName} ${claim.staffs.lastName}` : 'N/A'}</TableCell>
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
                        onClick={() => handleDelete(claim.complainID)}
                      >
                        Delete
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
    </div>
  );
};

export default StaffComplain;
