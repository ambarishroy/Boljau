import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    Button,
    TextField,
    Grid,
    Paper,
    Box,
    Typography, MenuItem, FormControl, Select, InputLabel
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
                <Typography variant="h6" sx={{
                    mb: 2, fontWeight: "bold", overflow: "visible",  
                    position: "relative",
                    zIndex: 10
}}>
                    🔎 Search Events
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 2 }}>
                            <TextField fullWidth type="text" label="Keyword" value={form.Keyword} onChange={(e) => handleChange("Keyword", e.target.value)} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <FormControl  fullWidth >
                                <InputLabel id="country-select-label">Country</InputLabel>
                                <Select
                                    labelId="country-select-label"
                                    id="country-select"
                                    value={form.CountryCode}
                                    label="Country"
                                    onChange={(e) => handleChange("CountryCode",e.target.value)}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="AU">Australia</MenuItem>
                                    <MenuItem value="CA">Canada</MenuItem>
                                    <MenuItem value="IE">Ireland</MenuItem>
                                    <MenuItem value="MX">Mexico</MenuItem>
                                    <MenuItem value="NZ">New Zealand</MenuItem>
                                    <MenuItem value="GB">UK</MenuItem>
                                    <MenuItem value="US">USA</MenuItem>
                                </Select>
                            </FormControl>
                           
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <TextField type="text" placeholder="City" label="City" value={form.City} onChange={(e) => handleChange("City", e.target.value)} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <DatePicker
                                label="Start Date"
                                value={form.StartDate}
                                onChange={(newValue) => handleChange("StartDate", newValue)}
                                            />
                                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <DatePicker
                                label="End Date"
                                value={form.EndDate}
                                onChange={(newValue) => handleChange("EndDate", newValue)}
                                            />
                        </Grid>                      
                        {/*<Button type="submit" variant="contained" sx={{height:56}}>Search</Button> */}
                        <Grid size={{ xs: 12, md:2}}>
                            <Button type="submit" variant="contained" sx={{ height: 56 }} fullWidth>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            
        </LocalizationProvider>
    )

}
export default EventSearch;