import React, { useState } from "react";
import {
    Modal, Backdrop, Fade, TextField, Button, FormControl, FormLabel
} from "@material-ui/core";

const UpdateClaimModal = ({ open, handleClose, claim, handleUpdate }) => {
    const initialDescription = claim ? claim.claimsDescription : '';
    const initialDate = claim ? claim.submissionDate : '';

    const [claimsDescription, setClaimsDescription] = useState(initialDescription);
    const [submissionDate, setSubmissionDate] = useState(initialDate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (claim) {
            handleUpdate(claim.claimID, claimsDescription, submissionDate);
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
