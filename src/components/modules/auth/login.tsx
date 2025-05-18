import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFailed,
  loginStart,
  loginSuccess,
} from "../../../redux/authSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import services from "../../../services";

import {
  TextField,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ILogin } from "../../../types/user";

const schema = yup.object().shape({
  username: yup.string().required("Tài khoản người dùng là bắt buộc."),
  password: yup.string().required("Mật khẩu người dùng là bắt buộc."),
});

const defaultValues = {
  username: "",
  password: "",
};

interface LoginProps {
  open: boolean;
  onClose: () => void;
}

const Login = ({ open, onClose }: LoginProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ILogin) => {
    dispatch(loginStart());
    try {
      const res = await services.auth.login(data);
      dispatch(loginSuccess(res));

      Cookies.set("token", res.token, {
        expires: 7, // Token expires in 7 days
        secure: true,
        sameSite: "strict",
      });

      toast.success(res?.message);
      navigate("/");
      onClose();
    } catch (err) {
      dispatch(loginFailed());
      toast.error("🦄 Tài khoản hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className="text-center flex flex-col ">
          <div className="text-[50px]">Logo</div>
          <span className="font-bold text-[26px]"> Đăng Nhập</span>
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            mt={1}
            className="px-20 py-10"
          >
            <Typography>Tài khoản:</Typography>

            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  label="Tài khoản"
                  size="small"
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Box position="relative">
              <Typography>Mật khẩu:</Typography>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Mật khẩu"
                    type={showPwd ? "text" : "password"}
                    size="small"
                    fullWidth
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <IconButton
                size="small"
                onClick={() => setShowPwd((s) => !s)}
                sx={{ position: "absolute", top: "50%", right: 8 }}
              >
                <Icon
                  icon={
                    showPwd
                      ? "material-symbols:visibility-rounded"
                      : "material-symbols:visibility-off-rounded"
                  }
                />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
        <Box className="flex items-center justify-center mb-5">
          <Button type="submit" variant="contained">
            Đăng Nhập
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default Login;
