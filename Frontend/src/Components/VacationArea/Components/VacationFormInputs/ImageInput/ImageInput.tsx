import  {Grid, InputAdornment, TextField, Typography}  from "@mui/material";
import "./ImageInput.css";
import { useForm } from "react-hook-form";
import { VacationModel } from "../../../../../Models/VacationModel";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import React from "react";

export interface ImageInputProps {
  register: ReturnType<typeof useForm<VacationModel>>["register"];
  fileRef: React.Ref<any>;
  onImageChange: (event: any) => void;
  isImage: boolean;
  image: string | null;
  clearImage: () => void;
  required?: boolean;
}

function ImageInput({
  register,
  fileRef,
  onImageChange,
  isImage,
  image,
  clearImage,
  required,
}: ImageInputProps): JSX.Element {
  return (
    <Grid item xs={12} className="cover-image-container">
      <Typography component="h1" color={"black"} variant="h6">
        Cover Image
      </Typography>
      <TextField
        name="cover-image"
        required={required}
        fullWidth
        id="coverImage"
        type="file"
        autoFocus
        className="input-image"
        inputRef={fileRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end" className="input-adornment">
              <PhotoCameraIcon fontSize="large" />
              Cover Image
            </InputAdornment>
          ),
          className: "input-adornment-container",
        }}
        {...register("image")}
        onChange={onImageChange}
      />
      <div className="delete-icon-container" onClick={clearImage}>
        <DeleteRoundedIcon
          htmlColor="gray"
          fontSize="large"
          color="action"
          className="delete-icon"
        />
      </div>
      {isImage && <img className="upload-image" src={image} alt="vacationImage" />}
    </Grid>
  );
}

export default ImageInput;
