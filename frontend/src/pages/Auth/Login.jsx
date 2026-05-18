import { CheckCircle2 } from "lucide-react";

function Login() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full">
        <div className="bg-slate-900 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Applantics TODO</h1>

          <p className="text-slate-300 mb-8">
            Professional task management system built with Laravel and React.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle2 />
              <span>Track daily tasks</span>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 />
              <span>Manage priorities</span>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 />
              <span>Elegant dashboard</span>
            </div>
          </div>
        </div>

        <div className="p-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>

          <p className="text-gray-500 mb-8">Login to continue</p>

          <form className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-xl p-4"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-xl p-4"
            />

            <button className="w-full bg-slate-900 text-white p-4 rounded-xl">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
