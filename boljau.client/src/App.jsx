import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './Components/EventList';
import EventSearch from './Components/SearchEvent';
import {Typography, Box, AppBar, Button, Toolbar, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import About from './Components/About';
import Footer from './Components/Footer'


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
        
            <Router>
                <AppBar elevation={3} position="fixed" sx={{ backgroundColor:"#323270" }}>
                     <Toolbar>
                         <Typography variant="h3" sx={{ flexGrow: 1, fontWeight: 'bold', textAlign:'center' }}>
                             Bol jau!
                             </Typography>
                             <Button color="inherit" component={ Link} to="/">Home</Button>
                         <Button color="inherit" component={Link} to="/about">About</Button>
                     </Toolbar>
                 </AppBar>
                <Routes>
                    <Route path="/about" element={<About />} />                   
                </Routes>
                <Box
                    sx={{
                        mt: 1,
                        width: "100vw",
                        minHeight: "100vh",
                        backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)),
                        url('/Images/concertBG.jpg')`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        overflowX: "hidden",
                    pb: 2,
                        alignItems:"center"
                    }}>

                    <Box sx={{ position: "relative", zIndex: 2, p: 3 }}>
                        <Typography variant="h4">Discover Events Around the World!</Typography>
                        <EventSearch onSearch={handleSearch} />
                    </Box>      
                    <EventList events={events} />                     
            </Box>
            {scroll && (
                <Fab
                    color="secondary"
                    onClick={scrollToTop}
                    sx={{
                        position: 'fixed',
                        bottom: 75,
                        right: 24,
                        zIndex: 1000,
                        boxShadow: 4,
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
                )}
                <Footer/>
        </Router>
        
    )
}
export default App;
