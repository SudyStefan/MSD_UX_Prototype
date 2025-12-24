import { useState } from 'react';
import { Lock, Bell, RotateCw, Calendar, Clock, Users, CreditCard } from 'lucide-react';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    autoLock: true,
    notifications: true,
    sync: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* General Section */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase text-gray-600 tracking-wide mb-3">
            General
          </h3>
          
          <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm">
            {/* Auto Lock */}
            <SettingToggleItem
              icon={<Lock size={18} />}
              label="Auto lock"
              checked={settings.autoLock}
              onChange={() => toggleSetting('autoLock')}
              borderBottom={true}
            />

            {/* Notifications */}
            <SettingToggleItem
              icon={<Bell size={18} />}
              label="Notifications"
              checked={settings.notifications}
              onChange={() => toggleSetting('notifications')}
              borderBottom={true}
            />

            {/* Sync */}
            <SettingToggleItem
              icon={<RotateCw size={18} />}
              label="Sync"
              checked={settings.sync}
              onChange={() => toggleSetting('sync')}
              borderBottom={true}
            />

            {/* New Booking */}
            <SettingArrowItem
              icon={<Calendar size={18} />}
              label="New Booking"
              borderBottom={true}
            />

            {/* Time Zone */}
            <SettingArrowItem
              icon={<Clock size={18} />}
              label="Time Zone"
              borderBottom={false}
            />
          </div>
        </div>

        {/* Admin Section */}
        <div>
          <h3 className="text-xs font-bold uppercase text-gray-600 tracking-wide mb-3">
            Admin
          </h3>
          
          <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm">
            {/* Users */}
            <SettingArrowItem
              icon={<Users size={18} />}
              label="Users"
              borderBottom={true}
            />

            {/* Billing */}
            <SettingArrowItem
              icon={<CreditCard size={18} />}
              label="Billing"
              borderBottom={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface SettingToggleItemProps {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
  borderBottom: boolean;
}

function SettingToggleItem({
  icon,
  label,
  checked,
  onChange,
  borderBottom,
}: SettingToggleItemProps) {
  return (
    <button
      onClick={onChange}
      className={`w-full px-4 py-3 min-h-[52px] flex items-center justify-between hover:bg-gray-50 transition-colors ${
        borderBottom ? 'border-b border-gray-200' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-700 flex-shrink-0">{icon}</span>
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>
      
      <div className="flex items-center">
        <div
          className={`relative inline-flex w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
            checked ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform shadow-md ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </div>
      </div>
    </button>
  );
}

interface SettingArrowItemProps {
  icon: React.ReactNode;
  label: string;
  borderBottom: boolean;
}

function SettingArrowItem({
  icon,
  label,
  borderBottom,
}: SettingArrowItemProps) {
  return (
    <button
      className={`w-full px-4 py-3 min-h-[52px] flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${
        borderBottom ? 'border-b border-gray-200' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-700 flex-shrink-0">{icon}</span>
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>
      
      <span className="text-gray-400 text-lg">›</span>
    </button>
  );
}
