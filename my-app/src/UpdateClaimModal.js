import React, { useState, useEffect } from "react";
import {
    Modal, Backdrop, Fade, TextField, Button, FormControl, FormLabel
} from "@material-ui/core";

const UpdateClaimModal = ({ open, handleClose, claim, handleUpdate }) => {
    const [claimsDescription, setClaimsDescription] = useState('');
    const [submissionDate, setSubmissionDate] = useState('');

    // Update form fields whenever the claim prop changes
    useEffect(() => {
        if (claim) {
            setClaimsDescription(claim.description);  // Make sure to use the correct field name, 'description'
            setSubmissionDate(claim.submissionDate);  // 'submissionDate' should match the backend field
        }
    }, [claim]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (claim) {
            handleUpdate(claim.complainID, claimsDescription, submissionDate);
            handleClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
                    <h2>Update Claim</h2>
                    <form onSubmit={handleSubmit}>
                        <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
                            <FormLabel component="legend">Claim Description</FormLabel>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="claimsDescription"
                                name="claimsDescription"
                                value={claimsDescription}
                                onChange={(e) => setClaimsDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
                            <FormLabel component="legend">Submission Date</FormLabel>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="date"
                                id="submissionDate"
                                name="submissionDate"
                                value={submissionDate}
                                onChange={(e) => setSubmissionDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
};

export default UpdateClaimModal;
