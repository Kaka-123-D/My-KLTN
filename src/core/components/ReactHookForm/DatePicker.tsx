import { Controller } from "react-hook-form";
import moment from "moment";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

interface IProps {
  name: string;
  label?: string;
  required?: boolean;
  control: any;
  errors?: any;
  minDate?: any;
  maxDate?: any;
  defaultValue?: any;
}

const DatePicker = (props: IProps) => {
  const {
    name,
    label,
    required,
    control,
    errors,
    minDate,
    maxDate,
    defaultValue = null,
  } = props;

  const handleBlurDatePicker = (date: any, onChange: (value: any) => void) => {
    if (
      date &&
      (moment(date).format("YYYY/MM/DD") === "Invalid date" || !date.isValid())
    )
      onChange(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <DesktopDatePicker
            label={label}
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={onChange}
            minDate={
              !minDate || minDate?.toString() === "Invalid Date"
                ? moment("1/1/1900", "DD/MM/YYYY").toDate()
                : new Date(`${minDate}`)
            }
            maxDate={
              maxDate
                ? new Date(`${maxDate}`)
                : moment("31/12/2222", "DD/MM/YYYY").toDate()
            }
            renderInput={(params) => (
              <TextField
                {...params}
                required={required}
                error={!!errors[`${name}`]?.message}
                helperText={errors[`${name}`]?.message}
                className="w-100"
                onBlur={() => handleBlurDatePicker(value, onChange)}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
