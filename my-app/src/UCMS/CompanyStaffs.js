import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
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
  const [staff, setStaff] = useState({
    username: '',
    role: '',
    companyId: '',
    clientOrganisations: []
  });
  const [roles, setRoles] = useState([]);
  const [cleaningCompanies, setCleaningCompanies] = useState([]); // Added this line
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaffId, setCurrentStaffId] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('username');

  useEffect(() => {
    fetchStaffData();
    fetchRoles();
    fetchCleaningCompanies(); // Added this line
  }, []);

  const fetchStaffData = () => {
    axios.get('http://localhost:8080/api/v1/users/list')
      .then(response => {
        setStaffData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching staff data:', error);
      });
  };

  const fetchRoles = () => {
    axios.get('http://localhost:8080/api/v1/users/list') // Adjusted API endpoint
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  };

  const fetchCleaningCompanies = () => {
    axios.get('http://localhost:8080/api/v1/list') // Adjusted API endpoint
      .then(response => {
        setCleaningCompanies(response.data);
      })
      .catch(error => {
        console.error('Error fetching cleaning companies:', error);
      });
  };

  const validateStaff = (staff) => {
    const errors = {};
    if (!staff.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!staff.role) {
      errors.role = 'Role is required';
    }
    if (!staff.companyId) {
      errors.companyId = 'Cleaning company is required';
    }
    return errors;
  };

  const handleAddStaff = () => {
    const validationErrors = validateStaff(staff);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://localhost:8080/api/v1/users/create', staff)
      .then(response => {
        setStaffData([...staffData, response.data]);
        setStaff({ username: '', role: '', companyId: '', clientOrganisations: [] });
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
    setStaff(staff);
    setCurrentStaffId(staff.id);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleUpdateStaff = () => {
    const validationErrors = validateStaff(staff);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.put(`http://localhost:8080/api/v1/update/user/${currentStaffId}`, staff)
      .then(response => {
        const updatedData = staffData.map(s => {
          if (s.id === currentStaffId) {
            return { ...s, ...staff };
          }
          return s;
        });
        setStaffData(updatedData);
        setStaff({ username: '', role: '', companyId: '', clientOrganisations: [] });
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
    axios.delete(`http://localhost:8080/api/v1/delete/user/${id}`) // Adjusted API endpoint
      .then(response => {
        setStaffData(staffData.filter(s => s.id !== id));
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
    setStaff({ username: '', role: '', companyId: '', clientOrganisations: [] });
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

  const handleRoleChange = (selectedRoleId) => {
    setStaff(prevState => ({
      ...prevState,
      role: selectedRoleId,
    }));
  };

  const handleCleaningCompanyChange = (selectedCompanyId) => {
    setStaff(prevState => ({
      ...prevState,
      companyId: selectedCompanyId,
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
  };


  const filteredData = staffData.filter(staff => staff.username.toLowerCase().includes(searchTerm));
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;   //Returns -1 to sort a before b
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  const paginatedData = sortedData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  if (loading) {
    return <div>Loading resources...</div>;
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '60px' }}>
      <Home />
      <div style={{ backgroundColor: 'white', textAlign: 'center', padding: '20px 0', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333333', fontWeight: 'normal', fontFamily: 'Arial, sans-serif', fontSize: '20px' }}>Company Staff Information</h2>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>

      <div style={{ marginBottom: '20px', textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button
          style={{ width: '200px', height: '40px', fontWeight: 'bold', backgroundColor: '#4CAF50' }}
          onClick={handleOpenDialog}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Staff
        </Button>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <TextField
          label="Search by Username"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
      </div>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Update Staff' : 'Add New Staff'}</DialogTitle>
        <DialogContent style={{ width: '450px' }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={staff.username}
            onChange={(e) => setStaff({ ...staff, username: e.target.value })}
            error={!!errors.username}
            helperText={errors.username}
          />
          <form>
            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="roleSelect"
                value={staff.role}
                onChange={(e) => handleRoleChange(e.target.value)}
              >
                <MenuItem value="" disabled>Select a role</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.role}
                  </MenuItem>
                ))}
              </Select>
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.companyId}>
              <InputLabel id="company-select-label">Cleaning Company</InputLabel>
              <Select
                labelId="company-select-label"
                id="companySelect"
                value={staff.companyId}
                onChange={(e) => handleCleaningCompanyChange(e.target.value)}
              >
                <MenuItem value="" disabled>Select a company</MenuItem>
                {cleaningCompanies.map((company) => (
                  <MenuItem key={company.companyId} value={company.companyId}>
                    {company.companyName}
                  </MenuItem>
                ))}
              </Select>
              {errors.companyId && <FormHelperText>{errors.companyId}</FormHelperText>}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={isEditing ? handleUpdateStaff : handleAddStaff} color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={5} style={{ margin: 'auto', maxWidth: '950px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', justifyContent: 'center' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('username')}>Username</TableCell>
              <TableCell onClick={() => handleSort('cleaningCompany')}>Cleaning Company</TableCell>
              <TableCell onClick={() => handleSort('role')}>Role</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((staff, index) => (
              <TableRow key={staff.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{staff.username}</TableCell>
                <TableCell>{staff.cleaningCompany ? staff.cleaningCompany.companyName : 'N/A'}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditStaff(staff)} startIcon={<EditIcon />}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(staff.id)} startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <span>Rows per page: </span>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange} style={{ marginLeft: '5px' }}>
          {[5, 10, 25].map(rows => (
            <option key={rows} value={rows}>{rows}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CompanyStaffs;
