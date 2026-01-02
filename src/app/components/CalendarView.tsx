import { Calendar, momentLocalizer, View } from "react-big-calendar";
import { useState, useCallback } from "react";
import moment from "moment";
import { Event, GuideSignup } from "../types/event";
import { ArrowLeft, ArrowRight, PlusIcon } from "lucide-react";

const localizer = momentLocalizer(moment);

const months = [
  "August 2025",
  "September 2025",
  "October 2025",
  "November 2025",
  "December 2025",
  "January 2026",
  "February 2026",
  "March 2026"
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

  const handleNext = () => {
    view === "month"
      ? setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
      : setDate(
          new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
        );
  };

  const handlePrev = () => {
    view === "month"
      ? setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
      : setDate(
          new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
        );
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
    <div className="px-1 flex-1 pt-6">
      <div className="flex flex-row justify-between px-1 pt-2 text-2xl font-bold mb-2">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors relative"
        >
          {date.toLocaleString("en-US", {
            month: "long",
            year: "numeric"
          }) + " ▼"}
        </button>

        {dropdownOpen && (
          <ul className="absolute top-6 bg-indigo-600 border rounded-md shadow-lg z-10 text-white ">
            {months.map((month) => (
              <li
                key={month}
                className="flex justify-center hover:bg-indigo-700 transition-colors"
              >
                <button
                  onClick={() => handleDropdown(new Date(month))}
                  className="justify-center align-center px-5 py-1"
                >
                  {month}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="w-full flex align-between">
          <button className={"min-h-8 w-full rounded-md hover:bg-cyan-300" + (view === "month" ? " bg-cyan-300" : "")} onClick={() => setView("month")}>MONTH</button>
          <button className={"min-h-8 w-full rounded-md hover:bg-cyan-300" + (view === "week" ? " bg-cyan-300" : "")} onClick={() => setView("week")}>WEEK</button>
        </div>
      </div>
      <div className="flex justify-around align-center">
        <button className="w-full min-h-8 hover:bg-cyan-300 justify-items-center" onClick={() => handlePrev()}><ArrowLeft /></button>
        <button className="w-full min-h-8 hover:bg-cyan-300 justify-items-center" onClick={() => handleNext()}><ArrowRight /></button>
      </div>
      <Calendar
        toolbar={false}
        localizer={localizer}
        formats={{
          timeGutterFormat: 'HH:mm'
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 450 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        view={view}
        views={['month', 'week']}
        onView={setView}
        date={date}
        onNavigate={setDate}
        popup
      />
      <PlusIcon className="absolute bottom-30 right-5 bg-cyan-700 hover:bg-cyan-800 transition-colors rounded-full text-white z-10" size={60} />
    </div>
  );
};
