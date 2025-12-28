import { Calendar, momentLocalizer, Event as CalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '../types/event';

const localizer = momentLocalizer(moment);

interface EventCalendarProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
}

export function EventCalendar({ events, onSelectEvent }: EventCalendarProps) {
  const calendarEvents: CalendarEvent[] = events.map((event) => ({
    title: event.title,
    start: event.start,
    end: event.end,
    resource: event,
  }));

  const handleSelectEvent = (calendarEvent: CalendarEvent) => {
    if (calendarEvent.resource) {
      onSelectEvent(calendarEvent.resource as Event);
    }
  };

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#3b82f6',
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div className="h-screen p-6">
      <div className="h-full bg-white rounded-lg shadow-sm p-4">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          style={{ height: '100%' }}
          views={['month', 'week', 'day']}
          defaultView="month"
        />
      </div>
    </div>
  );
}
