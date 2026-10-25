import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center p-6 text-center text-slate-800">
      <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-md shadow-blue-600/20">
        <Compass className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Page Not Found</h1>
      <p className="text-sm text-slate-500 max-w-md mb-6">
        The travel itinerary or page you were looking for is unavailable. Let us help you recover your journey.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-md shadow-blue-600/25"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Waypoint AI</span>
      </Link>
    </div>
  );
}
