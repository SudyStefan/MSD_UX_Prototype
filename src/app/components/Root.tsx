import { useState, useCallback } from "react";
import { ScanQrCode, Settings, CalendarDays } from "lucide-react";
import { Event, GuideSignup } from "../types/event";
import { EventDetailDialog } from "./EventDetailDialog";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarView } from "./CalendarView";
import { QRScannerPage } from "./QRScannerPage";
import { SettingsPage } from "./SettingsPage";

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
      {/* Content - Flex-1 */}
      <div className="flex-1 overflow-hidden">
        {route === Route.CALENDAR && (
          <CalendarView
            events={events}
            userEmail={userEmail}
            signedUpEvents={signedUpEvents}
            onSelectEvent={handleSelectEvent}
          />
        )}
        {route === Route.SCAN && <QRScannerPage />}
        {route === Route.SETTINGS && <SettingsPage />}
      </div>

      {/* Footer */}
      <div className="bg-indigo-600 text-white px-2 p-4 flex items-center justify-between shadow-md">
        <div
          onClick={() => setRoute(Route.CALENDAR)}
          className={
            "flex flex-col w-full items-center hover:text-cyan-500 cursor-pointer" +
            (route === Route.CALENDAR ? " text-cyan-500" : "")
          }
        >
          <CalendarDays size={50} />
          <p className="text-xs mt-1">Calendar</p>
        </div>
        <div
          onClick={() => setRoute(Route.SCAN)}
          className={
            "flex flex-col w-full items-center hover:text-cyan-500 cursor-pointer" +
            (route === Route.SCAN ? " text-cyan-500" : "")
          }
        >
          <ScanQrCode size={50} className={route === Route.SCAN ? "text-cyan-600" : ""} />
          <p className="text-xs mt-1">Scan</p>
        </div>
        <div
          onClick={() => setRoute(Route.SETTINGS)}
          className={
            "flex flex-col w-full items-center hover:text-cyan-500 cursor-pointer" +
            (route === Route.SETTINGS ? " text-cyan-500" : "")
          }
        >
          <Settings size={50} className={route === Route.SETTINGS ? "text-cyan-600" : ""} />
          <p className="text-xs mt-1">Settings</p>
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
