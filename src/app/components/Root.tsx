import { useState, useCallback } from 'react';
import { ScanQrCode, Settings, CalendarDays,  } from 'lucide-react';
import { Event, GuideSignup } from '../types/event';
import { EventDetailDialog } from './EventDetailDialog';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarView } from './CalendarView';


interface CalendarViewProps {
  events: Event[];
  userEmail: string;
  onLogout: () => void;
  onSignup: (signup: GuideSignup) => void;
  signedUpEvents: Set<string>;
}

enum Route {
  CALENDAR = "CALENDAR",
  SCAN = "SCAN",
  SETTINGS = "SETTINGS"
}

export function Root({ events, userEmail, onLogout, onSignup, signedUpEvents }: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [route, setRoute] = useState<Route>(Route.CALENDAR);

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white">

      {/* Content */}
      {route === Route.CALENDAR && <CalendarView events={events} userEmail={userEmail} signedUpEvents={signedUpEvents} onSelectEvent={handleSelectEvent} />}
      {route === Route.SCAN && (<></>) /* ADD SCAN PAGE HERE */} 
      {route === Route.SETTINGS && (<></>) /* ADD SETTINGS PAGE HERE */ }

      {/* Footer */}
      <div className="bg-indigo-600 text-white px-10 py-4 flex items-center justify-between shadow-md">
        <div onClick={() => setRoute(Route.CALENDAR)} className="flex flex-col items-center">
          <CalendarDays size={50} />
          <p>Calendar</p>
        </div>
        <div onClick={() => setRoute(Route.SCAN)} className="flex flex-col items-center">
          <ScanQrCode size={50} />
          <p>Scan</p>
        </div>
        <div onClick={() => setRoute(Route.SETTINGS)} className="flex flex-col items-center">
          <Settings size={50} />
          <p>Settings</p>
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
