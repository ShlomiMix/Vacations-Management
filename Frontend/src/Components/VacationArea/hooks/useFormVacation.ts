import { useRef, useState } from "react";

export const useFormVacation = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [image, setCurrentImage] = useState<string | null>(null);
  const [isImage, setIsImage] = useState<boolean>(false);
  const fileRef = useRef(null);

  // Define a function to format a date object into a string in the format "YYYY-MM-DD"
  function formatDate(date: Date | null): string {
    // Return an empty string if the date is null
    if (!date) {
      return "";
    }

    // Extract day, month, and year from the date object and pad them with leading zeros if necessary
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    // Return the formatted date string in the "YYYY-MM-DD" format
    return `${year}-${month}-${day}`;
  }

  function clearStartDate() {
    setStartDate(null);
  }

  function clearEndDate() {
    setEndDate(null);
  }

  function handleChangeStartDateValue(date: Date | null) {
    setStartDate(date);
  }

  function handleChangeEndDateValue(date: Date | null) {
    setEndDate(date);
  }

  function clearDatesAndImage() {
    setEndDate(null);
    setStartDate(null);
    setCurrentImage(null);
    setIsImage(false);
  }

  function clearImage() {
    if (fileRef.current) {
      fileRef.current.value = null;
      setCurrentImage(null);
      setIsImage(false);
    }
  }

  function onImageChange(image: any): void {
    if (image.target.files && image.target.files[0]) {
      setCurrentImage(URL.createObjectURL(image.target.files[0]));
      setIsImage(true);
    }
  }

  function onImageLoad(imageUrl: string): void {
    if (imageUrl) {
      setCurrentImage(imageUrl);
      setIsImage(true);
    }
  }

  return {
    formatDate,
    clearStartDate,
    clearEndDate,
    handleChangeStartDateValue,
    handleChangeEndDateValue,
    clearDatesAndImage,
    clearImage,
    onImageChange,
    fileRef,
    startDate,
    endDate,
    isImage,
    image,
    setEndDate,
    setStartDate,
    setIsImage,
    onImageLoad,
  };
};
