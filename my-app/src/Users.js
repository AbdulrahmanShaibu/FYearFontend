import React from "react"
import Home from "./Home";
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CopyrightFooter from "./Footer";
const Users = () => {

  const styles = {
    tableContainer: {
      margin: 'auto',
      width: 'fit-content',
    },
  };

  return (
    <div style={{ margin: 'auto', marginTop: '300px', backgroundColor: 'rgba(73, 161, 157, 0.3)' }}>
      <Home />
      <h2 style={
        {
          fontSize: '24px',
          color: '#333',
          backgroundColor: '#f5f5f5',
          padding: '10px',
          border: '1px solid #ccc',
          textAlign: 'center',
          margin: 'auto',
          width: 'fit-content'
        }
      }>List Of All Registered Users</h2>
      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>New Column</TableCell>
              <TableCell>Update Row</TableCell>
              <TableCell>Delete Row</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow >
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                // onClick={() => handleUpdate(user.id)}
                >
                  Update
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="secondary" // Change the color to red or any other suitable color for deletion
                  startIcon={<DeleteIcon />}
                // onClick={() => handleDelete(user.id)} // Define handleDelete function
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="secondary" // Change the color to red or any other suitable color for deletion
                  startIcon={<AddIcon />}
                // onClick={() => handleDelete(user.id)} // Define handleDelete function
                >
                  Add New User
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <CopyrightFooter />
    </div>
  );
}
export default Users;