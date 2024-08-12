import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Modal, Box, TextField, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import axios from 'axios';
import Home from './Home';

const CompanyStaffs = () => {
  const [staffs, setStaffs] = useState([]);
  const [cleaningCompanies, setCleaningCompanies] = useState([]);
  const [clientOrganisations, setClientOrganisations] = useState([]);
  // const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchStaffs();
    fetchCleaningCompanies();
    fetchClientOrganisations();
    // fetchRoles();
  }, []);

  const fetchStaffs = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/list/company-staffs');
    setStaffs(response.data);
  };

  const fetchCleaningCompanies = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/list');
    setCleaningCompanies(response.data);
  };

  const fetchClientOrganisations = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/ClientOrganisation/list');
    setClientOrganisations(response.data);
  };

  // const fetchRoles = async () => {
  //   const response = await axios.get('http://localhost:8080/api/v1/list/roles');
  //   setRoles(response.data);
  //   console.log('Roles fetched:', response.data); // Log the roles to check structure
  // };

  const handleOpen = (staff = null) => {
    setSelectedStaff(staff);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStaff(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        cleaningCompany: {
            companyId: formData.get('cleaningCompanyId')
        },
        clientOrganisations: formData.getAll('clientOrganisations').map(id => ({ id: id }))
    };

    if (selectedStaff) {
        await axios.put(`http://localhost:8080/api/v1/update/company-staff/${selectedStaff.id}`, data);
    } else {
        await axios.post('http://localhost:8080/api/v1/post/company-staff', [data]);
    }
    fetchStaffs();
    handleClose();
};

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/delete/company-staff/${id}`);
    fetchStaffs();
  };

  return (
    // <Paper sx={{ padding: 10 }}>
    <div style={{ padding: 120 }}>
      <Home />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="50%"
        margin="auto"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          sx={{ marginBottom: 2 }}
        >
          Add Cleaner
        </Button>

        <TableContainer component={Paper} sx={{ width: '150%', marginBottom: 2 }}>
          <Alert severity="info">
            Manage your company staffs efficiently. Use the button above to add a new company staffs to the system, ensuring all relevant details are captured for effective management.
          </Alert>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Cleaner Name</strong></TableCell>
                <TableCell><strong>Cleaning Company</strong></TableCell>
                <TableCell><strong>Client Organisations</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.cleaningCompany.companyName}</TableCell>
                  <TableCell>{staff.clientOrganisations.map(org => org.name).join(', ')}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpen(staff)}
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(staff.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={staffs.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginBottom: 2 }}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
    <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
        <TextField
            name="name"
            label="Name"
            defaultValue={selectedStaff ? selectedStaff.name : ''}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Cleaning Company</InputLabel>
            <Select
                name="cleaningCompanyId"
                defaultValue={selectedStaff ? selectedStaff.cleaningCompany.companyId : ''}
                required
            >
                {cleaningCompanies.map(company => (
                    <MenuItem key={company.companyId} value={company.companyId}>
                        {company.companyName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Client Organisations</InputLabel>
            <Select
                name="clientOrganisations"
                multiple
                defaultValue={selectedStaff ? selectedStaff.clientOrganisations.map(org => org.id) : []}
                required
            >
                {clientOrganisations.map(org => (
                    <MenuItem key={org.id} value={org.id}>
                        {org.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
            {selectedStaff ? 'Update' : 'Create'}
        </Button>
    </Box>
</Modal>

    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default CompanyStaffs;
