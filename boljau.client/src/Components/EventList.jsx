import React, { useState } from 'react';
import {
    CardActions,
    CardContent,
    Grid,
    Paper,
    Card,
    Typography,
    Button,
    CardMedia, Pagination, Box, Fade
} from '@mui/material';

function EventList({ events }) {
    const [page, setPage] = useState(1);
    const eventsPerPage = 16;
    const handleChange = (event, value) => {
        setPage(value);
    };
    if (events.length === 0) {
        return (
            <Fade in timeout={700}>
                <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                        <Typography variant="h6" color="text.secondary">
                            No events found
                        </Typography>
                    </Paper>
            </Fade>
        );
    }



        const startIndex = (page - 1) * eventsPerPage;
    const validEvents = events.filter(
        e => e.images?.length && e._embedded?.venues?.length
    );
    const paginatedEvents = validEvents.slice(startIndex, startIndex + eventsPerPage);

        const totalPages = Math.ceil(events.length / eventsPerPage);
    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(auto-fill, minmax(260px, 1fr))",
                        sm: "repeat(auto-fill, minmax(280px, 1fr))",
                        md: "repeat(auto-fill, minmax(300px, 1fr))",
                        lg: "repeat(4, minmax(300px, 1fr))",  
                    },

                    gap: 3,
                    justifyItems: "stretch",
                    width: "100%",
                    maxWidth: "100%",           
                    overflowX: "clip",          
                    boxSizing: "border-box",
                    px: { xs: 1, sm: 2, md: 3 },
                    margin: "0 auto", 
                }}
            >

                {paginatedEvents.map((el) => (
                    
                    <Card
                        key={el.id}
                        sx={{
                            width: "100%",
                            minHeight: 360,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            borderRadius: 3,
                            boxShadow: 4,
                            transition: "transform 0.3s",
                            "&:hover": { transform: "scale(1.02)" },
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={el.images?.[1]?.url || el.images?.[0]?.url || "/placeholder.jpg"}
                            sx={{
                                aspectRatio: "16 / 9",
                                width: "100%",
                                objectFit: "cover",
                                borderTopLeftRadius: "12px",
                                borderTopRightRadius: "12px",
                            }}
                        />
                        <CardContent sx={{ flexGrow: 1, px: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom noWrap>
                                {el.name}
                            </Typography>
                            <Typography variant="body2">Type: {el.type}</Typography>
                            <Typography variant="body2">
                                Country: {el._embedded?.venues?.[0]?.country?.name || "N/A"}
                            </Typography>
                            <Typography variant="body2">
                                City: {el._embedded?.venues?.[0]?.city?.name || "N/A"}
                            </Typography>
                            <Typography variant="body2">
                                Date: {el.dates?.start?.localDate || "N/A"}
                            </Typography>
                            <Typography variant="body2">
                                Time: {el.dates?.start?.localTime || "N/A"}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ px: 2, pb: 2 }}>
                            <Button size="small" href={el.url} target="_blank">
                                MORE INFO
                            </Button>
                        </CardActions>
                    </Card>
                    
                ))}
            </Box>



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