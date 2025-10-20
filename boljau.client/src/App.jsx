import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './Components/EventList';
import EventSearch from './Components/SearchEvent';
import { Container, Typography, Box, Stack} from '@mui/material';
function App() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        axios.get("https://localhost:7133/api/events")
            .then(response => {
                const data = response.data;
                setEvents(data._embedded?.events|| [])
            })
            .catch(error => console.error(error));
    }, [])
    function handleSearch(criteria) {
        axios.post("https://localhost:7133/api/events/search", criteria)
            .then(response => {
                const data = response.data;
                setEvents(data._embedded?.events || [])
            })
            .catch(error => console.error(error));
    }
    return (
        <Container maxWidth="xl" sx={{ mt: 1 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Bol jau !
                </Typography>   
                <Typography variant="subtitle">
                    Discover Events Around the world!
                </Typography> 
            </Box>
            <Stack sx={{mb:1.5}}>
                <EventSearch onSearch={handleSearch} />
            </Stack>        
            <EventList events={events} />          
           
        </Container>
    )
}
export default App;