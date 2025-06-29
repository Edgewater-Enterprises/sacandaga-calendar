import { Label } from "@client/components/Label";
import { isBearerTokenValid } from "@client/helpers/api";
import { getFieldError } from "@client/helpers/form";
import { useAuth } from "@client/hooks/useAuth";
import { useModal } from "@client/hooks/useModal";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const Login = () => {
  const form = useForm({
    defaultValues: {
      password: "",
    },
    onSubmit: async ({ value }) => handleSubmit(value),
  });

  const { closeModal } = useModal();

  const { setToken, setIsAdmin } = useAuth();

  const {
    mutate: handleSubmit,
    isPending,
    error: loginError,
  } = useMutation<void, Error, { password: string }>({
    mutationFn: async ({ password }) => {
      const isValid = await isBearerTokenValid(password);
      if (!isValid) throw new Error("Invalid password");
      setToken(password);
    },
    onSuccess: () => {
      setIsAdmin(true);
      closeModal();
      toast.success("You are now logged in");
    },
  });

  return (
    <div className="modal-content">
      <h1>Log In</h1>
      <p>Logging in allows you to add, edit, and delete stays.</p>
      <form
        className="form-content"
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => (!value ? "Required" : undefined),
          }}
        >
          {field => {
            const error = getFieldError(field) ?? loginError?.message;

            return (
              <div className="labelled-field">
                <Label htmlFor={field.name} error={error} isRequired>
                  Password
                </Label>
                <TextField
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  type="password"
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
            {isPending ? <CircularProgress sx={{ color: "white" }} size={36} /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};
