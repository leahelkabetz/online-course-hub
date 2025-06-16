import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Navbar from './Components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

export default function MainLayout() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
console.log("isLoggedInAfter", isLoggedIn);
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            {isLoggedIn && <Navbar />}

            <Container maxWidth={false} sx={{ mt: 10, px: 2, flex: 1 }}>
                <Outlet />
            </Container>

          
        </Box>
    );
}
