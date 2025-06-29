import { ColorPicker } from "@client/components/ColorPicker";
import { Label } from "@client/components/Label";
import { invalidateEvents, submitAddEvent, submitEditEvent } from "@client/helpers/api";
import { convertDate, datePickerTheme, getFieldError } from "@client/helpers/form";
import { useModal } from "@client/hooks/useModal";
import { Textarea } from "@mui/joy";
import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { EventColor } from "@shared/constants";
import type { TAddEvent, TEvent } from "@shared/types";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const EventForm = ({
  id,
  title,
  start,
  end,
  description,
  background_color,
}: Partial<TEvent>) => {
  const isEdit = !!id;

  const form = useForm({
    defaultValues: {
      title: title ?? "",
      start: start ?? "",
      end: end ?? "",
      description: description ?? "",
      background_color: background_color ?? EventColor.Blue,
    },
    onSubmit: async ({ value }) => handleSubmit(value),
  });

  const { closeModal } = useModal();

  const { mutate: handleSubmit, isPending } = useMutation<void, Error, TAddEvent>({
    mutationFn: async event => {
      if (isEdit) {
        await submitEditEvent({ id, ...event });
      } else {
        await submitAddEvent(event);
      }
    },
    onSuccess: async () => {
      closeModal();
      toast.success(`Stay ${isEdit ? "updated" : "added"}`);
    },
    onSettled: async () => await invalidateEvents(),
  });

  return (
    <div className="modal-content">
      <h1>{isEdit ? "Edit" : "Add"} Stay</h1>
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
                <ThemeProvider theme={datePickerTheme}>
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
                <ThemeProvider theme={datePickerTheme}>
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
        <form.Field name="background_color">
          {field => {
            return (
              <div className="labelled-field">
                <Label htmlFor={field.name}>Color</Label>
                <ColorPicker
                  selectedColor={field.state.value}
                  onChange={color => field.handleChange(color)}
                />
              </div>
            );
          }}
        </form.Field>
        <div style={{ display: "flex", justifyContent: "center", columnGap: "1rem" }}>
          <Button
            size="large"
            variant="outlined"
            sx={{
              fontSize: "1.25rem",
              padding: "0.5rem 2rem",
              width: "10rem",
            }}
            disabled={isPending}
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            sx={{
              fontSize: "1.25rem",
              padding: "0.5rem 2rem",
              width: "10rem",
            }}
            type="submit"
            disabled={isPending}
          >
            {isPending ? <CircularProgress sx={{ color: "white" }} size={36} /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};
