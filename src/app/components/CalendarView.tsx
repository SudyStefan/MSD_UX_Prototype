import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import { useState, useCallback } from 'react';
import moment from 'moment';
import { Event, GuideSignup } from '../types/event';

const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  events: Event[];
  userEmail: string;
  signedUpEvents: Set<string>;
  onSelectEvent: (event: Event) => void;
}

export const CalendarView = ({ events, userEmail, signedUpEvents, onSelectEvent }: CalendarViewProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());

  const handleSelectEvent = useCallback((event: Event) => {
    onSelectEvent(event);
  }, []);

  const eventStyleGetter = (event: Event) => {
    const isFull = event.guidesSignedUp >= event.guidesNeeded;
    const isSignedUp = signedUpEvents.has(event.id);
    
    let backgroundColor = '#4f46e5'; // indigo
    if (isSignedUp) {
      backgroundColor = '#059669'; // green
    } else if (isFull) {
      backgroundColor = '#9ca3af'; // gray
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: "100%", minHeight: "600px" }}
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
