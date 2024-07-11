import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination,
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, MenuItem, CircularProgress
} from '@material-ui/core';
import '../styles/sidebar.css';
import UpdateClaimModal from "../UpdateClaimModal";
import UserHome from "./UserHome";

const UserStaffComplain = () => {
  const [claimsDescription, setClaimsDescription] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [claims, setClaims] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const fetchComplains = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/list/StaffComplain');
      const data = await response.json();
      setClaims(data);
    } catch (error) {
      console.error('Error fetching complains:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/staffs/list');
      const data = await response.json();
      setStaffs(data);
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!claimsDescription || !submissionDate || !selectedStaff) {
      alert('All fields are required');
      return;
    }

    const data = {
      claimsDescription,
      submissionDate,
      staffID: selectedStaff
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/save/StaffComplain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setClaims([...claims, result]);
      handleCloseFormModal();
    } catch (error) {
      console.error('Error saving complain:', error);
    }

    setClaimsDescription('');
    setSubmissionDate('');
    setSelectedStaff('');
  };

  const handleOpenFormModal = () => {
    setOpenFormModal(true);
  };

  const handleCloseFormModal = () => {
    setOpenFormModal(false);
  };

  const handleOpenModal = (claim) => {
    setSelectedClaim(claim);
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ margin: 'auto', marginTop: '80px', width: '950px' }}>
      <UserHome />
      <div>
        <br /><br />
        <Button variant="contained" color="primary" onClick={handleOpenFormModal}>
          Add Complain
        </Button>
        <br /><br />
        <div style={{ margin: 'auto', backgroundColor: 'whitesmoke' }}>
          <h4 style={{ margin: 'auto', width: '25%', fontWeight: 'bold' }}>Create form to submit complain</h4>
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
                    <TableCell>{claim.staffs ? claim.staffs.staffName : 'N/A'}</TableCell>
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
              value={claimsDescription}
              onChange={(e) => setClaimsDescription(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Date Submitted"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Select Staff"
              select
              fullWidth
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              required
            >
              {staffs.map((staff) => (
                <MenuItem key={staff.staffID} value={staff.staffID}>
                  {staff.staffName}
                </MenuItem>
              ))}
            </TextField>
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
          handleClose={handleCloseModal}
          claim={selectedClaim}
        />
      )}
    </div>
  );
};

export default UserStaffComplain;
