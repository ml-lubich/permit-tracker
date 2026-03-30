"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-card-border bg-card-bg/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center font-bold text-black text-sm">
              PP
            </div>
            <span className="text-xl font-bold">
              Permit<span className="text-orange">Pro</span>
            </span>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-1">
              {[
                { href: "/dashboard", label: "Dashboard" },
                { href: "/permits/new", label: "Add Permit" },
                { href: "/calendar", label: "Calendar" },
                { href: "/notifications", label: "Notifications" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "bg-orange/10 text-orange"
                      : "text-muted hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/"
                className="ml-4 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-white/5 transition-colors"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/pricing"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-orange hover:bg-orange-dark text-black font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
