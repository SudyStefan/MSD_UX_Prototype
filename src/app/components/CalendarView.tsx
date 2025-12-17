import { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import { LogOut, User } from 'lucide-react';
import { Event, GuideSignup } from '../types/event';
import { EventDetailDialog } from './EventDetailDialog';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  events: Event[];
  userEmail: string;
  onLogout: () => void;
  onSignup: (signup: GuideSignup) => void;
  signedUpEvents: Set<string>;
}

export function CalendarView({ events, userEmail, onLogout, onSignup, signedUpEvents }: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
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
    <div className="h-screen flex flex-col bg-white">

      {/* Legend */}
      <div className="px-6 py-3 bg-gray-50 border-b flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-600 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span>Signed Up</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Full</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 p-6 overflow-auto">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          style={{ height: '100%', minHeight: '600px' }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          popup
        />
      </div>

      {/* Header */}
      <div className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-white mb-1">Freelance Guide Events</h1>
          <p className="text-sm text-indigo-100">Browse and sign up for upcoming events</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User size={20} />
            <span>{userEmail}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>
      
      {/* Event Detail Dialog */}
      <EventDetailDialog
        event={selectedEvent}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSignup={onSignup}
        isSignedUp={selectedEvent ? signedUpEvents.has(selectedEvent.id) : false}
      />
    </div>
  );
}
