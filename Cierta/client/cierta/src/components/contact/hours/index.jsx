import { useState } from "react";

const AboutHours = () =>{
    const currentDay = new Date().getDay(); // 0 (Sun) – 6 (Sat)

    const [days] = useState([
      { name: 'Mon', time: '08:00 AM - 05:00 PM' },
      { name: 'Tue', time: '08:00 AM - 05:00 PM' },
      { name: 'Wed', time: '08:00 AM - 05:00 PM' },
      { name: 'Thu', time: '08:00 AM - 05:00 PM' },
      { name: 'Fri', time: '08:00 AM - 05:00 PM' },
      { name: 'Sat', time: 'Closed' },
      { name: 'Sun', time: 'Closed' }]
    );


    return(
        <div className="contact-v2__hours">
        <h5>Hours</h5>
        <ul>
          {days.map((day, index) => (
            <li
              key={day.name}
              className={`${day.time === 'Closed' ? 'closed' : ''} ${
                currentDay === ((index + 1) % 7) ? 'active-day' : ''
              }`}
            >
              <span className="day">{day.name}</span>
              <span>{day.time}</span>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default AboutHours;
