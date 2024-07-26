import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  MenuItem, FormControl, InputLabel, Select, FormHelperText, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination
} from '@mui/material';
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
    roles: [], // Default role
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

  useEffect(() => {
    fetchStaffData();
    fetchRoles();
    fetchCleaningCompanies();
  }, []);

  const fetchStaffData = () => {
    axios.get('http://localhost:8080/api/v1/list/company-staffs')
      .then(response => {
        const companyStaffs = response.data.cleaningCompany ? response.data.cleaningCompany.companyStaffs : [];
        setStaffData(companyStaffs || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching company staffs data:', error);
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

    const payload = {
      ...companyStaffs,
      roles: companyStaffs.roles.map(role => ({ roleName: role })),
      cleaningCompany: { companyId: companyStaffs.companyId }
    };

    axios.post('http://localhost:8080/api/v1/post/company-staff', payload)
      .then(response => {
        fetchStaffData();
        setCompanyStaffs({ name: '', roles: ['Cleaner'], companyId: '', clientOrganisations: [] });
        setErrors({});
        showNotification('Staff added successfully', 'success');
        setDialogOpen(false);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrors({ form: error.response.data });
        }
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

    axios.put(`http://localhost:8080/api/v1/update/company-staff/${currentStaffId}`, {
      ...companyStaffs,
      roles: companyStaffs.roles.map(role => ({ roleName: role })) // Ensure roles are sent correctly
    })
      .then(response => {
        const updatedData = staffData.map(s => {
          if (s.id === currentStaffId) {
            return { ...s, ...companyStaffs };
          }
          return s;
        });
        setStaffData(updatedData);
        setCompanyStaffs({ name: '', roles: ['Cleaner'], companyId: '', clientOrganisations: [] }); // Reset form with default role
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

  const handleDeleteStaff = (id) => {
    axios.delete(`http://localhost:8080/api/v1/delete/company-staff/${id}`)
      .then(response => {
        setStaffData(staffData.filter(staff => staff.id !== id));
        showNotification('Staff deleted successfully', 'success');
      })
      .catch(error => {
        showNotification('Error deleting staff', 'error');
        console.error('Error deleting staff:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const showNotification = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredData = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Home />
      <br /><br /><br />
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)} startIcon={<AddIcon />}>
        Add Staff
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : (
              paginatedData.map(staff => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.roles.map(role => role.roleName).join(', ')}</TableCell>
                  <TableCell>{staff.cleaningCompany.name}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditStaff(staff)} startIcon={<EditIcon />}>Edit</Button>
                    <Button onClick={() => handleDeleteStaff(staff.id)} startIcon={<DeleteIcon />}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Staff' : 'Add Staff'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={companyStaffs.name}
            onChange={(e) => setCompanyStaffs({ ...companyStaffs, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <FormControl fullWidth variant="standard" error={!!errors.roles}>
            <InputLabel>Roles</InputLabel>
            <Select
              value={companyStaffs.roles[0] || ''}
              onChange={(e) => {
                setCompanyStaffs({ ...companyStaffs, roles: [e.target.value] });
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.roles}</FormHelperText>
          </FormControl>
          <FormControl fullWidth variant="standard" error={!!errors.companyId}>
            <InputLabel>Cleaning Company</InputLabel>
            <Select
              value={companyStaffs.companyId}
              onChange={(e) => setCompanyStaffs({ ...companyStaffs, companyId: e.target.value })}
            >
              {cleaningCompanies.map(company => (
                <MenuItem key={company.companyId} value={company.companyId}>{company.companyName}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.companyId}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={isEditing ? handleUpdateStaff : handleAddStaff}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CompanyStaffs;
