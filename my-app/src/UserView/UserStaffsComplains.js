import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination,
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, CircularProgress
} from '@material-ui/core';
import '../styles/sidebar.css';
import UpdateClaimModal from "../UpdateClaimModal";
import { jwtDecode } from 'jwt-decode'; 
import UserHome from "./UserHome";

const UserStaffComplain = () => {
  const [state, setState] = useState({
    description: '',
    submissionDate: '',
    selectedStaff: '',
    claims: [],
    staffs: [],
    openModal: false,
    openFormModal: false,
    selectedClaim: null,
    loading: true,
    page: 0,
    rowsPerPage: 5,
    isAuthenticated: false,
    userRole: ''
  });

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
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        setState(prevState => ({
          ...prevState,
          isAuthenticated: true,
          userRole: decodedToken.role
        }));
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };

  const fetchComplains = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/list/StaffComplain');
      const data = await response.json();
      setState(prevState => ({ ...prevState, claims: data }));
    } catch (error) {
      console.error('Error fetching complains:', error);
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  const fetchStaffs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/all-jwt-users');
      const data = await response.json();
      setState(prevState => ({ ...prevState, staffs: data }));
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { description, submissionDate, selectedStaff, claims, isAuthenticated, userRole } = state;

    if (!description || !submissionDate) {
      alert('All fields are required');
      return;
    }

    if (!isAuthenticated || userRole !== 'STAFF') {
      alert('Only authenticated staff can submit a complaint.');
      return;
    }

    const data = {
      description,
      submissionDate,
      StaffID: selectedStaff
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/save/StaffComplain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setState(prevState => ({ ...prevState, claims: [...claims, result] }));
      handleCloseFormModal();
    } catch (error) {
      console.error('Error saving complain:', error);
    }

    setState(prevState => ({
      ...prevState,
      description: '',
      submissionDate: '',
      selectedStaff: ''
    }));
  };

  const handleOpenFormModal = () => {
    setState(prevState => ({ ...prevState, openFormModal: true }));
  };

  const handleCloseFormModal = () => {
    setState(prevState => ({ ...prevState, openFormModal: false }));
  };

  const handleChangePage = (event, newPage) => {
    setState(prevState => ({ ...prevState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setState(prevState => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    }));
  };

  const { description, submissionDate, selectedStaff, claims, staffs, openFormModal, openModal, selectedClaim, loading, page, rowsPerPage, isAuthenticated, userRole } = state;

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '80px', width: '950px' }}>
      <UserHome/>
      <div>
        <br /><br />
        {isAuthenticated && userRole === 'STAFF' && (
          <Button variant="contained" color="primary" onClick={handleOpenFormModal}>
            Add Complain
          </Button>
        )}
        <br /><br />
        <div style={{ margin: 'auto', backgroundColor: 'whitesmoke' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={style.table}>S/N</TableCell>
                  <TableCell style={style.table}>Description</TableCell>
                  <TableCell style={style.table}>Date Submitted</TableCell>
                  <TableCell style={style.table}>Staff Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((claim, index) => (
                  <TableRow key={claim.complainID}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{claim.description}</TableCell>
                    <TableCell>{claim.submissionDate}</TableCell>
                    <TableCell>{claim.staffs ? claim.staffs.firstName : 'N/A'}</TableCell>
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
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={description}
              onChange={(e) => setState(prevState => ({ ...prevState, description: e.target.value }))}
              required
            />
            <TextField
              margin="dense"
              label="Date Submitted"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={submissionDate}
              onChange={(e) => setState(prevState => ({ ...prevState, submissionDate: e.target.value }))}
              required
            />
            <DialogActions>
              <Button onClick={handleCloseFormModal} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {selectedClaim && (
        <UpdateClaimModal
          open={openModal}
          handleClose={handleCloseFormModal}
          claim={selectedClaim}
        />
      )}
    </div>
  );
};

export default UserStaffComplain;
