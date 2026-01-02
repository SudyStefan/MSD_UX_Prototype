import { useState } from "react";

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="h-full flex items-start justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col bg-white h-full px-8 py-20 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <img src="favicon.png" alt="BooklyAI Logo" className="h-15 w-auto" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex h-full space-y-4 justify-between flex-col"
        >
          <div>
            <label htmlFor="email" className="block text-sm mb-1" />
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Username..."
            />

            <label htmlFor="password" className="block text-sm mb-1" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password..."
            />
            <div className="flex justify-between items-center py-5 px-1">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </a>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Sign Up
              </a>
            </div>
          </div>

          <div className="px-4 bg-white">
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
