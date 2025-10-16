import React from 'react'
function EventList({ events }){
    return (
        <div>
        <h1>Events</h1>
            {events.map((el) => (
                <div key={el.id} style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "10px"
                }}>
                    <p>Name: {el.name}</p>
                    <p>Type: {el.type}</p>
                    <p>Country: {el._embedded?.venues[0]?.country.name || "N/A"}</p>
                    <p>City: {el._embedded?.venues[0]?.city.name || "N/A"}</p>
                    <p>Date: {el.dates?.start?.localDate}</p>
                    <p>More info:<a href={el.url} target="_blank">{el.url}</a></p>
                </div>
            ))}
        </div>
    )
}
export default EventList;