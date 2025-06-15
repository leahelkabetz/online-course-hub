

// import { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";
// import Navbar from "./Components/Navbar";
// import LoginPage from "./pages/LoginPage";
// import Login from "./Components/LogIn";
// import GlobalLoader from "./loading/GlobalLoader";
// import RegisterModal from "./Components/Register";
// import { Box, Typography } from "@mui/material";
// import ProductsPage from "./pages/HomePage";
// import About from "./Components/About";

// function App() {
//   const [showRegister, setShowRegister] = useState(false);
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

//   const openRegister = () => setShowRegister(true);

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '100vh',
//         pt: isLoggedIn ? '64px' : 0, // מרווח לניווט קבוע (אם יש)
//       }}
//     >
//       {/* ניווט קבוע בראש המסך */}
//       {/* {isLoggedIn && <Navbar />} */}

//       {/* טוען גלובלי */}
//       <GlobalLoader />

//       {/* תוכן דינמי של הדפים */}
//       <Box sx={{ flex: 1 }}>
//         <Routes>
//           <Route
//             path="/"
//             element={<LoginPage openRegister={openRegister} />}
//           />
//           <Route
//             path="/login"
//             element={<Login openRegister={openRegister} />}
//           />
//           <Route path="/MainLayout" element={<ProductsPage />} />
//         </Routes>
//       </Box>

//       {/* פוטר קבוע בתחתית */}
//       <Box
//         component="footer"
//         sx={{
//           textAlign: 'center',
//           padding: 2,
//           background: '#f5f5f5',
//           borderTop: '1px solid #ddd',
//         }}
//       >
//         <Typography variant="body2" color="text.secondary">
//           © 2025 | Learn. Grow. Achieve. | Developed by Leah Elkabetz
//         </Typography>
//       </Box>

//       {/* מודאל הרשמה */}
//       <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} />
//     </Box>
//   );
// }


// export default App;

import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginPage from "./pages/LoginPage";

function App() {
    const [showRegister, setShowRegister] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const openRegister = () => setShowRegister(true);

  
  return isLoggedIn ? <MainRoutes /> : <LoginPage openRegister={openRegister} />;
  
}

export default App;
