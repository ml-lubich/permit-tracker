"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { demoNotifications } from "@/lib/demo-data";
import { Notification } from "@/lib/types";

function NotificationIcon({ type }: { type: Notification["type"] }) {
  if (type === "expired") {
    return (
      <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
    );
  }
  if (type === "expiring_soon") {
    return (
      <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </div>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(demoNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <>
      <Navbar isLoggedIn />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted text-sm mt-1">
              {unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-sm text-orange hover:text-orange-light transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Notification settings placeholder */}
        <div className="bg-orange/5 border border-orange/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-orange">Notification Settings Preview</p>
              <p className="text-xs text-muted mt-1">
                In the full version, you&apos;ll receive email and SMS alerts at 30, 14, and 7 days
                before permit expiration. Configure your preferences in Settings.
              </p>
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 bg-orange rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-black rounded-full" />
                  </div>
                  <span className="text-xs text-muted">Email alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 bg-card-border rounded-full relative">
                    <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-muted rounded-full" />
                  </div>
                  <span className="text-xs text-muted">SMS alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 bg-orange rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-black rounded-full" />
                  </div>
                  <span className="text-xs text-muted">Push notifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications list */}
        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-card-bg border rounded-xl p-4 transition-colors ${
                n.read ? "border-card-border" : "border-orange/30 bg-orange/[0.02]"
              }`}
            >
              <div className="flex items-start gap-3">
                <NotificationIcon type={n.type} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${n.read ? "text-muted" : "text-foreground font-medium"}`}>
                    {n.message}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted">{timeAgo(n.created_at)}</span>
                    {n.permit && (
                      <Link
                        href={`/permits/${n.permit_id}`}
                        className="text-xs text-orange hover:text-orange-light transition-colors"
                      >
                        View Permit
                      </Link>
                    )}
                    <button
                      onClick={() => toggleRead(n.id)}
                      className="text-xs text-muted hover:text-foreground transition-colors"
                    >
                      Mark as {n.read ? "unread" : "read"}
                    </button>
                  </div>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-orange flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* What notifications would be sent */}
        <div className="mt-8 bg-card-bg border border-card-border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Scheduled Notifications</h2>
          <p className="text-sm text-muted mb-4">
            These are the notifications that would be sent based on your current permits:
          </p>
          <div className="space-y-2">
            {[
              { days: "7 days", permit: "FP-2025-009012", method: "Email + SMS + Push" },
              { days: "14 days", permit: "EP-2025-005678", method: "Email + Push" },
              { days: "25 days", permit: "RP-2025-002345", method: "Email" },
            ].map((item) => (
              <div
                key={item.permit}
                className="flex items-center justify-between py-2 border-b border-card-border last:border-0"
              >
                <div>
                  <span className="text-sm font-medium">{item.permit}</span>
                  <span className="text-sm text-muted ml-2">expires in {item.days}</span>
                </div>
                <span className="text-xs text-muted">{item.method}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
