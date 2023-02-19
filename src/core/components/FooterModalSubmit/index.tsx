import { Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { colors } from "core/assets";

const buttonSubmitSX = {
  height: "43px",
  border: "1px solid transparent",
  backgroundColor: `${colors.mainColor}`,
  borderRadius: "10px",
  "&:hover": {
    borderColor: `${colors.mainColor}`,
    backgroundColor: `${colors.mainColor}`,
    transform: "translateY(-0.1em)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
};

const buttonCancelSx = {
  border: `1px solid ${colors.mainColor}`,
  height: "43px",
  color: `${colors.mainColor}`,
  backgroundColor: "white",
  borderRadius: "10px",
  "&:hover": {
    border: `1px solid ${colors.mainColor}`,
    backgroundColor: "white",
    transform: "translateY(-0.1em)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
};

interface IProps {
  isLoadingOnOk?: boolean;
  onCancel?: () => void;
  onOk: any;
  labelOnOk?: string;
}

const FooterModalSubmit = (props: IProps) => {
  const { onCancel, onOk, isLoadingOnOk, labelOnOk } = props;
  return (
    <Grid container columnSpacing={2}>
      {!!onCancel && (
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={onCancel}
            className="w-100"
            sx={buttonCancelSx}
          >
            Cancel
          </Button>
        </Grid>
      )}
      <Grid item xs={!!onCancel ? 6 : 12}>
        <LoadingButton
          variant="contained"
          loading={isLoadingOnOk}
          onClick={onOk}
          className="w-100"
          sx={buttonSubmitSX}
        >
          {labelOnOk ?? "Ok"}
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default FooterModalSubmit;
