import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { X, Calendar, MapPin, Users, DollarSign, CircleCheck } from 'lucide-react';
import { Event, GuideSignup } from '../types/event';

interface EventDetailDialogProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
  onSignup: (signup: GuideSignup) => void;
  isSignedUp: boolean;
}

export function EventDetailDialog({ event, open, onClose, onSignup, isSignedUp }: EventDetailDialogProps) {
  const [formData, setFormData] = useState({
    guideName: '',
    email: '',
    phone: '',
    experience: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup({
      eventId: event.id,
      ...formData,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ guideName: '', email: '', phone: '', experience: '' });
      onClose();
    }, 2000);
  };

  const isFull = event.guidesSignedUp >= event.guidesNeeded;

  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
        <Dialog.Overlay className="absolute inset-0 bg-black/50 z-40" />
        <Dialog.Content className="absolute bg-white z-50 w-full h-full py-2">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <Dialog.Title className="m-0">{event.title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>

          <Tabs.Root defaultValue="details" className="w-full">
            <Tabs.List className="flex border-b px-6">
              <Tabs.Trigger
                value="details"
                className="px-4 py-3 border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 transition-colors"
              >
                Event Details
              </Tabs.Trigger>
              <Tabs.Trigger
                value="signup"
                className="px-4 py-3 border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 transition-colors"
              >
                Sign Up
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="details" className="p-6">
              <div className="space-y-6 max-">
                <div>
                  <h3 className="mb-2">Description</h3>
                  <p className="text-gray-700">{event.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p>{event.start.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm text-gray-600">
                        {event.start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p>{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Guides</p>
                      <p>{event.guidesSignedUp} / {event.guidesNeeded} signed up</p>
                      {isFull && <span className="text-sm text-red-600">Full</span>}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="text-indigo-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Compensation</p>
                      <p>{event.compensation}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2">Category</h3>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {event.category}
                  </span>
                </div>

                <div>
                  <h3 className="mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {event.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="signup" className="p-6">
              {submitted ? (
                <div className="text-center py-12">
                  <CircleCheck className="mx-auto text-green-600 mb-4" size={64} />
                  <h3 className="mb-2">Successfully Signed Up!</h3>
                  <p className="text-gray-600">You'll receive confirmation details via email.</p>
                </div>
              ) : isSignedUp ? (
                <div className="text-center py-12">
                  <CircleCheck className="mx-auto text-indigo-600 mb-4" size={64} />
                  <h3 className="mb-2">Already Signed Up</h3>
                  <p className="text-gray-600">You are already registered for this event.</p>
                </div>
              ) : isFull ? (
                <div className="text-center py-12">
                  <Users className="mx-auto text-gray-400 mb-4" size={64} />
                  <h3 className="mb-2">Event Full</h3>
                  <p className="text-gray-600">This event has reached its maximum number of guides.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="mb-4">Sign Up as a Guide</h3>
                  
                  <div>
                    <label htmlFor="guideName" className="block text-sm mb-1">
                      Full Name *
                    </label>
                    <input
                      id="guideName"
                      type="text"
                      value={formData.guideName}
                      onChange={(e) => setFormData({ ...formData, guideName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="signupEmail" className="block text-sm mb-1">
                      Email *
                    </label>
                    <input
                      id="signupEmail"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm mb-1">
                      Relevant Experience *
                    </label>
                    <textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
                      placeholder="Briefly describe your relevant experience for this event..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Submit Sign Up
                  </button>
                </form>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Dialog.Content>
    </Dialog.Root>
  );
}