import React, { useEffect, useState } from "react";
import {
  Button, TextField, Grid, Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, FormControl, TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Home from "./Home";
import Footer from "../Footer";

const Tools = () => {
  const [toolsData, setToolsData] = useState([]);
  const [countTools, setCountTools] = useState(0);
  const [tools, setTools] = useState({
    toolType: '',
    quantity: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
        toolType: '',
        quantity: '',
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ margin: 'auto', width: '80%', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Home />

      <Grid container spacing={3} style={{ margin: 'auto' }}>
        <Grid style={{ margin: 'auto' }}>
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
                  }}>View Number of Tools: {countTools}
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
                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Update</TableCell>
                    <TableCell style={{ fontWeight: 'bold', backgroundColor: '#334', color: 'white' }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toolsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tool, index) => (
                    <TableRow key={tool.toolID}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{tool.toolType}</TableCell>
                      <TableCell>{tool.quantity}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<EditIcon />}
                          onClick={() => handleUpdateData(tool.toolID, { toolType: tool.toolType, quantity: tool.quantity })}
                          style={{ marginRight: '5px' }}
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<DeleteIcon style={{ color: 'red' }} />}
                          onClick={() => handleDeleteData(tool.toolID)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
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

      <Footer />
    </div>
  );
};

export default Tools;
