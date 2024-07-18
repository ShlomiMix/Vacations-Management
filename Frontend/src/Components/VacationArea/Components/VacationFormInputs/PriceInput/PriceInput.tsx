import { Grid, TextField, Typography } from "@mui/material";
import "./PriceInput.css";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../../../Models/VacationModel";

interface Props {
  register: ReturnType<typeof useForm<VacationModel>>["register"];
}

function PriceInput({ register }: Props): JSX.Element {
  return (
    <Grid item xs={12}>
      <Typography component="h1" color={"black"} variant="h6">
        Price
      </Typography>
      <TextField
        name="vacation-price"
        required
        fullWidth
        placeholder="$"
        type="number"
        autoFocus
        InputProps={{ inputProps: { min: 0, max: 10000, step: "0.01" } }}
        {...register("price")}
      />
    </Grid>
  );
}

export default PriceInput;
