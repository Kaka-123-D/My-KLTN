import { Controller } from "react-hook-form";

import { Autocomplete, InputAdornment, TextField } from "@mui/material";

interface IProps {
  name: string;
  label?: string;
  required?: boolean;
  control: any;
  errors?: any;
  clearErrors?: any;
  listOptions: any;
  getOptionLabel: (option: any) => any;
  customRenderOption: (option: any) => React.ReactElement;
  onChange: (option: any) => void;
  defaultValue?: any;
  className?: string;
  placeholder?: string;
}

const CustomAutocomplete = (props: IProps) => {
  const {
    name,
    label,
    required,
    control,
    errors,
    listOptions,
    getOptionLabel,
    customRenderOption,
    onChange,
    clearErrors,
    defaultValue,
    className = "",
    placeholder,
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <Autocomplete
          onChange={(e, option) => {
            onChange(option);
            if (option && clearErrors) clearErrors(name);
          }}
          defaultValue={defaultValue ?? null}
          options={listOptions ?? []}
          getOptionLabel={getOptionLabel}
          renderOption={(props, option) => {
            return <li {...props}>{customRenderOption(option)}</li>;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={required}
              placeholder={placeholder}
              error={!!errors?.[`${name}`]?.message}
              helperText={errors?.[`${name}`]?.message}
              className={className}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <span>icon</span>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
