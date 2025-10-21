import React, { useState } from 'react';
import {
    CardActions,
    CardContent,
    Grid,
    Paper,
    Card,
    Typography,
    Button,
    CardMedia, Pagination, Box
} from '@mui/material';

function EventList({ events }) {
    const [page, setPage] = useState(1);
    const eventsPerPage = 16;
    const handleChange = (event, value) => {
        setPage(value);
    };
    if (events.length === 0) {
        return (
            <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                <Typography variant="h6" color="text.secondary">
                    No events found
                </Typography>
            </Paper>
        );
    }

        const startIndex = (page - 1) * eventsPerPage;
        const paginatedEvents = events.slice(startIndex, startIndex + eventsPerPage);
        const totalPages = Math.ceil(events.length / eventsPerPage);
    return (
        <>
            <Grid container spacing={3}>
                {paginatedEvents.map((el) => (
                <Grid size={3} key={el.id}>
                    <Card sx={{
                            maxWidth:345,
                            borderRadius: 3,
                            boxShadow: 4,
                            transition: "0.3s",
                            "&:hover": { transform: "scale(1.03)" },
                    }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={el.images[1].url}
                        />
                        <CardContent>
                            <Typography>Name: {el.name}</Typography>                                               
                            <Typography>Type: {el.type}</Typography>                       
                            <Typography>Country: {el._embedded?.venues[0]?.country.name || "N/A"}</Typography>                       
                            <Typography>City: {el._embedded?.venues[0]?.city.name || "N/A"}</Typography>                      
                            <Typography>Date: {el.dates?.start?.localDate}</Typography>
                            <Typography>Time: {el.dates?.start?.localTime}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" href={el.url} target="_blank">More info</Button>                           
                        </CardActions>
                    </Card>
                </Grid>                  
            ))}             
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    color="secondary"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#1976d2',           
                        }}}
        />
            </Box>
        </>
    )
}
export default EventList;