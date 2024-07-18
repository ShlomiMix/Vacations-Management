import { Button, ButtonGroup, Modal as MuiModal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import "./Modal.css";

interface Props {
  open: boolean;
  handleClose: () => void;
  confirm: () => void;
  cancel: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Modal({ handleClose, open, confirm, cancel }: Props): JSX.Element {
  return (
    <div className="Modal">
      <MuiModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Confirm deleting
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Are you sure do you want to delete this vacation ?
            </Typography>
            <ButtonGroup>
              <Button onClick={confirm}>Ok</Button>
              <Button onClick={cancel}>Cancel</Button>
            </ButtonGroup>
          </Box>
        </Fade>
      </MuiModal>
    </div>
  );
}

export default Modal;
