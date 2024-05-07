import React from "react"
import Home from "./Home";
import { Button, TextField, Grid, Paper, Typography, FormControl, Input } from '@mui/material';
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
      maxWidth: '50%', // Adjusted width to fit different screen sizes
      overflowX: 'auto', // Added for horizontal scrolling on small screens
    },
    heading: {
      fontSize: '24px',
      color: '#333',
      backgroundColor: '#f5f5f5',
      padding: '10px',
      border: '1px solid #ccc',
      textAlign: 'center',
      margin: 'auto',
      maxWidth: 'fit-content',
    },
    addForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    addRow: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    }
  };

  const styleHeading = {
    color: 'white',
    backgroundColor: 'black',
    fontWeight: 'bold',
    fontSize: '15px'
  }

  const handleAdd = () => {
    return 'Add functionality';
  }
  const handleUpdate = () => {
    return 'Update functionality';
  }
  const handleDelete = () => {
    return 'Delete functionality';
  }

  return (
    <div style={{ margin: 'auto', padding: '60px', backgroundColor: 'rgba(73, 161, 157, 0.3)' }}>
      <Home />
      <h2 style={styles.heading}>Cleaners Claims List</h2>
      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ ...styleHeading }}>Claims Id</TableCell>
              <TableCell style={{ ...styleHeading }}>Description</TableCell>
              <TableCell style={{ ...styleHeading }}>Date Submitted</TableCell>
              <TableCell style={{ ...styleHeading }}>Cleaners Id</TableCell>
              {/* <TableCell style={{ ...styleHeading }}>Description</TableCell> */}
              <TableCell style={{ ...styleHeading }}>Status</TableCell>
              <TableCell style={{ ...styleHeading }}>Actions</TableCell> {/* Combined action cells */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>
                {/* <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleUpdate} 
                >
                  Update
                </Button> */}
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete} // Define handleDelete function
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <h2 style={styles.heading}>Staffs Claims List</h2>
      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ ...styleHeading }}>Claims Id</TableCell>
              <TableCell style={{ ...styleHeading }}>Description</TableCell>
              <TableCell style={{ ...styleHeading }}>Date Submitted</TableCell>
              <TableCell style={{ ...styleHeading }}>Staffs Id</TableCell>
              {/* <TableCell style={{ ...styleHeading }}>Description</TableCell> */}
              <TableCell style={{ ...styleHeading }}>Status</TableCell>
              <TableCell style={{ ...styleHeading }}>Actions</TableCell> {/* Combined action cells */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>
                {/* <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleUpdate} 
                >
                  Update
                </Button> */}
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete} // Define handleDelete function
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <br /> */}
      <CopyrightFooter />
    </div>
  );
}

export default Users;
