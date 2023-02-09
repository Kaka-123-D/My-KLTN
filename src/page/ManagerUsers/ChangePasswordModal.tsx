import { Button, message, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { IAccount, IChangePasswordForm } from "core/constants/interfaces";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { changePassword } from "core/api/account";

interface IProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  data?: IAccount;
}

export default function ChangePasswordModal({
  open,
  onOk,
  onCancel,
  data,
}: IProps) {
  const [t] = useTranslation();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IChangePasswordForm>({
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(
      yup.object({
        newPassword: yup
          .string()
          .min(6, t("validate.passwordMin6") as string)
          .required(t("validate.passwordRequired") as string),
        confirmNewPassword: yup
          .string()
          .test(
            "validateConfirmPassword",
            t("validate.passwordNotMatch") as string,
            (value?: any) => {
              return (watch("newPassword") as string) === value;
            }
          ),
      })
    ),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { mutate: putPassword, isLoading: loadingPutPassword } = useMutation(
    (params: any) => changePassword(params?.id, params?.payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("accounts");
        message.success(t("message.changePasswordSuccess"));
        onOk();
      },
    }
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const onSubmit = (dataSubmit: any) => {
    putPassword({
      id: data?.id,
      payload: {
        newPassword: dataSubmit?.newPassword,
      },
    });
  };

  return (
    <Modal
      title={t("modal.changePasswordLabel")}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="newPassword"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              className="w-100 m-0"
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={!!errors?.newPassword?.message}
              >
                {t("form.newPasswordLabel")}
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                error={!!errors?.newPassword?.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("form.newPasswordLabel")}
              />
              {!!errors?.newPassword?.message && (
                <FormHelperText error>
                  {errors?.newPassword?.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Controller
          name="confirmNewPassword"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              className="w-100 m-0 mt-20"
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={!!errors?.confirmNewPassword?.message}
              >
                {t("form.confirmNewPasswordLabel")}
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                error={!!errors?.confirmNewPassword?.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("form.confirmNewPasswordLabel")}
              />
              {!!errors?.confirmNewPassword?.message && (
                <FormHelperText error>
                  {errors?.confirmNewPassword?.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Button
          htmlType="submit"
          className="btn btn--submit mt-20"
          disabled={false}
        >
          {t("btn.changePassword")}
        </Button>
      </form>
    </Modal>
  );
}
