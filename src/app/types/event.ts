export interface Event {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  guidesNeeded: number;
  guidesSignedUp: number;
  category: string;
  compensation: string;
  requirements: string[];
}

export interface GuideSignup {
  eventId: string;
  guideName: string;
  email: string;
  phone: string;
  experience: string;
}
