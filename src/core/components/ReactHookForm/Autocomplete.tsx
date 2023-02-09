import { Controller } from "react-hook-form";

import { Autocomplete, TextField } from "@mui/material";

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
              error={!!errors?.[`${name}`]?.message}
              helperText={errors?.[`${name}`]?.message}
              className="w-100"
            />
          )}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
