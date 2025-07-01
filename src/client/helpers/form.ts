import { createTheme, type SxProps } from "@mui/material/styles";
import type { AnyFieldApi } from "@tanstack/react-form";
import dayjs from "dayjs";

export const getFieldError = (field: AnyFieldApi) => {
  return field.state.meta.isTouched && !field.state.meta.isValid
    ? field.state.meta.errors.join(", ")
    : undefined;
};

export const convertDate = (field: AnyFieldApi, fallback?: string) => {
  if (!field.state.value) field.setValue(fallback || dayjs().format("YYYY-MM-DD"));
  return dayjs(field.state.value || fallback);
};

export const datePickerTheme = createTheme({ palette: { mode: "dark" } });

export const textFieldSx: SxProps = {
  minWidth: "19rem",
  width: "100%",
  "& .MuiInputBase-input": {
    color: "#ffffff",
    padding: "14px",
  },
  "& .MuiInputLabel-root": {
    color: "#cdd7e1",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#ffffff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#cdd7e1",
    },
    "&:hover fieldset": {
      borderColor: "#cdd7e1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0b6bcb",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#acafb4",
    opacity: 1,
  },
};

export const textAreaSx: SxProps = {
  width: "100%",
  minWidth: "19rem",
  color: "#ffffff",
  backgroundColor: "transparent",
  padding: "14px",
};

export const buttonSx: SxProps = {
  fontSize: "1.25rem",
  padding: "0.5rem 2rem",
  width: "10rem",
};
