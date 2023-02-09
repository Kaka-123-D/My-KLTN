import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";

interface IProps {
  name: string;
  label?: string;
  required?: boolean;
  control: any;
  errors?: any;
  maxLength?: number;
  rows?: number;
  type?: string;
  disabled?: boolean;
  defaultValue?: any;
}

const CustomTextField = (props: IProps) => {
  const {
    name,
    label,
    required,
    control,
    errors,
    maxLength,
    rows,
    type,
    disabled,
    defaultValue = null,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <TextField
            disabled={disabled}
            label={label}
            className="w-100"
            onChange={onChange}
            value={value ?? ""}
            error={!!errors[`${name}`]?.message}
            helperText={errors[`${name}`]?.message}
            required={required}
            multiline={!!rows}
            rows={rows}
            type={type}
            defaultValue={defaultValue}
            inputProps={{
              maxLength: maxLength,
            }}
          />
        </>
      )}
    />
  );
};

export default CustomTextField;
