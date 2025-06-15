// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { Box, Container, Typography } from '@mui/material';
// import Navbar from './Components/Navbar';
// import { Home } from 'lucide-react';
// import HomePage from './pages/HomePage';

// export default function MainLayout() {
//     return (
//         <div>
//             <Navbar />
//             <Container maxWidth={false} sx={{ mt: 10, px: 2 }}>
//                 <Outlet />
//             </Container>
//             <Box
//                 component="footer"
//                 sx={{
//                     textAlign: 'center',
//                     padding: 2,
//                     background: '#f5f5f5',
//                     borderTop: '1px solid #ddd',
//                 }}
//             >
//                 <Typography variant="body2" color="text.secondary">
//                     © 2025 | Learn. Grow. Achieve. | Developed by Leah Elkabetz
//                 </Typography>
//             </Box>

//         </div>)

// }

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Navbar from './Components/Navbar';

export default function MainLayout() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Navbar />

            <Container maxWidth={false} sx={{ mt: 10, px: 2, flex: 1 }}>
                <Outlet />
            </Container>

            <Box
                component="footer"
                sx={{
                    textAlign: 'center',
                    padding: 2,
                    background: '#f5f5f5',
                    borderTop: '1px solid #ddd',
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    © 2025 | Learn. Grow. Achieve. | Developed by Leah Elkabetz
                </Typography>
            </Box>
        </Box>
    );
}
