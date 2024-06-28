import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TablePagination
} from '@material-ui/core';
import '../styles/sidebar.css';
import UpdateClaimModal from "../UpdateClaimModal";
import Home from "./Home"

const StaffComplain = () => {

  const [claimsDescription, setClaimsDescription] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [claims, setClaims] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can change this as per your preference

  const style = {
    table: {
      backgroundColor: 'black',
      color: 'white',
      fontWeight: 'bold'
    }
  }

  useEffect(() => {
    fetchComplains();
    fetchStaffs();
  }, []);

  const fetchComplains = () => {
    fetch('http://localhost:8080/api/v1/list/StaffComplain')
      .then(response => response.json())
      .then(data => {
        setClaims(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching complains:', error));
  };
  const fetchStaffs = () => {
    fetch('http://localhost:8080/api/v1/staffs/list')
      .then(response => response.json())
      .then(data => {
        setStaffs(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching staffs:', error));
  };

  const saveAPI = 'http://localhost:8080/api/v1/save/StaffComplain';
  const deleteAPI = 'http://localhost:8080/api/v1/delete/StaffComplain';
  const updateAPI = 'http://localhost:8080/api/v1/update/StaffComplain';

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      claimsDescription: claimsDescription,
      submissionDate: submissionDate,
    };

    fetch(saveAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setClaims([...claims, data]);
        console.log(data);
      })
      .catch(error => console.error('Error saving complains:', error));

    // Reset form fields
    setClaimsDescription('');
    setSubmissionDate('');
    setSelectedStaff('');
  };

  const handleDelete = (id) => {
    fetch(deleteAPI + id, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted claim from the list
          setClaims(claims.filter(claim => claim.claimID !== id));
        } else {
          console.error('Error deleting complain:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting complain:', error));
  };

  const handleUpdate = (id, description, date) => {
    const data = {
      claimsDescription: description,
      submissionDate: date,
    };

    fetch(updateAPI + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          // Updated successfully, update the claim in state
          const updatedClaims = claims.map(claim => {
            if (claim.claimID === id) {
              return { ...claim, claimsDescription: description, submissionDate: date };
            }
            return claim;
          });
          setClaims(updatedClaims);
          console.log('Claim updated successfully');
        } else {
          console.error('Error updating complain:', response.statusText);
        }
      })
      .catch(error => console.error('Error updating complain:', error));
  };

  const handleOpenModal = (claim) => {
    setSelectedClaim(claim);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ margin: 'auto', marginTop: '80px', width: '950px' }}>
      <Home />
      <div>
        <br /><br />
        <div style={{ margin: 'auto', backgroundColor: 'whitesmoke' }}>
          <h4 style={{ margin: 'auto', width: '25%', fontWeight: 'bold' }}>Submitted Complains</h4>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={style.table}>S/N</TableCell>
                  <TableCell style={style.table}>Description</TableCell>
                  <TableCell style={style.table}>Date Submitted</TableCell>
                  <TableCell style={style.table}>Staff Name</TableCell>
                  <TableCell style={style.table}>Update</TableCell>
                  <TableCell style={style.table}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((claim, index) => (
                  <TableRow key={claim.complainID}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{claim.description}</TableCell>
                    <TableCell>{claim.submissionDate}</TableCell>
                    <TableCell>{claim.staffs ? claim.staffs.StaffName : 'N/A'}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenModal(claim)}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(claim.claimID)}
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
              count={claims.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>
      {/* Update Complain Modal */}
      {selectedClaim && <UpdateClaimModal
        open={openModal}
        handleClose={handleCloseModal}
        claim={selectedClaim}
        handleUpdate={handleUpdate}
      />}
    </div>
  );
}

export default StaffComplain;
