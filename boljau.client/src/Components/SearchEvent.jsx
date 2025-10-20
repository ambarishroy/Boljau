import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    Button,
    TextField,
    Grid,
    Paper,
    Box,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
function EventSearch({ onSearch }) {
    const [form, setForm] = useState({
        Keyword: "",
        CountryCode: "",
        City: "",
        StartDate: null,
        EndDate: null
    });
    const handleChange = (key, value) => {
        setForm(prev=>({ ...prev, [key]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...form, StartDate: form.StartDate ? form.StartDate.format('YYYY-MM-DD') : null,
            EndDate: form.EndDate ? form.EndDate.format('YYYY-MM-DD') : null
        };
        onSearch(payload);
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3}}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                    🔎 Search Events
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={2}>
                            <TextField type="text" label="Keyword" value={form.Keyword} onChange={(e) => handleChange("Keyword", e.target.value)} />
                        </Grid>
                        <Grid size={2}>
                            <TextField type="text" placeholder="Country Code" value={form.CountryCode} onChange={(e) => handleChange("CountryCode", e.target.value)} />
                        </Grid>
                        <Grid size={2}>
                            <TextField type="text" placeholder="City" value={form.City} onChange={(e) => handleChange("City", e.target.value)} />
                        </Grid>
                        <Grid size={2}>
            <DatePicker
                label="Start Date"
                value={form.StartDate}
                onChange={(newValue) => handleChange("StartDate", newValue)}
                            />
                        </Grid>
                        <Grid size={2}>
            <DatePicker
                label="End Date"
                value={form.EndDate}
                onChange={(newValue) => handleChange("EndDate", newValue)}
                            />
                        </Grid>                      
                            <Button type="submit" variant="contained">Search</Button>                     
                    </Grid>
                </Box>
            </Paper>
            
        </LocalizationProvider>
    )

}
export default EventSearch;