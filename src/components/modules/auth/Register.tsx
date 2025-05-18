import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerSuccess } from "../../../redux/authSlice";
import services from "../../../services";

import {
  TextField,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Tài khoản người dùng là bắt buộc."),
  password: yup.string().required("Mật khẩu người dùng là bắt buộc."),
  passwordNew: yup.string().required("Mật khẩu người dùng là bắt buộc."),
});

const defaultValues = {
  username: "",
  password: "",
  passwordNew: "",
};

interface RegisterProps {
  open: boolean;
  onClose: () => void;
}

const Register = ({ open, onClose }: RegisterProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdN, setShowPwdN] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {
    username: string;
    password: string;
    passwordNew: string;
  }) => {
    try {
      const res = await services.auth.register(data);
      dispatch(registerSuccess(res));
      navigate("/");
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className="text-center flex flex-col ">
          <div className="text-[50px]">Logo</div>
          <span className="font-bold text-[26px]"> Đăng Ký</span>
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
                  fullWidth
                  size="small"
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
                    size="small"
                    type={showPwd ? "text" : "password"}
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
            <Box position="relative">
              <Typography>Nhập lại mật khẩu:</Typography>
              <Controller
                name="passwordNew"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Nhập lại Mật khẩu"
                    size="small"
                    type={showPwdN ? "text" : "password"}
                    fullWidth
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <IconButton
                size="small"
                onClick={() => setShowPwdN((s) => !s)}
                sx={{ position: "absolute", top: "50%", right: 8 }}
              >
                <Icon
                  icon={
                    showPwdN
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
            Đăng Ký
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default Register;
