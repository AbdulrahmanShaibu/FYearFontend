import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, FormControl, InputLabel, Select, FormHelperText, TablePagination } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Home from './Home';

const CompanyStaffs = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [staffData, setStaffData] = useState([]);
  const [companyStaffs, setCompanyStaffs] = useState({
    companyId: '',
    name: '',
    roles: [],
    clientOrganisations: []
  });
  const [roles, setRoles] = useState([]);
  const [cleaningCompanies, setCleaningCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaffId, setCurrentStaffId] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('name');

  useEffect(() => {
    fetchStaffData();
    fetchRoles();
    fetchCleaningCompanies();
  }, []);

  const fetchStaffData = () => {
    axios.get('http://localhost:8080/api/v1/list/users')
      .then(response => {
        console.log('Fetched staff data:', response.data);
        setStaffData(response.data.companyStaffs || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching staff data:', error);
      });
  };

  const fetchRoles = () => {
    axios.get('http://localhost:8080/api/v1/list/roles')
      .then(response => {
        setRoles(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  };

  const fetchCleaningCompanies = () => {
    axios.get('http://localhost:8080/api/v1/list')
      .then(response => {
        setCleaningCompanies(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching cleaning companies:', error);
      });
  };

  const validateStaff = (companyStaffs) => {
    const errors = {};
    if (!companyStaffs.name.trim()) {
      errors.name = 'Name is required';
    }
    if (companyStaffs.roles.length === 0) {
      errors.roles = 'Role is required';
    }
    if (!companyStaffs.companyId) {
      errors.companyId = 'Cleaning company is required';
    }
    return errors;
  };

  const handleAddStaff = () => {
    const validationErrors = validateStaff(companyStaffs);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://localhost:8080/api/v1/create/users', companyStaffs)
      .then(response => {
        console.log('Added staff:', response.data);
        setStaffData(prevData => [...prevData, response.data]);
        setCompanyStaffs({ name: '', roles: [], companyId: '', clientOrganisations: [] });
        setErrors({});
        showNotification('Staff added successfully', 'success');
        setDialogOpen(false);
      })
      .catch(error => {
        showNotification('Error adding staff', 'error');
        console.error('Error adding staff:', error);
      });
  };

  const handleEditStaff = (staff) => {
    setCompanyStaffs({
      name: staff.name,
      roles: staff.roles.map(role => role.roleName),
      companyId: staff.companyId,
      clientOrganisations: staff.clientOrganisations
    });
    setCurrentStaffId(staff.id);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleUpdateStaff = () => {
    const validationErrors = validateStaff(companyStaffs);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.put(`http://localhost:8080/api/v1/update/user/${currentStaffId}`, companyStaffs)
      .then(response => {
        console.log('Updated staff:', response.data);
        setStaffData(prevData =>
          prevData.map(s => (s.id === currentStaffId ? { ...s, ...companyStaffs } : s))
        );
        setCompanyStaffs({ name: '', roles: [], companyId: '', clientOrganisations: [] });
        setErrors({});
        setIsEditing(false);
        setDialogOpen(false);
        showNotification('Staff updated successfully', 'success');
      })
      .catch(error => {
        showNotification('Error updating staff', 'error');
        console.error('Error updating staff:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/v1/delete/user/${id}`)
      .then(response => {
        console.log('Deleted staff:', response.data);
        setStaffData(prevData => prevData.filter(s => s.id !== id));
        showNotification('Staff deleted successfully', 'success');
      })
      .catch(error => {
        showNotification('Error deleting staff', 'error');
        console.error('Error deleting staff:', error);
      });
  };

  const showNotification = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setCompanyStaffs({ name: '', roles: [], companyId: '', clientOrganisations: [] });
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleRoleChange = (event) => {
    setCompanyStaffs(prevState => ({
      ...prevState,
      roles: event.target.value,
    }));
  };

  const handleCleaningCompanyChange = (event) => {
    setCompanyStaffs(prevState => ({
      ...prevState,
      companyId: event.target.value,
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value ? e.target.value.toLowerCase() : '');
  };

  const handleSort = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
  };

  const filteredData = (staffData || []).filter(staff =>
    staff.name ? staff.name.toLowerCase().includes(searchTerm) : false
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div style={{ padding: '16px' }}>
      <Home />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <TextField label="Search" variant="outlined" value={searchTerm} onChange={handleSearch} />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Add Staff
        </Button>
      </div>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('name')}>Name {sortColumn === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Cleaning Company</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? sortedData.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                : sortedData
              ).map(staff => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.roles.map(role => role.roleName).join(', ')}</TableCell>
                  <TableCell>{(cleaningCompanies.find(company => company.companyId === staff.companyId) || {}).companyName || ''}</TableCell>
                  <TableCell>
                    <Button startIcon={<EditIcon />} onClick={() => handleEditStaff(staff)}>Edit</Button>
                    <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(staff.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={(event, newPage) => setCurrentPage(newPage)}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit Staff' : 'Add Staff'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={companyStaffs.name}
            onChange={(e) => setCompanyStaffs({ ...companyStaffs, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              multiple
              value={companyStaffs.roles}
              onChange={handleRoleChange}
              label="Role"
              error={!!errors.roles}
            >
              {roles.map(role => (
                <MenuItem key={role.roleId} value={role.roleName}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.roles}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Cleaning Company</InputLabel>
            <Select
              value={companyStaffs.companyId}
              onChange={handleCleaningCompanyChange}
              label="Cleaning Company"
              error={!!errors.companyId}
            >
              {cleaningCompanies.map(company => (
                <MenuItem key={company.companyId} value={company.companyId}>
                  {company.companyName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.companyId}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          {isEditing
            ? <Button onClick={handleUpdateStaff} color="primary">Update</Button>
            : <Button onClick={handleAddStaff} color="primary">Add</Button>
          }
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CompanyStaffs;
