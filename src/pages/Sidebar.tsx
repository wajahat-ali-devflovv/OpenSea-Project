import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CollectionsIcon from "@mui/icons-material/Collections";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

/**
 * OpenSea-style collapsible sidebar:
 * - default: narrow (icons only)
 * - on hover: expand to show labels
 * - supports mobile toggle button
 */

const navItems = [
  { id: "home", label: "Home", to: "/", Icon: HomeIcon },
  { id: "explore", label: "Explore", to: "/explore", Icon: AutoAwesomeIcon },
  {
    id: "collections",
    label: "Collections",
    to: "/collections",
    Icon: CollectionsIcon,
  },
];

const Sidebar: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // For large screens we rely on hover to expand; mobile uses toggle
  const renderItem = (item: (typeof navItems)[0]) => {
    if (item.adminOnly && !isAdmin) return null;

    const active = location.pathname === item.to;
    return (
      <Link
        key={item.id}
        to={item.to}
        className={`group flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors
          ${active ? "bg-white/10" : "hover:bg-white/5"}
        `}
        aria-label={item.label}
        title={item.label} // helpful for small (icon-only) state
      >
        <div
          className={`flex items-center justify-center shrink-0
            ${active ? "text-white" : "text-gray-300"} 
            transition-colors`}
          style={{ minWidth: 28 }}
        >
          <item.Icon fontSize="medium" />
        </div>

        {/* Label: hidden by default, shown on group-hover (desktop) or always on mobile open */}
        <span
          className={`whitespace-nowrap text-sm font-medium text-gray-100
            opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-200 ease-out
          `}
        >
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile top-left toggle */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-md bg-black/70 text-white hover:bg-black/80 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        // group enables group-hover for children
        className={`
          fixed left-0 top-0 h-screen z-30 bg-[#0b0b0d] text-white
          border-r border-white/5
          transition-all duration-200
          overflow-hidden
          group

          /* width: default narrow on desktop, expanded on hover */
          w-40 md:group-hover:w-56

          /* For mobile: show as overlay when mobileOpen true */
          ${mobileOpen ? "w-64 block" : "hidden md:block"}
        `}
        style={{ backdropFilter: "saturate(120%) blur(6px)" }}
      >
        <div className="h-full flex flex-col">
          {/* Brand / Logo */}
          <div className="px-3 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              {/* short logo - icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12h18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Brand text - hidden until hover */}
            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="text-sm font-semibold">OpenSea Clone</div>
              <div className="text-xs text-gray-400">Marketplace</div>
            </div>
          </div>

          <nav className="mt-4 flex-1 px-2 space-y-1">
            {navItems.map(renderItem)}
          </nav>

          {/* Footer / small controls */}
          <div className="p-3">
            <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                {/* user avatar placeholder */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="8"
                    r="3"
                    stroke="white"
                    strokeWidth="1.2"
                  ></circle>
                  <path
                    d="M4 20c0-4 4-6 8-6s8 2 8 6"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-sm font-medium">Guest</div>
                <div className="text-xs text-gray-400">Connect wallet</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* mobile overlay backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          aria-hidden
        />
      )}
    </>
  );
};

export default Sidebar;
