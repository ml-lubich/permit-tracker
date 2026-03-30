"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { demoPermits, getPermitStatus } from "@/lib/demo-data";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const permits = useMemo(
    () => demoPermits.map((p) => ({ ...p, status: getPermitStatus(p.expiration_date) })),
    []
  );

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const permitsByDate = useMemo(() => {
    const map: Record<string, typeof permits> = {};
    permits.forEach((p) => {
      const date = p.expiration_date;
      if (!map[date]) map[date] = [];
      map[date].push(p);
    });
    return map;
  }, [permits]);

  const cells = [];
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="h-24 sm:h-28 bg-card-bg/30 border border-card-border/50 rounded-lg" />);
  }
  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayPermits = permitsByDate[dateStr] || [];
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    cells.push(
      <div
        key={day}
        className={`h-24 sm:h-28 bg-card-bg border rounded-lg p-1.5 sm:p-2 overflow-hidden ${
          isToday ? "border-orange" : "border-card-border"
        }`}
      >
        <div className={`text-xs font-medium mb-1 ${isToday ? "text-orange" : "text-muted"}`}>
          {day}
        </div>
        <div className="space-y-0.5">
          {dayPermits.slice(0, 2).map((p) => (
            <Link
              key={p.id}
              href={`/permits/${p.id}`}
              className={`block text-[10px] sm:text-xs truncate rounded px-1 py-0.5 font-medium ${
                p.status === "expired"
                  ? "bg-danger/10 text-danger"
                  : p.status === "expiring_soon"
                  ? "bg-warning/10 text-warning"
                  : "bg-success/10 text-success"
              }`}
            >
              {p.permit_number}
            </Link>
          ))}
          {dayPermits.length > 2 && (
            <div className="text-[10px] text-muted">+{dayPermits.length - 2} more</div>
          )}
        </div>
      </div>
    );
  }

  // Upcoming deadlines list
  const upcoming = permits
    .filter((p) => {
      const exp = new Date(p.expiration_date);
      return exp >= today;
    })
    .sort((a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime())
    .slice(0, 5);

  return (
    <>
      <Navbar isLoggedIn />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Permit Calendar</h1>
          <p className="text-muted text-sm mt-1">
            Visual overview of all permit expiration dates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-card-bg border border-card-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted hover:text-foreground"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-lg font-semibold">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted hover:text-foreground"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-muted py-2">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">{cells}</div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-card-bg border border-card-border rounded-xl p-4">
              <h3 className="font-semibold mb-4">Upcoming Deadlines</h3>
              {upcoming.length === 0 ? (
                <p className="text-sm text-muted">No upcoming deadlines.</p>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((p) => {
                    const daysLeft = Math.ceil(
                      (new Date(p.expiration_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                    );
                    return (
                      <Link
                        key={p.id}
                        href={`/permits/${p.id}`}
                        className="block p-3 rounded-lg border border-card-border hover:border-orange/30 transition-colors"
                      >
                        <div className="text-sm font-medium">{p.permit_number}</div>
                        <div className="text-xs text-muted mt-0.5">{p.permit_type}</div>
                        <div className={`text-xs mt-1 font-medium ${
                          daysLeft <= 7 ? "text-danger" : daysLeft <= 30 ? "text-warning" : "text-success"
                        }`}>
                          {daysLeft} days left
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-4 bg-card-bg border border-card-border rounded-xl p-4">
              <h3 className="font-semibold mb-3">Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm text-muted">Active (&gt;30 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-sm text-muted">Expiring Soon (&le;30 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-danger" />
                  <span className="text-sm text-muted">Expired</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
