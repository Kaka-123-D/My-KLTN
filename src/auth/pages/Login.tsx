import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { images } from "../../core/assets";
import { useAuth } from "../contexts/AuthProvider";

import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import storage from "../../core/helpers/storage";
import styles from "./styles.module.scss";
import ForgotPasswordModal from "./ForgotPasswordModal";
import TextField from "core/components/ReactHookForm/TextField";

const LoginBackground = styled(Grid)`
  background-image: url(${images.loginBg});
  background-color: gray;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Container = styled((props) => <Grid container {...props} />)`
  height: 100vh;
`;

const LoginForm = styled((props) => <Grid gap={2} {...props} />)`
  display: flex;
  flex-direction: column !important;
  align-items: center;
  justify-content: center;
  padding: 0 8%;
`;

const Logo = styled.img`
  width: 15vw;
  height: 15vw;
  object-fit: cover;
`;

const Title = styled.h1`
  color: #1976d2;
  font-size: 25px;
`;

const ButtonLogin = styled(LoadingButton)`
  width: 90%;
`;
interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const { isLoggingIn, login } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (storage.getToken()) navigate(`/`, { replace: true });
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().required("Đây là trường bắt buộc"),
        password: yup.string().required("Đây là trường bắt buộc"),
      })
    ),
    mode: "onChange",
  });

  const handleLogin = (values: IUser) => {
    login(values.email, values.password).then(() =>
      navigate(`/`, { replace: true })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Container>
          <LoginBackground item xs={7} />
          <LoginForm item xs={5}>
            <Logo src={images.logo} alt="logo" />
            <Title>Welcome to My Project!</Title>
            <TextField
              required
              name="email"
              label="Email"
              control={control}
              errors={errors}
              disabled={isLoggingIn}
            />
            <TextField
              required
              name="password"
              type="password"
              label="Password"
              control={control}
              errors={errors}
              disabled={isLoggingIn}
            />
            <div
              className={styles.forgotPassword}
              onClick={() => setOpen(true)}
            >
              Quên mật khẩu
            </div>
            <ButtonLogin
              variant="contained"
              loading={isLoggingIn}
              onClick={handleSubmit(handleLogin)}
              type="submit"
            >
              Login
            </ButtonLogin>
          </LoginForm>
        </Container>
      </form>
      {open && (
        <ForgotPasswordModal
          open={open}
          onOk={() => {
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Login;
