import { createTheme } from "@mui/material/styles";
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
