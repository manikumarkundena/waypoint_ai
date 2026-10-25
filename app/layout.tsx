import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WAYPOINT AI — When plans break, your journey doesn\'t.',
  description: 'AI Agent for Travel Disruption Recovery (DEVHOST 2026 PS 4.1). Intelligently compares alternative flights, trains, and connections against your budget and schedule.',
  openGraph: {
    title: 'WAYPOINT AI — When plans break, your journey doesn\'t.',
    description: 'AI Agent for Travel Disruption Recovery. Intelligently compares alternative routes when travel plans break.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WAYPOINT AI — When plans break, your journey doesn\'t.',
    description: 'AI Agent for Travel Disruption Recovery.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7F8FC] text-[#111A35] antialiased selection:bg-[#2864FF] selection:text-white font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
