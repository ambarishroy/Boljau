import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, TextField } from '@mui/material';
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
            <form onSubmit={handleSubmit}>
                <label>Keyword:<TextField type="text" label="Keyword" value={form.Keyword} onChange={(e) => handleChange("Keyword", e.target.value)} /></label>
                <label>CountryCode:<TextField type="text" placeholder="Country Code" value={form.CountryCode} onChange={(e) => handleChange("CountryCode", e.target.value)} /></label>
                <label>City:<TextField type="text" placeholder="City" value={form.City} onChange={(e) => handleChange("City", e.target.value)} /></label>
            <DatePicker
                label="Start Date"
                value={form.StartDate}
                onChange={(newValue) => handleChange("StartDate", newValue)}
            />
            <DatePicker
                label="End Date"
                value={form.EndDate}
                onChange={(newValue) => handleChange("EndDate", newValue)}
            />
            <Button type="submit" variant="outlined">Search</Button>
            </form>
        </LocalizationProvider>
    )

}
export default EventSearch;