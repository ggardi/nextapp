import { TextField } from "@mui/material";

export const InputField = ({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
  }) => (
   
      <TextField
        fullWidth
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
        label={label}
        error={!!error}
        helperText={error || " "}
        variant="outlined"
      />
  );
  