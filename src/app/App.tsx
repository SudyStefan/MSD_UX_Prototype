import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Root } from "./components/Root";
import { mockEvents } from "./data/mockEvents";
import { GuideSignup, Event } from "./types/event";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [signedUpEvents, setSignedUpEvents] = useState<Set<string>>(new Set());

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };

  const handleSignup = (signup: GuideSignup) => {
    // Update the event's signed up count
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === signup.eventId
          ? { ...event, guidesSignedUp: event.guidesSignedUp + 1 }
          : event
      )
    );

    // Track which events the user has signed up for
    setSignedUpEvents((prev) => new Set([...prev, signup.eventId]));

    console.log("Guide signed up:", signup);
  };

  return (
    // 1. The Background Layer (Full screen)
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* 2. The Phone Frame (Bezel) */}
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[712px] w-[350px] shadow-2xl overflow-hidden">
        {/* 3. The "Notch" or Speaker */}
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 left-1/2 -translate-x-1/2 rounded-b-[1rem] absolute z-20"></div>
          {!isLoggedIn ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            <Root
              events={events}
              userEmail={userEmail}
              onLogout={handleLogout}
              onSignup={handleSignup}
              signedUpEvents={signedUpEvents}
            />
          )}
      </div>
    </div>
  );
}
