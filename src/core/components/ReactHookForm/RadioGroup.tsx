import { FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";
import { Controller } from "react-hook-form";

import { colors } from "core/assets";
import { IRadio } from "core/constants/interfaces";

interface IProps {
  name: string;
  label?: string;
  radioList: IRadio[];
  defaultValue?: number;
  control: any;
  isRowDirection?: boolean;
}

const CustomRadioGroup = (props: IProps) => {
  const { label, control, radioList, defaultValue, name, isRowDirection } =
    props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={`${defaultValue}`}
      render={({ field: { onChange, value } }) => (
        <>
          <FormLabel>{label}</FormLabel>
          <RadioGroup value={value} onChange={onChange} row={isRowDirection}>
            {radioList.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={
                  <Radio
                    disabled={item?.disabled}
                    sx={{
                      "&.Mui-checked": {
                        color: colors.mainColor,
                      },
                    }}
                  />
                }
                label={item.label}
              />
            ))}
          </RadioGroup>
        </>
      )}
    />
  );
};

export default CustomRadioGroup;
