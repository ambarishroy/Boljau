import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                
                bottom: 0,
                left: 0,
                width: '100%',
                backgroundColor: '#324470',
                color: 'white',
                py: 1.5,
                textAlign: 'center',
                zIndex: 1000,
            }}
        >
            <Typography variant="body2" sx={{ mb: 0.5 }}>
                Bol jau! | Built by Ambarish Roy
            </Typography>
            <Box>
                <IconButton
                    component={Link}
                    href="https://github.com/ambarishroy"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                    sx={{ mx: 1 }}
                >
                    <GitHubIcon />
                </IconButton>
                <IconButton
                    component={Link}
                    href="https://www.linkedin.com/in/ambarish-roy-31231614b"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                    sx={{ mx: 1 }}
                >
                    <LinkedInIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Footer;
