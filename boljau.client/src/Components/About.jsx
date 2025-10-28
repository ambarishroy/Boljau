import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

function About() {
    return (
        <Container
            maxWidth="md"
            sx={{
                mt: 12,
                mb: 6,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 5,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    color: '#fff',
                }}
            >
               
                <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
                    Discover events. Connect people. Celebrate moments.
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}>
                    Bol jau! helps you explore exciting events happening around the world —
                    from concerts, exhibitions, and festivals to conferences and workshops.
                    Whether you’re in Dublin, New York, or anywhere in between, Bol Jau
                    brings you the experiences you care about.
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                    Built using React and .NET by Ambarish Roy. Bol jau
                    represents a passion for connecting communities through shared events and
                    experiences.
                </Typography>
            </Paper>
        </Container>
    );
}

export default About;
