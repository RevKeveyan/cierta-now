import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  addMonths,
  subMonths,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./style.scss";

const CalendarPopup = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 1,
    });
    const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    const days = [];

    let current = startDate;

    while (current <= endDate) {
      const thisDay = current; // заморозка текущего дня

      const isInMonth = isSameMonth(thisDay, currentMonth);
      const isSelected = selectedDate && isSameDay(thisDay, selectedDate);

      days.push(
        <div
          key={thisDay.toISOString()}
          className={`calendar-day ${isInMonth ? "" : "dimmed"} ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => onSelectDate(new Date(thisDay))}
        >
          {format(thisDay, "d")}
        </div>
      );

      current = addDays(current, 1);
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setCurrentMonth(subMonths(currentMonth, 1));
          }}
        >
          <FiChevronLeft />
        </button>

        <span>{format(currentMonth, "MMMM yyyy")}</span>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setCurrentMonth(addMonths(currentMonth, 1));
          }}
        >
          <FiChevronRight />
        </button>
      </div>
      <div className="calendar-weekdays">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar-grid">{renderDays()}</div>
    </div>
  );
};

export default CalendarPopup;
