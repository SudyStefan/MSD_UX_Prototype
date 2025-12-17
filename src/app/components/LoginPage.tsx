import { useState } from "react";
import { LogIn } from "lucide-react";
import logo from "./logo_notext.png";

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="h-full flex items-start justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white h-full p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-indigo-600 p-3 rounded-full">
            <img src={logo} alt="BooklyAI Logo" className="h-8 w-auto" />
          </div>
        </div>

        <h1 className="text-center mb-2">BooklyAI</h1>

        <form onSubmit={handleSubmit} className="flex h-full space-y-4 justify-start flex-col">
            <div>
              <label htmlFor="email" className="block text-sm mb-1" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Username..."
                required
              />

              <label htmlFor="password" className="block text-sm mb-1" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password..."
                required
              />
            </div>
            <div className="px-4 py-30 bg-white">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Log In
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
