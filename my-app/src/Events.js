import React, { useEffect, useState } from "react";
import {
  Button, TextField, Grid, Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyrightFooter from "./Footer";
import axios from "axios";
import Home from "./Home";

const Events = () => {
  const [toolsData, setToolsData] = useState([]);
  const [countTools, setCountTools] = useState(0);
  const [tools, setTools] = useState({
    toolName: '',
    quantity: '',
    availabilityStatus: '',
  });

  // APIs
  const LIST_API = 'http://localhost:8080/api/v1/list/tools';
  const ADD_API = 'http://localhost:8080/api/v1/save/tools';
  const COUNT_API = 'http://localhost:8080/api/v1/count/tools';
  const DELETE_API = 'http://localhost:8080/api/v1/delete/tools';
  const UPDATE_API = 'http://localhost:8080/api/v1/update/tools';

  useEffect(() => {
    fetchData();
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

  const handleAddData = async () => {
    try {
      const response = await axios.post(ADD_API, tools);
      setToolsData([...toolsData, response.data]);
      setTools({
        toolName: '',
        quantity: '',
        availabilityStatus: ''
      });
      console.log('Tools saved successfully:', response.data);
    } catch (error) {
      console.error('Error while saving tools:', error);
    }
  };

  const handleUpdateData = async (toolID, updatedTool) => {
    try {
      // Make PUT request to the update API
      const response = await axios.put(`${UPDATE_API}/${toolID}`, updatedTool);

      // Update the toolsData state
      const updatedToolsData = toolsData.map(tool =>
        tool.toolID === toolID ? { ...tool, ...response.data } : tool
      );
      setToolsData(updatedToolsData);

      console.log('Tool updated successfully:', response.data);
    } catch (error) {
      console.error('Error while updating tool:', error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`${DELETE_API}/${id}`);
      setToolsData(toolsData.filter(tool => tool.toolID !== id));
    } catch (error) {
      console.error('Error while deleting tool:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTools({ ...tools, [name]: value });
  };

  return (
    <div style={{ padding: '50px', margin:'auto', backgroundColor: 'whitesmoke', width:'100%' }}>
      {/* Home component */}
      <Home />
      <Grid container spacing={3} item xs={8} style={{ margin: 'auto' }}>
        {/* Form for adding tools */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} style={{ padding: '20px', backgroundColor: 'white' }}>
            <Typography variant="h5" style={{ fontWeight: 'bold', backgroundColor: 'green', color: 'white', textAlign: 'center', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
              Cleaners Tools
            </Typography>
            <form>
              <Typography variant="body1" style={{ marginBottom: '15px', textAlign: 'center', padding: '10px', backgroundColor: 'whitesmoke', borderRadius: '4px' }}>
                View Number of Tools: {countTools}
              </Typography>
              {/* Tool Name */}
              <FormControl fullWidth margin="normal">
                <select name="toolName" value={tools.toolName} onChange={handleInputChange} style={{ width: '100%', padding: '8px' }}>
                  <option value="">Select Tools</option>
                  {toolsData.map(tool => (
                    <option key={tool.toolID} value={tool.toolName}>
                      {tool.toolName}
                    </option>
                  ))}
                </select>
              </FormControl>
              {/* Quantity */}
              <TextField
                name="quantity"
                label="Quantity"
                type="number"
                value={tools.quantity}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              {/* Availability Status */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Availability Status</InputLabel>
                <Select
                  name="availabilityStatus"
                  value={tools.availabilityStatus}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px' }}>
                  <MenuItem style={{ fontWeight: 'bolder', backgroundColor: 'green' }} value="Available">Available</MenuItem>
                  <MenuItem style={{ fontWeight: 'bolder', backgroundColor: 'lightgreen', color: '#334' }} value="Not Available">Not Available</MenuItem>
                </Select>
              </FormControl>
              {/* Add Tool Button */}
              <Button onClick={handleAddData} variant="contained" color="primary" fullWidth style={{ marginTop: '20px', fontWeight: 'bolder', height: '100%' }}>
                Add Tool
              </Button>
            </form>
          </Paper>
        </Grid>
        {/* Right Column - Image and Description */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} style={{ padding: '20px', textAlign: 'center', backgroundColor: 'white' }}>
            <img
              src="https://images.pexels.com/photos/5231086/pexels-photo-5231086.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Image"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <Typography variant="h5" style={{ marginTop: '15px', fontWeight: 'medium' }}>
              Manage Cleaner Tools
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Different tools are well-organized and easily accessible for the cleaners in various departments
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Different tools are well-organized and easily accessible for the cleaners in various departments
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Different tools are well-organized and easily accessible 
            </Typography>
          </Paper>
        </Grid>
        {/* Tools Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '25px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Tool Id</TableCell>
                  <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Tool Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Quantity</TableCell>
                  <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Availability</TableCell>
                  <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Update</TableCell>
                  <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toolsData.map(tool => (
                  <TableRow key={tool.toolID}>
                    <TableCell>{tool.toolID}</TableCell>
                    <TableCell>{tool.toolName}</TableCell>
                    <TableCell>{tool.quantity}</TableCell>
                    <TableCell>{tool.availabilityStatus}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => handleUpdateData(tool.toolID, { toolName: tool.toolName, quantity: tool.quantity, availabilityStatus: tool.availabilityStatus })} style={{ marginRight: '5px' }}>
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" color="secondary" startIcon={<DeleteIcon style={{ color: 'red' }} />} onClick={() => handleDeleteData(tool.toolID)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <CopyrightFooter />
    </div>
  );
};

export default Events;
