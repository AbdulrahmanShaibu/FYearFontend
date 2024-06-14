import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
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
    axios.get('http://localhost:8080/api/v1/users/list') // Adjust API endpoint based on your backend
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  };

  const fetchCleaningCompanies = () => {
    axios.get('http://localhost:8080/api/v1/list') // Adjust API endpoint based on your backend
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
    axios.delete(`http://localhost:8080/api/v1/delete/user/${id}`) // Adjust API endpoint based on your backend
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

  const paginatedData = staffData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

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
        <Button style={{ width: '200px', height: '40px', fontWeight: 'bold' }} onClick={handleOpenDialog} variant="contained" startIcon={<AddIcon />}>
          Add Staff
        </Button>
      </div>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Update Staff' : 'Add New Staff'}</DialogTitle>
        <DialogContent style={{width:'450px'}}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={staff.username}
            onChange={(e) => setStaff({ ...staff, username: e.target.value })}
            error={!!errors.username}
            helperText={errors.username}
          />

          <Form>
            <FormGroup>
              <Label for="roleSelect">Role</Label>
              <Input
                type="select"
                id="roleSelect"
                value={staff.role}
                onChange={(e) => handleRoleChange(e.target.value)}
                invalid={!!errors.role}
              >
                <option value="" disabled>Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </Input>
              {errors.role && <FormFeedback>{errors.role}</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="companySelect">Cleaning Company</Label>
              <Input
                type="select"
                id="companySelect"
                value={staff.companyId}
                onChange={(e) => handleCleaningCompanyChange(e.target.value)}
                invalid={!!errors.companyId}
              >
                <option value="" disabled>Select a company</option>
                {cleaningCompanies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.companyName}
                  </option>
                ))}
              </Input>
              {errors.companyId && <FormFeedback>{errors.companyId}</FormFeedback>}
            </FormGroup>
          </Form>
          {/* Additional fields for clientOrganisations as needed */}
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
              <TableCell>S/N</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Cleaning Company</TableCell>
              <TableCell>Role</TableCell>
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
