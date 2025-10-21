import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './Components/EventList';
import EventSearch from './Components/SearchEvent';
import { Container, Typography, Box, Stack, AppBar, Button, Toolbar, IconButton, Fab } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function App() {
    const [events, setEvents] = useState([]);
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        axios.get("https://localhost:7133/api/events")
            .then(response => {
                const data = response.data;
                setEvents(data._embedded?.events|| [])
            })
            .catch(error => console.error(error));
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
    function handleSearch(criteria) {
        axios.post("https://localhost:7133/api/events/search", criteria)
            .then(response => {
                const data = response.data;
                setEvents(data._embedded?.events || [])
            })
            .catch(error => console.error(error));
    }
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
        <AppBar elevation={ 3} position="fixed" color="primary">
                <Toolbar>

                    <Typography variant="h3" sx={{ flexGrow: 1, fontWeight: 'bold', textAlign:'center' }}>
                        Bol jau!
                    </Typography>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Login</Button>
                </Toolbar>
        </AppBar>
            
        <Container maxWidth="xl" sx={{ mt: 1 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="subtitle">
                    Discover Events Around the world!
                </Typography> 
            </Box>
            <Stack sx={{mb:1.5}}>
                <EventSearch onSearch={handleSearch} />
            </Stack>        
            <EventList events={events} />          
           
            </Container>
            {scroll && (
                <Fab
                    color="secondary"
                    onClick={scrollToTop}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                        boxShadow: 4,
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            )}
        </>
    )
}
export default App;
