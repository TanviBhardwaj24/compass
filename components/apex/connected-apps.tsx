"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface App {
  name: string
  icon: React.ReactNode
  status: "connected" | "disconnected"
  lastSync?: string
  color: string
}

const apps: App[] = [
  {
    name: "Apple Health",
    status: "connected",
    lastSync: "2 min ago",
    color: "bg-red-500",
    icon: (
      <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
    ),
  },
  {
    name: "Strava",
    status: "connected",
    lastSync: "1 hour ago",
    color: "bg-[#FC4C02]",
    icon: (
      <svg className="w-5 h-5 text-[#FC4C02]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
      </svg>
    ),
  },
  {
    name: "Flo",
    status: "connected",
    lastSync: "Today",
    color: "bg-pink-500",
    icon: (
      <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
]

export function ConnectedApps() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-medium text-card-foreground">Connected Apps</h3>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          Manage
        </button>
      </div>

      <div className="space-y-3">
        {apps.map((app) => (
          <div
            key={app.name}
            className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-card">
                {app.icon}
              </div>
              <div>
                <p className="font-medium text-card-foreground text-sm">{app.name}</p>
                <p className="text-xs text-muted-foreground">{app.lastSync}</p>
              </div>
            </div>
            <div className={cn(
              "w-2 h-2 rounded-full",
              app.status === "connected" ? "bg-chart-1" : "bg-muted"
            )} />
          </div>
        ))}
      </div>
    </div>
  )
}
