import { useState, useCallback } from "react";
import { ScanQrCode, Settings, CalendarDays } from "lucide-react";
import { Event, GuideSignup } from "../types/event";
import { EventDetailDialog } from "./EventDetailDialog";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarView } from "./CalendarView";

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

export function Root({
  events,
  userEmail,
  onLogout,
  onSignup,
  signedUpEvents
}: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [route, setRoute] = useState<Route>(Route.CALENDAR);

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  }, []);

  return (
    <div className="flex flex-col bg-white justify-between h-full">
      {/* Content */}
      <div>
        {route === Route.CALENDAR && (
          <CalendarView
            events={events}
            userEmail={userEmail}
            signedUpEvents={signedUpEvents}
            onSelectEvent={handleSelectEvent}
          />
        )}
        {route === Route.SCAN && <></> /* ADD SCAN PAGE HERE */}
        {route === Route.SETTINGS && <></> /* ADD SETTINGS PAGE HERE */}
      </div>

      {/* Footer */}
      <div className="bg-indigo-600 text-white px-2 p-4 flex items-center justify-between shadow-md">
        <div
          onClick={() => setRoute(Route.CALENDAR)}
          className={"flex flex-col w-full items-center hover:text-cyan-500" + (route === Route.CALENDAR ? " text-cyan-500" : "")}
        >
          <CalendarDays size={50} />
          <p>Calendar</p>
        </div>
        <div
          onClick={() => setRoute(Route.SCAN)}
          className={"flex flex-col w-full items-center hover:text-cyan-500" + (route === Route.SCAN ? " text-cyan-500" : "")}
        >
          <ScanQrCode size={50} className={route === Route.SCAN ? " text-cyan-600" : ""} />
          <p>Scan</p>
        </div>
        <div
          onClick={() => setRoute(Route.SETTINGS)}
          className={"flex flex-col w-full items-center hover:text-cyan-500" + (route === Route.SETTINGS ? " text-cyan-500" : "")}
        >
          <Settings size={50} className={route === Route.SETTINGS ? " text-cyan-600" : ""} />
          <p>Settings</p>
        </div>
      </div>

      {/* Event Detail Dialog */}
      <EventDetailDialog
        event={selectedEvent}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSignup={onSignup}
        isSignedUp={
          selectedEvent ? signedUpEvents.has(selectedEvent.id) : false
        }
      />
    </div>
  );
}
