import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import Login from "../auth/login";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Register from "../auth/Register";
const NavBar = () => {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const navigate = useNavigate();
  const menuItems = [
    { label: "Tiktok", to: "/" },
    { label: "Threads", to: "/threads" },
    { label: "Facebook", to: "/facebook" },
    { label: "Key", to: "/key" },
    { label: "Liên hệ", to: "/contact" },
  ];
  return (
    <section className="section-content">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className="justify-between">
          <button className="text-black" onClick={() => navigate("/")}>
            Tiktok (Douyin)
          </button>

          <Box className="flex space-x-4">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.to}
                className="text-gray-700 normal-case"
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box className="flex space-x-2">
            <Button
              variant="outlined"
              className="normal-case"
              onClick={() => setOpenRegister(true)}
            >
              Đăng Ký
            </Button>
            <Button
              variant="contained"
              className="normal-case bg-green-200 text-black hover:bg-green-300"
              onClick={() => setOpenLogin(true)}
            >
              Đăng nhập
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Login open={openLogin} onClose={() => setOpenLogin(false)} />
      <Register open={openRegister} onClose={() => setOpenRegister(false)} />
    </section>
  );
};

export default NavBar;
