import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './Components/EventList';
import EventSearch from './Components/SearchEvent';
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
                setEvents(data._embedded.events)
            })
            .catch(error => console.error(error));
    }
    return (
        <div style={{ padding: "20px" }}>
            <h1>Boljau !</h1>
            <EventSearch onSearch={ handleSearch}/>
            <EventList events={events} />
        </div>
    )
}
export default App;