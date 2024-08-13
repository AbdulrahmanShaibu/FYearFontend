import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Select, MenuItem, FormControl, InputLabel, Alert,
  Container, Box, Paper, Typography,
  Pagination,
  AlertTitle
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import UserHome from './UserHome';
import { Add } from '@mui/icons-material';

const UserStaffComplain = () => {
  const [complains, setComplains] = useState([]);
  const [claimTypes, setClaimTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchComplains();
    fetchClaimTypes();
  }, []);

  const fetchComplains = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/list/StaffComplain');
      setComplains(response.data);
    } catch (error) {
      console.error('Error fetching complains:', error);
      setAlertMessage('Error fetching complains.');
      setAlertSeverity('error');
    }
  };

  const fetchClaimTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/list/claim-type');
      setClaimTypes(response.data);
    } catch (error) {
      console.error('Error fetching claim types:', error);
      setAlertMessage('Error fetching claim types.');
      setAlertSeverity('error');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      description: formData.get('description'),
      submissionDate: formData.get('submissionDate'),
      claimTypes: [
        {
          id: formData.get('claimTypeId'),
          type: claimTypes.find(ct => ct.id === parseInt(formData.get('claimTypeId')))?.type
        }
      ]
    };

    try {
      await axios.post('http://localhost:8080/api/v1/save/StaffComplain', data);
      setAlertMessage('Complain added successfully!');
      setAlertSeverity('success');
      fetchComplains();
      handleClose();
    } catch (error) {
      setAlertMessage('Error saving complain.');
      setAlertSeverity('error');
      console.error('Error saving complain:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page when rows per page change
  };

  const paginatedComplains = complains.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Container>
      <UserHome />
      {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage('')}>
          {alertMessage}
        </Alert>
      )}

      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpen}
        >
          Add Complain
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <TableContainer component={Paper} style={{ maxWidth: '80%', margin: 'auto' }}>
          <Alert
            severity="info"
            style={{
              backgroundColor: '#f0f4ff',
              color: '#1e3a8a',
              border: '1px solid #1e3a8a',
              fontSize: '16px',
              padding: '20px',
              // borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <AlertTitle style={{ fontWeight: 'bold', fontSize: '18px' }}>
              Kindly submit your complaint.
            </AlertTitle>
            Please provide all necessary details to help us assist you effectively.
          </Alert>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Complain Type</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedComplains.map((complain, index) => (
                <TableRow key={complain.complainID}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{complain.description}</TableCell>
                  <TableCell>{complain.submissionDate}</TableCell>
                  <TableCell>{complain.claimTypes.map(ct => ct.type).join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        style={{ maxWidth: '80%', margin: 'auto', padding: '10px 20px', backgroundColor: '#f5f5f5' }}
      >
        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Rows per page:</InputLabel>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Select
              style={{ height: '40px', marginRight: '10px', backgroundColor: '#fff', borderRadius: '4px' }}
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              label="Rows per page"
            >
              {[5, 10, 25, 50].map((rowsOption) => (
                <MenuItem key={rowsOption} value={rowsOption}>
                  {rowsOption}
                </MenuItem>
              ))}
            </Select>
            <Typography style={{ marginTop: '8px', fontWeight: '500' }}>
              {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, complains.length)} of ${complains.length}`}
            </Typography>
          </div>
        </FormControl>
        {/* <Pagination
          count={Math.ceil(complains.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="large"
          sx={{ '& .MuiPaginationItem-root': { borderRadius: '50%', minWidth: '40px', height: '40px' } }}
        /> */}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Complain</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                required
                variant="outlined"
              />
              <TextField
                name="submissionDate"
                label="Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <FormControl fullWidth required variant="outlined">
                <InputLabel>Complain Type</InputLabel>
                <Select
                  name="claimTypeId"
                  label="Claim Type"
                >
                  {claimTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>{type.type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default UserStaffComplain;
