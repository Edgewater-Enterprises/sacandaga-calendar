import { Textarea } from "@mui/joy";
import { Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import dayjs from "dayjs";

import { Label } from "@client/components/Label";

const getFieldError = (field: AnyFieldApi) => {
  return field.state.meta.isTouched && !field.state.meta.isValid
    ? field.state.meta.errors.join(", ")
    : undefined;
};

const convertDate = (field: AnyFieldApi, fallback?: string) => {
  if (!field.state.value) field.setValue(fallback || dayjs().format("YYYY-MM-DD"));
  return dayjs(field.state.value || fallback);
};

const theme = createTheme({ palette: { mode: "dark" } });

export const AddEvent = ({ start }: { start?: string }) => {
  const form = useForm({
    defaultValues: {
      title: "",
      start: "",
      end: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="modal-content">
      <h1>Add Stay</h1>
      <form
        className="form-content"
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) => (!value ? "Required" : undefined),
          }}
        >
          {field => {
            const error = getFieldError(field);

            return (
              <div className="labelled-field">
                <Label htmlFor={field.name} error={error} isRequired>
                  Title
                </Label>
                <TextField
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  type="text"
                  variant="outlined"
                  spellCheck={false}
                  autoComplete="off"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      color: "#ffffff",
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
                  }}
                />
              </div>
            );
          }}
        </form.Field>
        <form.Field
          name="start"
          validators={{
            onChange: ({ value }) => {
              return !value ? "Required" : undefined;
            },
          }}
        >
          {field => {
            const error = getFieldError(field);

            const dateValue = convertDate(field, start);

            return (
              <div className="labelled-field">
                <Label htmlFor={field.name} error={error} isRequired>
                  Arrive
                </Label>
                <ThemeProvider theme={theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name={field.name}
                      value={dateValue}
                      onChange={pickerDate => {
                        const date = pickerDate ? pickerDate.format("YYYY-MM-DD") : "";
                        field.handleChange(date);
                      }}
                      format="YYYY-MM-DD"
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            );
          }}
        </form.Field>
        <form.Field
          name="end"
          validators={{
            onChange: ({ value }) => {
              return !value ? "Required" : undefined;
            },
          }}
        >
          {field => {
            const error = getFieldError(field);

            const dateValue = convertDate(field, start);

            return (
              <div className="labelled-field">
                <Label htmlFor={field.name} error={error} isRequired>
                  Depart
                </Label>
                <ThemeProvider theme={theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name={field.name}
                      value={dateValue}
                      onChange={pickerDate => {
                        const date = pickerDate ? pickerDate.format("YYYY-MM-DD") : "";
                        field.handleChange(date);
                      }}
                      format="YYYY-MM-DD"
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            );
          }}
        </form.Field>
        <form.Field
          name="description"
          validators={{
            onBlur: ({ value }) => (value.length > 500 ? "500 characters max" : undefined),
          }}
        >
          {field => {
            const error = getFieldError(field);

            return (
              <div className="labelled-field">
                <Label htmlFor={field.name} error={error}>
                  Notes
                </Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  minRows={4}
                  maxRows={4}
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            );
          }}
        </form.Field>
        <Button
          size="large"
          variant="contained"
          sx={{
            fontSize: "1.25rem",
            padding: "0.5rem 2rem",
          }}
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
};
