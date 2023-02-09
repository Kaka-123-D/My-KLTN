import { useTranslation } from "react-i18next";

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
    backgroundColor: `${colors.mainColorHover}`,
  },
};

const buttonCancelSx = {
  border: `1px solid ${colors.mainColor}`,
  height: "43px",
  color: `${colors.mainColor}`,
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: `${colors.mainColorHover}`,
    color: "white",
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
  const { t } = useTranslation();
  return (
    <Grid container columnSpacing={2}>
      {!!onCancel && (
        <Grid item xs={6}>
          <Button
            variant="outlined"
            onClick={onCancel}
            className="w-100"
            sx={buttonCancelSx}
          >
            {t("common.cancel")}
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
          {labelOnOk ?? t("common.ok")}
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default FooterModalSubmit;
