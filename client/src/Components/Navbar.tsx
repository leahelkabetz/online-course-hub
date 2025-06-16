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
import { use, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {

  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.auth.username); // או כל מפתח אחר שיש לך
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin); // או כל מפתח אחר שיש לך
  // const isLoggedOut=useSelector((state: RootState) => state.auth.); // או כל מפתח אחר שיש לך
  const dispatch = useDispatch();
  console.log("isAdmin", isAdmin);
  console.log("username", username);
  return (
    <AppBar position="static"
      sx={{
        position: 'fixed',
        top: 0,
        lef: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: 1,
        backgroundColor: colors.Primary, direction: "rtl", px: 3,
        mb: 20
      }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* צד ימין (לוגו וכו') */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 200 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white", cursor: 'pointer' }}>
              Upkurs
            </Typography>
          </Link>
        </Box>

        {/* אמצע – תפריט ניווט */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            position: "absolute",
            right: 0,
            left: 0,
            justifyContent: "center",
            pointerEvents: "none", // למנוע לחיצה על כל הקופסה
          }}
        >
          <Box sx={{ pointerEvents: "auto", display: "flex", gap: 4 }}>
            <Button
              color="inherit"
              startIcon={<SchoolIcon sx={{ ml: 1 }} />}
              sx={{ color: "white", fontSize: 16, py: 1 }}
              onClick={() => navigate("/courses")}
            >
              הקורסים שלנו
            </Button>
            <Button
              color="inherit"
              startIcon={<ThumbUpIcon sx={{ ml: 1 }} />}
              sx={{ color: "white", fontSize: 16, py: 1 }}
              onClick={() => navigate("/feedback")}
            >
              המלצות סטודנטים
            </Button>
            <Button
              color="inherit"
              startIcon={<InfoOutlinedIcon sx={{ ml: 1 }} />}
              sx={{ color: "white", fontSize: 16, py: 1 }}
              onClick={() => navigate("/about")}
            >
              מי אנחנו
            </Button>
          </Box>
        </Box>

        {/* צד שמאל – שם משתמש, עגלה וכו' */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 200, justifyContent: "flex-end" }}>
          <IconButton sx={{ color: "white" }}>
            <PersonIcon />
          </IconButton>
          <Typography sx={{ color: "white", fontWeight: "bold", maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            שלום, {isAdmin ? "מנהל" : username}
          </Typography>
          {!isAdmin && (
            <IconButton sx={{ color: "white" }}
              onClick={() => navigate("/cart")}>
              <ShoppingCartIcon />
            </IconButton>
          )}
          <IconButton sx={{ color: "white" }}>
            <ChatIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}
            onClick={() => navigate("/login")}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>

    </AppBar>
  );
};

export default Navbar;