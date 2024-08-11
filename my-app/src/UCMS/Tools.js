import React, { useEffect, useState } from "react";
import {
  Button, TextField, Grid, Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, FormControl, TablePagination, Select, MenuItem,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Alert,
  AlertTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Home from "./Home";

const Tools = () => {
  const [toolsData, setToolsData] = useState([]);
  const [countTools, setCountTools] = useState(0);
  const [tools, setTools] = useState({
    toolType: '',
    quantity: '',
    id: ''
  });
  const [clientSites, setClientSites] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for modal
  const [open, setOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState({
    toolID: '',
    toolType: '',
    quantity: '',
    id: ''
  });

  // State for delete confirmation dialog
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toolToDelete, setToolToDelete] = useState(null);

  // APIs
  const LIST_API = 'http://localhost:8080/api/v1/list/tools';
  const ADD_API = 'http://localhost:8080/api/v1/save/tools';
  const COUNT_API = 'http://localhost:8080/api/v1/count/tools';
  const DELETE_API = 'http://localhost:8080/api/v1/delete/tools';
  const UPDATE_API = 'http://localhost:8080/api/v1/update/tools';
  const CLIENT_SITES_API = 'http://localhost:8080/api/v1/get/client-sites';

  useEffect(() => {
    fetchData();
    fetchClientSites();
  }, []);

  const fetchData = async () => {
    try {
      const listResponse = await axios.get(LIST_API);
      setToolsData(listResponse.data);
      console.log('Tools List Responses:', listResponse.data);

      const countResponse = await axios.get(COUNT_API);
      setCountTools(countResponse.data);
      console.log('Number of tools available:', countResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchClientSites = async () => {
    try {
      const response = await axios.get(CLIENT_SITES_API);
      setClientSites(response.data);
      console.log('Client Sites:', response.data);
    } catch (error) {
      console.error('Error fetching client sites:', error);
    }
  };

  const handleAddData = async () => {
    try {
      const response = await axios.post(ADD_API, tools);
      setToolsData([...toolsData, response.data]);
      setTools({
        toolType: '',
        quantity: '',
        id: ''
      });
      console.log('Tools saved successfully:', response.data);
    } catch (error) {
      console.error('Error while saving tools:', error);
    }
  };

  const handleUpdateData = async (toolID, updatedTool) => {
    try {
      const response = await axios.put(`${UPDATE_API}/${toolID}`, updatedTool);
      const updatedToolsData = toolsData.map(tool =>
        tool.toolID === toolID ? { ...tool, ...response.data } : tool
      );
      setToolsData(updatedToolsData);
      console.log('Tool updated successfully:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error while updating tool:', error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`${DELETE_API}/${id}`);
      setToolsData(toolsData.filter(tool => tool.toolID !== id));
      setConfirmDelete(false);  // Close the confirmation dialog
    } catch (error) {
      console.error('Error while deleting tool:', error);
    }
  };

  const handleOpenDeleteConfirm = (toolID) => {
    setToolToDelete(toolID);
    setConfirmDelete(true);
  };

  const handleCloseDeleteConfirm = () => {
    setConfirmDelete(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteData(toolToDelete);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTools({ ...tools, [name]: value });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (tool) => {
    setCurrentTool(tool);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTool({ ...currentTool, [name]: value });
  };

  const handleModalUpdate = () => {
    handleUpdateData(currentTool.toolID, currentTool);
  };

  return (
    <div style={{ margin: 'auto', width: '80%', display: 'flex', flexDirection: 'column' }}>
      <Home />
      <Grid container spacing={3} style={{ margin: 'auto' }}>
        <Grid style={{ margin: 'auto' }}>
          <br /> <br />
          <Alert severity="info">
            <AlertTitle>client site tools details</AlertTitle>
            <Typography variant="h6">Manage Tools</Typography>
          </Alert>
          <Paper elevation={2} style={{
            padding: '20px',
            display: 'flex',
          }}>
            <div>
              <form style={{ backgroundColor: 'whitesmoke', padding: '20px', borderRadius: '4px', width: '100%' }}>
                <Typography variant="body1"
                  style={{
                    marginBottom: '15px', textAlign: 'center',
                    padding: '10px', backgroundColor: 'white', borderRadius: '4px'
                  }}>Number of Tools: {countTools}
                </Typography>
                <FormControl fullWidth margin="normal" style={{ marginBottom: '15px' }}>
                  <TextField
                    name="toolType"
                    label="Tool type"
                    type="text"
                    value={tools.toolType}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    style={{ marginBottom: '15px' }}
                    InputProps={{ style: { borderRadius: '4px', border: '1px solid #ccc' } }}
                  />
                </FormControl>
                <TextField
                  name="quantity"
                  label="Quantity"
                  type="number"
                  value={tools.quantity}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  style={{ marginBottom: '15px' }}
                  InputProps={{ style: { borderRadius: '4px', border: '1px solid #ccc' } }}
                />
                <FormControl fullWidth margin="normal" style={{ marginBottom: '15px' }}>
                  <Select
                    name="id"
                    value={tools.id}
                    onChange={handleInputChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled={true}>
                      Select Client Site
                    </MenuItem>
                    {clientSites.map((site) => (
                      <MenuItem key={site.id} value={site.id}>
                        {site.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  onClick={handleAddData}
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '20px', fontWeight: 'bolder', borderRadius: '4px' }}
                >
                  Add Tool
                </Button>
              </form>
            </div>

            <TableContainer component={Paper} style={{ width: '80%' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Tool Id</TableCell>
                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Tool Type</TableCell>
                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Quantity</TableCell>
                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Site</TableCell>
                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toolsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tool) => (
                    <TableRow key={tool.toolID}>
                      <TableCell>{tool.toolID}</TableCell>
                      <TableCell>{tool.toolType}</TableCell>
                      <TableCell>{tool.quantity}</TableCell>
                      <TableCell>{tool.clientSite ? tool.clientSite.name : 'N/A'}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleOpen(tool)}
                          startIcon={<EditIcon />}
                          style={{ color: 'blue', textTransform: 'capitalize', fontWeight: 'bold' }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleOpenDeleteConfirm(tool.toolID)}
                          startIcon={<DeleteIcon />}
                          style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={toolsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Tool</DialogTitle>
        <DialogContent>
          <TextField
            name="toolType"
            label="Tool type"
            type="text"
            value={currentTool.toolType}
            onChange={handleModalInputChange}
            fullWidth
            margin="normal"
            InputProps={{ style: { borderRadius: '4px', border: '1px solid #ccc' } }}
          />
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={currentTool.quantity}
            onChange={handleModalInputChange}
            fullWidth
            margin="normal"
            InputProps={{ style: { borderRadius: '4px', border: '1px solid #ccc' } }}
          />
          <FormControl fullWidth margin="normal">
            <Select
              name="id"
              value={currentTool.id}
              onChange={handleModalInputChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="" disabled={true}>
                Select Client Site
              </MenuItem>
              {clientSites.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalUpdate} color="primary" variant="contained">Update</Button>
          <Button onClick={handleClose} color="secondary" variant="contained">Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDelete}
        onClose={handleCloseDeleteConfirm}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this tool?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary" variant="contained">Yes</Button>
          <Button onClick={handleCloseDeleteConfirm} color="secondary" variant="contained">No</Button>
        </DialogActions>
      </Dialog>
      {/* <Footer /> */}
    </div>
  );
};

export default Tools;
