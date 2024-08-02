import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Modal, Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
    const data = Object.fromEntries(formData.entries());
    // data.roles = formData.getAll('roles');
    if (selectedStaff) {
      await axios.put(`http://localhost:8080/api/v1/update/company-staff/${selectedStaff.id}`, data);
    } else {
      await axios.post('http://localhost:8080/api/v1/post/company-staff', data);
    }
    fetchStaffs();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/delete/company-staff/${id}`);
    fetchStaffs();
  };

  return (
    <Paper sx={{ padding: 25 }}>
      <Home />
      <Box display="flex" justifyContent="center" margin={'auto'}
        alignItems="center" width={'50%'} flexDirection="column" sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={() => handleOpen()}>Add Cleaner</Button>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cleaner Name</TableCell>
                <TableCell>Cleaning Company</TableCell>
                {/* <TableCell>Roles</TableCell> */}
                <TableCell>Client Organisations</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.cleaningCompany.companyName}</TableCell>
                  {/* <TableCell>{staff.roles.map(role => role.roleName).join(', ')}</TableCell> */}
                  <TableCell>{staff.clientOrganisations.map(org => org.name).join(', ')}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(staff)}>Edit</Button>
                    <Button onClick={() => handleDelete(staff.id)}>Delete</Button>
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
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} sx={{ ...modalStyle }}>
          <TextField name="name" label="Name" defaultValue={selectedStaff ? selectedStaff.name : ''} fullWidth required sx={{ marginBottom: 2 }} />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Cleaning Company</InputLabel>
            <Select name="cleaningCompanyId" defaultValue={selectedStaff ? selectedStaff.cleaningCompany.id : ''} required>
              {cleaningCompanies.map(company => (
                <MenuItem key={company.companyId} value={company.companyId}>{company.companyName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Roles</InputLabel>
            <Select
              name="roles"
              multiple
              defaultValue={selectedStaff ? selectedStaff.roles.map(role => role.id) : []}
              required
            >
              {roles.map(role => (
                <MenuItem key={role.id} value={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Client Organisations</InputLabel>
            <Select name="clientOrganisations" multiple defaultValue={selectedStaff ? selectedStaff.clientOrganisations.map(org => org.id) : []} required>
              {clientOrganisations.map(org => (
                <MenuItem key={org.id} value={org.id}>{org.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" fullWidth>{selectedStaff ? 'Update' : 'Create'}</Button>
        </Box>
      </Modal>
    </Paper>
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
