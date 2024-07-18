import { Grid, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import { useForm } from "react-hook-form";
import { FaDeleteLeft } from "react-icons/fa6";
import { VacationModel } from "../../../../../Models/VacationModel";
import "./DateInput.css";

export interface DateInputProps {
  registerInput: ReturnType<typeof useForm<VacationModel>>["register"];
  date: Date;
  setDate: (date: Date | null) => void;
  clearDate: () => void;
  header: string;
  minDate: Date | null;
  maxDate?: Date | null
  allowPastDates?: boolean;
  disabled?: boolean;
  registerName: "startDate" | "endDate";
}

function DateInput({
  date,
  setDate,
  clearDate,
  registerInput,
  header,
  minDate,
  disabled,
  registerName,
  maxDate
}: DateInputProps): JSX.Element {
  return (
    <Grid item xs={12} className="grid-container-end-date">
      <Typography component="h1" color={"black"} variant="h6">
        {header}
      </Typography>

      <DatePicker
        className="date-picker"
        placeholderText="DD-MM-YYYY"
        dateFormat={"dd-MM-YYYY"}
        showIcon
        withPortal
        minDate={minDate}
        selected={date}
        disabled={disabled}
        maxDate={maxDate}
        required
        autoComplete="off"
        {...registerInput(registerName)}
        onChange={setDate}
      />
      <div className="delete-date-icon" onClick={clearDate}>
        <FaDeleteLeft fill="gray" fontSize={"large"} />
      </div>
    </Grid>
  );
}

export default DateInput;
