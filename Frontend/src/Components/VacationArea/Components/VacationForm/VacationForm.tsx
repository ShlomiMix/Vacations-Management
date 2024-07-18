import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../../Models/VacationModel";
import "./VacationForm.css";
import ImageInput, {
  ImageInputProps,
} from "../VacationFormInputs/ImageInput/ImageInput";
import DescriptionInput from "../VacationFormInputs/DescriptionInput/DescriptionInput";
import DateInput from "../VacationFormInputs/DateInput/DateInput";
import DestinationInput from "../VacationFormInputs/DestinationInput/DestinationInput";
import PriceInput from "../VacationFormInputs/PriceInput/PriceInput";

interface Props extends ImageInputProps {
  submit: () => void;
  register: ReturnType<typeof useForm<VacationModel>>["register"];
  clearStartDate: () => void;
  startDate: Date | null;
  handleChangeStartDateValue: (date: Date | null) => void;
  clearEndDate: () => void;
  endDate: Date | null;
  handleChangeEndDateValue: (date: Date | null) => void;
  clearDatesAndImage: () => void;
  allowPastDates?: boolean;
  requiredImage?: boolean;
  buttonText: string;
  maxDate?: Date | null
}

function VacationForm({
  submit,
  register,
  clearImage,
  fileRef,
  image,
  isImage,
  onImageChange,
  clearDatesAndImage,
  clearEndDate,
  clearStartDate,
  endDate,
  handleChangeEndDateValue,
  handleChangeStartDateValue,
  startDate,
  allowPastDates,
  requiredImage,
  buttonText,
  maxDate
}: Props): JSX.Element {
  const defaultTheme = createTheme();

  return (
    <div className="VacationForm">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              color={"white"}
              sx={{ mt: 3 }}
              bgcolor={"white"}
              width={400}
              onSubmit={submit}
            >
              <Grid container spacing={1}>
                <DestinationInput register={register} />
                <DescriptionInput register={register} />
                <DateInput
                  header="Start on"
                  registerInput={register}
                  clearDate={clearStartDate}
                  date={startDate}
                  setDate={handleChangeStartDateValue}
                  minDate={allowPastDates ? null : new Date()}
                  maxDate={endDate}
                  registerName="startDate"
                />
                <DateInput
                  header="End on"
                  registerInput={register}
                  clearDate={clearEndDate}
                  date={endDate}
                  setDate={handleChangeEndDateValue}
                  minDate={startDate}
                  disabled={!startDate}
                  registerName="endDate"
                />

                <PriceInput register={register} />
                <ImageInput
                  register={register}
                  fileRef={fileRef}
                  clearImage={clearImage}
                  image={image}
                  isImage={isImage}
                  onImageChange={onImageChange}
                  required={requiredImage}
                />
              </Grid>
              <Link href="/list">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {buttonText}
                </Button>
              </Link>
              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    type="reset"
                    color="secondary"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                    onClick={clearDatesAndImage}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default VacationForm;
