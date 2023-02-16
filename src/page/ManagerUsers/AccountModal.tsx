import { Modal, Button, message } from "antd";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import classNames from "classnames";
import configs from "core/config";

import { getListRole } from "core/api/common";
import { IRole, IAccountForm, IAccount } from "core/constants/interfaces";
import { createAccount, updateAccount } from "core/api/account";
import { ActionType, RoleType } from "core/constants/enums";
import UploadImage from "core/components/UploadImage";
import { uploadImage } from "core/api/upload";

interface IProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  type: ActionType;
  data?: IAccount;
}

export default function AccountModal({
  open,
  onOk,
  onCancel,
  type,
  data,
}: IProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IAccountForm>({
    // resolver: yupResolver(
    //   yup
    //     .object({
    //       email: yup
    //         .string()
    //         .email(t("validate.emailValid") as string)
    //         .required(t("validate.emailRequired") as string),
    //       password:
    //         type === ActionType.CREATE
    //           ? yup
    //               .string()
    //               .min(6, t("validate.passwordMin6") as string)
    //               .required(t("validate.passwordRequired") as string)
    //           : yup.string(),
    //       role: yup.string().required(t("validate.roleRequired") as string),
    //       name: yup
    //         .string()
    //         .nullable()
    //         .test(
    //           "validateName",
    //           t("validate.nameMin6") as string,
    //           (value?: string | null) => {
    //             if (!value) {
    //               return true;
    //             }
    //             if (value && value?.length < 6) {
    //               return false;
    //             }
    //             return true;
    //           }
    //         ),
    //       phone: yup
    //         .string()
    //         .nullable()
    //         .test(
    //           "validatePhone",
    //           t("validate.phoneInvalid") as string,
    //           (value?: string | null) => {
    //             if (!value) {
    //               return true;
    //             }
    //             return new RegExp(/^(84|0[3|5|7|8|9])+([0-9]{8})$/).test(
    //               value || ""
    //             );
    //           }
    //         ),
    //     })
    //     .required()
    // ),
    mode: "onChange",
    defaultValues:
      type === ActionType.CREATE
        ? {
            email: "",
            password: "",
            role: undefined,
            name: "",
            phone: "",
          }
        : {
            email: data?.email,
            role: data?.role?.id,
            name: data?.name,
            phone: data?.phone,
          },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState<File | null>();

  const { data: listRoleCommon } = useQuery("listRoleCommon", getListRole);
  const { mutate: postAccount, isLoading: loadingPostAccount } = useMutation(
    (payload: any) => createAccount(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("accounts");
        message.success("thanh cong");
        onOk();
      },
    }
  );
  const { mutate: putAccount, isLoading: loadingPutAccount } = useMutation(
    (params: any) => updateAccount(params?.id, params?.payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("accounts");
        message.success("thanh cong");
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
  const onSubmit = async (dataSubmit: any) => {
    if (currentAvatar) {
      const imageData = await uploadImage(currentAvatar as File);
      const imageUrl = imageData?.data?.data;
      if (imageData && Array.isArray(imageUrl)) {
        const payload = {
          ...dataSubmit,
          name: dataSubmit.name !== "" ? dataSubmit?.name : undefined,
          phone: dataSubmit.phone !== "" ? dataSubmit?.phone : undefined,
          role: +dataSubmit?.role,
          avatar: configs.S3_DOMAIN + imageUrl[0],
        };
        if (type === ActionType.CREATE) {
          postAccount(payload);
        } else {
          putAccount({
            id: data?.id,
            payload: payload,
          });
        }
      }
    } else {
      const payload = {
        ...dataSubmit,
        name: dataSubmit.name !== "" ? dataSubmit?.name : undefined,
        phone: dataSubmit.phone !== "" ? dataSubmit?.phone : undefined,
        role: +dataSubmit?.role,
        avatar: data?.avatar,
      };
      if (type === ActionType.CREATE) {
        postAccount(payload);
      } else {
        putAccount({
          id: data?.id,
          payload: payload,
        });
      }
    }
  };

  return (
    <>
      <Modal
        title={
          type === ActionType.CREATE
            ? "create"
            : "edit"
        }
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <UploadImage
              currentAvatar={currentAvatar}
              setCurrentAvatar={setCurrentAvatar}
              image={data?.avatar}
            />
          </div>
          <div className="mt-20">
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextField
                    label={"ten"}
                    className="w-100"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    error={!!errors?.name?.message}
                    helperText={errors?.name?.message}
                  />
                </>
              )}
            />
          </div>
          <div className="d-flex-sb-s mt-20">
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextField
                    label={"email"}
                    className={classNames("f-1", {
                      "mr-10": type === ActionType.CREATE,
                    })}
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                  />
                </>
              )}
            />
            {type === ActionType.CREATE && (
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    sx={{ m: 1, width: "25ch" }}
                    variant="outlined"
                    className="f-1 m-0"
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      error={!!errors?.password?.message}
                    >
                      {"pass"}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={value}
                      onChange={onChange}
                      error={!!errors?.password?.message}
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
                      label={"pass"}
                    />
                    {!!errors?.password?.message && (
                      <FormHelperText error>
                        {errors?.password?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            )}
          </div>
          <div className="d-flex-sb-s mt-20">
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextField
                    label={"phone"}
                    className={classNames("f-1", {
                      "mr-10": data?.role?.name !== RoleType.SUPER_ADMIN,
                    })}
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    error={!!errors?.phone?.message}
                    helperText={errors?.phone?.message}
                  />
                </>
              )}
            />
            {data?.role?.name !== RoleType.SUPER_ADMIN && (
              <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    label={"role"}
                    value={value}
                    className="f-1"
                    onChange={onChange}
                    error={!!errors?.role?.message}
                    helperText={errors?.role?.message}
                  >
                    {listRoleCommon?.data?.map((role: IRole) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            )}
          </div>
          <Button
            htmlType="submit"
            className="btn btn--submit mt-20"
            disabled={
              type === ActionType.CREATE
                ? loadingPostAccount
                : loadingPutAccount
            }
          >
            {type === ActionType.CREATE
              ? "add"
              : "edit"}
          </Button>
        </form>
      </Modal>
    </>
  );
}
