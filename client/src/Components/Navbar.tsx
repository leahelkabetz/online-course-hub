import { AppBar, Toolbar, Box, Typography, IconButton, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { colors } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import ProductsPage from "../pages/HomePage"; // Assuming ProductsPage is exported from this path
import About from "../Components/About"; // Assuming About is exported from this path
import { useEffect } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <AppBar position="static"
      sx={{
        position: 'fixed',
        top:0,
  lef:0,
  right:0,
        width: '100%',
        zIndex: 1000,
        boxShadow: 1,
        backgroundColor: colors.Primary, direction: "rtl", px: 3,
        mb: 20
      }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white", cursor: 'pointer' }}>
              Upkurs
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Button color="inherit"
            startIcon={<SchoolIcon sx={{ ml: 1 }} />}
            sx={{ color: "white", fontSize: 16, py: 1 }}
            onClick={() => navigate("/courses")} >
            הקורסים שלנו
          </Button>
          <Button color="inherit"
            startIcon={<ThumbUpIcon sx={{ ml: 1 }} />}
            sx={{ color: "white", fontSize: 16, py: 1 }}
            onClick={() => navigate("/about")} >
            המלצות סטודנטים
          </Button>
          <Button color="inherit"
            startIcon={<InfoOutlinedIcon sx={{ ml: 1 }} />}
            sx={{ color: "white", fontSize: 16, py: 1 }}
            onClick={() => navigate("/about")} >
            מי אנחנו
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ color: "white" }}>
            <PersonIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <ChatIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;