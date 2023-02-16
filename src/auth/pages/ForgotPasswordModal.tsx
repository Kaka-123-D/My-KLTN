import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { Button, Modal } from "antd";
import classNames from "classnames";
import { forgotPassword } from "core/api/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";

import styles from "./styles.module.scss";

interface IProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export default function ForgotPasswordModal({ open, onOk, onCancel }: IProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<{ email: string }>({
    // resolver: yupResolver(
    //   yup.object({
    //     email: yup
    //       .string()
    //       .email(t("validate.emailValid") as string)
    //       .required(t("validate.emailRequired") as string),
    //   })
    // ),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const [mes, setMes] = useState("");
  const { mutate: postForgotPassword, isLoading: loadingPostForgotPassword } =
    useMutation((payload: any) => forgotPassword(payload), {
      onSuccess: () => {
        setMes("thanh cong");
      },
    });

  const onSubmit = (dataSubmit: any) => {
    postForgotPassword(dataSubmit);
  };

  return (
    <Modal
      title={"title"}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {mes && <div className={styles.mes}>{mes}</div>}
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                label={"email"}
                variant="outlined"
                className={classNames("w-100", {
                  "mt-10": !!mes,
                })}
                onChange={onChange}
                value={value}
                error={!!errors?.email?.message}
                helperText={errors?.email?.message}
              />
            </>
          )}
        />
        <Button
          htmlType="submit"
          className="btn btn--submit mt-20"
          disabled={loadingPostForgotPassword}
        >
          {"ok"}
        </Button>
      </form>
    </Modal>
  );
}
