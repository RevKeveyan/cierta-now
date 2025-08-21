import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { FiCalendar } from 'react-icons/fi';
import CalendarPopup from './calendar-popup';

import './style.scss';

const DateInput = ({ value, onChange, placeholder = 'mm/dd/yyyy', label = 'Pick Up Date' , deliveryDate, pickupDate}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  return (
    <div className="date-input-wrapper" ref={ref}>
      <label className="date-input-label">{label}</label>
      <div className={`date-input-box ${deliveryDate || pickupDate ? 'error' : ''}`} onClick={() => setOpen(true)}>
        <span className={`date-input-value ${value ? 'filled' : ''}`}>
          {value ? format(new Date(value), 'MM/dd/yyyy') : placeholder}
        </span>
        <FiCalendar className="calendar-icon" />
      </div>
      {open && (
        <div className="calendar-popup">
          <CalendarPopup
            selectedDate={value}
            onSelectDate={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
