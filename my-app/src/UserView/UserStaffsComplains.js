import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination,
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, FormControl, InputLabel, Select, MenuItem,
  CircularProgress, Alert, Stack, Typography
} from '@mui/material';
import axios from 'axios';
import UserHome from "./UserHome";
import UpdateClaimModal from "../UpdateClaimModal";

const UserStaffComplain = () => {
  const [state, setState] = useState({
    openFormModal: false,
    openModal: false,
    loading: true,
    page: 0,
    rowsPerPage: 5,
    description: '',
    submissionDate: '',
    selectedStaff: '',
    selectedClaimType: '',
    claims: [],
    staffs: [],
    claimTypes: [],
    selectedClaim: null
  });

  useEffect(() => {
    fetchComplains();
    fetchStaffs();
    fetchClaimTypes();
  }, []);

  const fetchComplains = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/list/StaffComplain');
      setState(prevState => ({ ...prevState, claims: response.data }));
    } catch (error) {
      console.error('Error fetching complains:', error);
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  const fetchStaffs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/all-jwt-users');
      setState(prevState => ({ ...prevState, staffs: response.data }));
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };

  const fetchClaimTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/list/claim-type');
      setState(prevState => ({ ...prevState, claimTypes: response.data }));
    } catch (error) {
      console.error('Error fetching claim types:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      description: formData.get('description'),
      submissionDate: formData.get('submissionDate'),
      staff: { id: formData.get('selectedStaff') },
      claimType: { id: formData.get('selectedClaimType') }
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/save/StaffComplain', data);
      setState(prevState => ({
        ...prevState,
        claims: [...prevState.claims, response.data]
      }));
      handleCloseFormModal();
    } catch (error) {
      console.error('Error saving complain:', error);
    }
  };

  const handleOpenFormModal = () => setState(prevState => ({ ...prevState, openFormModal: true }));
  const handleCloseFormModal = () => setState(prevState => ({ ...prevState, openFormModal: false }));

  const handleChangePage = (event, newPage) => setState(prevState => ({ ...prevState, page: newPage }));
  const handleChangeRowsPerPage = (event) => setState(prevState => ({
    ...prevState,
    rowsPerPage: +event.target.value,
    page: 0
  }));

  const { description, submissionDate, selectedStaff, selectedClaimType, claims, staffs, claimTypes, openFormModal, openModal, selectedClaim, loading, page, rowsPerPage } = state;

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '80px', width: '950px' }}>
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
              Complaint Submission
            </Typography>
            <Typography variant="body2">
              To submit a complaint, please use the button below to provide the necessary details.
            </Typography>
          </div>
        </Alert>
      </Stack>

      <UserHome />
      <div>
        <br />
        <Button variant="contained" color="primary" onClick={handleOpenFormModal}>
          Add Complain
        </Button>
        <br /><br />
        <div style={{ margin: 'auto', backgroundColor: 'whitesmoke' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>S/N</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Date Submitted</strong></TableCell>
                  <TableCell><strong>Claim Type</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((claim, index) => (
                  <TableRow key={claim.complainID}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{claim.description}</TableCell>
                    <TableCell>{claim.submissionDate}</TableCell>
                    <TableCell>{claim.claimTypes[0]?.type || 'N/A'}</TableCell>
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

      <Dialog open={openFormModal} onClose={handleCloseFormModal}>
        <DialogTitle>Add New Complain</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Select Staff</InputLabel>
              <Select
                name="selectedStaff"
                value={selectedStaff}
                onChange={(e) => setState(prevState => ({ ...prevState, selectedStaff: e.target.value }))}
                required
              >
                <MenuItem value="" disabled>Select Staff</MenuItem>
                {staffs.map(staff => (
                  <MenuItem key={staff.id} value={staff.id}>
                    {staff.email} {staff.firstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Select Claim Type</InputLabel>
              <Select
                name="selectedClaimType"
                value={selectedClaimType}
                onChange={(e) => setState(prevState => ({ ...prevState, selectedClaimType: e.target.value }))}
                required
              >
                <MenuItem value="" disabled>Select Claim Type</MenuItem>
                {claimTypes.map(type => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={description}
              onChange={(e) => setState(prevState => ({ ...prevState, description: e.target.value }))}
              required
            />

            <TextField
              margin="dense"
              name="submissionDate"
              label="Date Submitted"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={submissionDate}
              onChange={(e) => setState(prevState => ({ ...prevState, submissionDate: e.target.value }))}
              required
            />
            <DialogActions>
              <Button onClick={handleCloseFormModal} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <UpdateClaimModal
        open={openModal}
        handleClose={() => setState(prevState => ({ ...prevState, openModal: false }))}
        claim={selectedClaim}
        staffs={staffs}
        claimTypes={claimTypes}
        updateClaim={(updatedClaim) => {
          setState(prevState => ({
            ...prevState,
            claims: prevState.claims.map(claim => claim.complainID === updatedClaim.complainID ? updatedClaim : claim),
            openModal: false
          }));
        }}
      />
    </div>
  );
};

export default UserStaffComplain;
