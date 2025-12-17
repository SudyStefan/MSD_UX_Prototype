import { Calendar, momentLocalizer, View } from "react-big-calendar";
import { useState, useCallback } from "react";
import moment from "moment";
import { Event, GuideSignup } from "../types/event";

const localizer = momentLocalizer(moment);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


interface CalendarViewProps {
  events: Event[];
  userEmail: string;
  signedUpEvents: Set<string>;
  onSelectEvent: (event: Event) => void;
}

export const CalendarView = ({
  events,
  userEmail,
  signedUpEvents,
  onSelectEvent
}: CalendarViewProps) => {
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectEvent = useCallback((event: Event) => {
    onSelectEvent(event);
  }, []);

  const handleDropdown = (newDate: Date) => {
    setDate(newDate);
    setDropdownOpen(!dropdownOpen);
  };

  const eventStyleGetter = (event: Event) => {
    const isFull = event.guidesSignedUp >= event.guidesNeeded;
    const isSignedUp = signedUpEvents.has(event.id);

    let backgroundColor = "#4f46e5"; // indigo
    if (isSignedUp) {
      backgroundColor = "#059669"; // green
    } else if (isFull) {
      backgroundColor = "#9ca3af"; // gray
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block"
      }
    };
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="text-2xl font-bold mb-4">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md"
        >
          <p className="px-4">
            {date.toLocaleString("en-US", {
              month: "long",
              year: "numeric"
            })}
          </p>
        </button>

        {dropdownOpen && (
          <ul className="absolute top-2 bg-indigo-600 border mt-2 rounded-md shadow-lg z-10 text-white px-5 py-2">
            <li onClick={() => handleDropdown(new Date(2025, 8, 1))}>
              September 2026
            </li>
            <li onClick={() => handleDropdown(new Date(2025, 9, 1))}>
              October 2026
            </li>
            <li onClick={() => handleDropdown(new Date(2025, 10, 1))}>
              November 2026
            </li>
            <li onClick={() => handleDropdown(new Date(2025, 11, 1))}>
              December 2026
            </li>
            <li onClick={() => handleDropdown(new Date(2026, 0, 1))}>
              January 2027
            </li>
          </ul>
        )}
      </div>
      <Calendar
        toolbar={false}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: "100%" , minHeight: "450px" }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        popup
      />
    </div>
  );
};
