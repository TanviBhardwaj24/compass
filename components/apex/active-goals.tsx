"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface Goal {
  id: string
  title: string
  date: string
  daysRemaining: number
  progress: number
  icon: React.ReactNode
  color: "primary" | "accent"
}

const goals: Goal[] = [
  {
    id: "marathon",
    title: "SF Marathon",
    date: "July 26, 2026",
    daysRemaining: 177,
    progress: 28,
    color: "primary",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    id: "kilimanjaro",
    title: "Mt. Kilimanjaro",
    date: "October 2026",
    daysRemaining: 268,
    progress: 15,
    color: "accent",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
      </svg>
    ),
  },
]

export function ActiveGoals() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-medium text-card-foreground">Active Goals</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Training for 2 life goals</p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 hover:shadow-sm cursor-pointer group animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2.5 rounded-xl transition-transform duration-200 group-hover:scale-105",
                goal.color === "primary" && "bg-primary/10 text-primary",
                goal.color === "accent" && "bg-accent/10 text-accent"
              )}>
                {goal.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-card-foreground">{goal.title}</h4>
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    goal.color === "primary" && "bg-primary/10 text-primary",
                    goal.color === "accent" && "bg-accent/10 text-accent"
                  )}>
                    {goal.daysRemaining} days
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{goal.date}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-card-foreground">{goal.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        goal.color === "primary" && "bg-primary",
                        goal.color === "accent" && "bg-accent"
                      )}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
