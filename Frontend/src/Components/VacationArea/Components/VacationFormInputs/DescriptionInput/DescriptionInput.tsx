import { Grid, TextareaAutosize, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../../../Models/VacationModel";
import "./DescriptionInput.css";

interface Props {
  register: ReturnType<typeof useForm<VacationModel>>["register"];
}

function DescriptionInput({ register }: Props): JSX.Element {
  return (
    <Grid item xs={12}>
      <Typography component="h1" color={"black"} variant="h6">
        Description
      </Typography>
      <TextareaAutosize
        minRows={"4"}
        style={{
          resize: "vertical",
          overflow: "auto",
          maxHeight: 70,
          width: "100%",
        }}
        minLength={30}
        maxLength={500}
        required
        placeholder="Description..."
        className="text-area"
        {...register("description")}
      />
    </Grid>
  );
}

export default DescriptionInput;
