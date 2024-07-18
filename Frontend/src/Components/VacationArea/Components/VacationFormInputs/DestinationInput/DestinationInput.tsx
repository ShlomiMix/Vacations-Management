import { Grid, TextField, Typography } from "@mui/material";
import "./DestinationInput.css";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../../../Models/VacationModel";

interface Props {
  register: ReturnType<typeof useForm<VacationModel>>["register"];
}

function DestinationInput({ register }: Props): JSX.Element {
  return (
    <Grid item xs={12}>
      <Typography component="h1" color={"black"} variant="h6">
        Destination
      </Typography>
      <TextField
        name="destination"
        required
        fullWidth
        placeholder="Destination..."
        type="text"
        autoFocus
        inputProps={{ minLength: 2, maxLength: 50 }}
        {...register("destination")}
      />
    </Grid>
  );
}

export default DestinationInput;
