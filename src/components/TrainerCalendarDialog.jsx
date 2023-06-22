import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCalendar } from "state";

const TrainerCalendarDialog = ({ isOpened, handleClose }) => {
    const dispatch = useDispatch();
    const { calendarIframe } = useSelector((state) => state.user);

    console.log("IFrame");
    console.log(calendarIframe);

    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);



    const role = useSelector((state) => state.role);
    const isMember = useSelector((state) => state.isMember);
    const [text, setText] = useState(calendarIframe);

    const handleEdit = async () => {
        console.log("Handle edit");
        console.log(text);

        // check empty string or calendar -- ok
        if (!text || text.includes("https://calendar.google.com/calendar")) {

            const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers/${_id}/calendar`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({calendarIframe: text})
            });

            const data = await response.json();

            console.log(data);

            dispatch(setCalendar({calendarIframe: data.calendarIframe}));
        }
        else {
            setText("");
        }

        // else don't save anything and allow to close dialog
        handleClose();
    }

    return (
        <Dialog open={isOpened} onClose={handleClose}>
            <DialogTitle>Edit Calendar iframe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To edit Calendar iframe, please paste your copied `iframe src` without `style` from Google Calendar.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Calendar iframe"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={text}
                    onChange={e => {
                        setText(e.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleEdit}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TrainerCalendarDialog;
