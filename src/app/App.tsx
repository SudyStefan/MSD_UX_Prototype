import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Root } from './components/Root';
import { mockEvents } from './data/mockEvents';
import { GuideSignup, Event } from './types/event';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [signedUpEvents, setSignedUpEvents] = useState<Set<string>>(new Set());

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  const handleSignup = (signup: GuideSignup) => {
    // Update the event's signed up count
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === signup.eventId
          ? { ...event, guidesSignedUp: event.guidesSignedUp + 1 }
          : event
      )
    );

    // Track which events the user has signed up for
    setSignedUpEvents(prev => new Set([...prev, signup.eventId]));

    console.log('Guide signed up:', signup);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Root
      events={events}
      userEmail={userEmail}
      onLogout={handleLogout}
      onSignup={handleSignup}
      signedUpEvents={signedUpEvents}
    />
  );
}
