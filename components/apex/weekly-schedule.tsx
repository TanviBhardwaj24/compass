"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface WorkoutDay {
  day: string
  date: string
  workout: {
    title: string
    duration: string
    type: "run" | "strength" | "rest" | "cross" | "hike"
    intensity: "easy" | "moderate" | "hard" | "recovery"
    description?: string
  }
  isToday?: boolean
}

const weekSchedule: WorkoutDay[] = [
  {
    day: "Mon",
    date: "Jan 27",
    workout: {
      title: "Easy Run",
      duration: "45 min",
      type: "run",
      intensity: "easy",
      description: "Zone 2, conversational pace"
    }
  },
  {
    day: "Tue",
    date: "Jan 28",
    workout: {
      title: "Strength Training",
      duration: "50 min",
      type: "strength",
      intensity: "moderate",
      description: "Lower body focus, altitude prep"
    }
  },
  {
    day: "Wed",
    date: "Jan 29",
    workout: {
      title: "Recovery",
      duration: "30 min",
      type: "rest",
      intensity: "recovery",
      description: "Gentle yoga or walk"
    }
  },
  {
    day: "Thu",
    date: "Jan 30",
    workout: {
      title: "Tempo Run",
      duration: "55 min",
      type: "run",
      intensity: "hard",
      description: "20 min tempo at marathon pace"
    },
    isToday: true
  },
  {
    day: "Fri",
    date: "Jan 31",
    workout: {
      title: "Cross Training",
      duration: "40 min",
      type: "cross",
      intensity: "moderate",
      description: "Swimming or cycling"
    }
  },
  {
    day: "Sat",
    date: "Feb 1",
    workout: {
      title: "Long Run",
      duration: "90 min",
      type: "run",
      intensity: "moderate",
      description: "Progressive build, finish strong"
    }
  },
  {
    day: "Sun",
    date: "Feb 2",
    workout: {
      title: "Active Recovery",
      duration: "20 min",
      type: "rest",
      intensity: "recovery",
      description: "Light stretching & mobility"
    }
  }
]

const typeIcons = {
  run: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  ),
  strength: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  rest: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  ),
  cross: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  hike: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
    </svg>
  ),
}

const intensityColors = {
  easy: "bg-chart-1/20 text-chart-1",
  moderate: "bg-chart-4/20 text-chart-4",
  hard: "bg-accent/20 text-accent",
  recovery: "bg-primary/20 text-primary",
}

export function WeeklySchedule() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-medium text-card-foreground">This Week</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Week 12 of 24 · Base Building</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">via Strava</span>
          <div className="w-5 h-5 rounded-full bg-[#FC4C02]/10 flex items-center justify-center">
            <svg className="w-3 h-3 text-[#FC4C02]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
            </svg>
          </div>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-5">
        {weekSchedule.map((day, index) => (
          <div
            key={day.day}
            style={{ animationDelay: `${index * 50}ms` }}
            className={cn(
              "p-2 sm:p-3 rounded-xl text-center transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-bottom-2",
              day.isToday
                ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-card shadow-md"
                : "bg-secondary/40 hover:bg-secondary/60 hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            <p className={cn(
              "text-[10px] sm:text-xs font-medium mb-1",
              day.isToday ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {day.day}
            </p>
            <div className={cn(
              "mx-auto w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1",
              day.isToday ? "bg-primary-foreground/20" : "bg-card"
            )}>
              <span className={cn("scale-75 sm:scale-100", day.isToday ? "text-primary-foreground" : "text-card-foreground")}>
                {typeIcons[day.workout.type]}
              </span>
            </div>
            <p className={cn(
              "text-[9px] sm:text-[10px] font-medium truncate",
              day.isToday ? "text-primary-foreground" : "text-card-foreground"
            )}>
              {day.workout.duration}
            </p>
          </div>
        ))}
      </div>

      {/* Today's Workout Detail */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-primary uppercase tracking-wide">Today</span>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", intensityColors.hard)}>
              Hard
            </span>
          </div>
          <span className="text-sm text-muted-foreground">55 min</span>
        </div>
        <h4 className="text-lg font-semibold text-card-foreground">Tempo Run</h4>
        <p className="text-sm text-muted-foreground mt-1">20 min tempo at marathon pace</p>
      </div>

      {/* AI Explanation Collapsible */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </div>
            <span className="font-medium text-card-foreground">Why this plan?</span>
          </div>
          <svg
            className={cn(
              "w-5 h-5 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up-2 data-[state=open]:slide-down-2">
          <div className="mt-3 p-4 rounded-xl bg-card border border-border">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <p className="text-sm text-card-foreground leading-relaxed">
                  <span className="font-medium">Base-building phase</span> — Your marathon is 177 days away, so we&apos;re focusing on aerobic foundation before adding speed work.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <p className="text-sm text-card-foreground leading-relaxed">
                  <span className="font-medium">Dual-goal balancing</span> — Strength work on Tuesday supports both marathon power and Kilimanjaro altitude demands.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <p className="text-sm text-card-foreground leading-relaxed">
                  <span className="font-medium">Cycle awareness</span> — You&apos;re in your luteal phase. We&apos;ve added an extra recovery day and reduced Thursday&apos;s tempo slightly.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 shrink-0" />
                <p className="text-sm text-card-foreground leading-relaxed">
                  <span className="font-medium">Sleep quality strong</span> — Your 7h 24m average and improved HRV indicate good recovery. You&apos;re cleared for the tempo today.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 shrink-0" />
                <p className="text-sm text-card-foreground leading-relaxed">
                  <span className="font-medium">Mood trend considered</span> — You&apos;ve felt &quot;okay&quot; for 3 days in a row. Maintaining volume but watching for signs of fatigue.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Data sources: Apple Health, Strava, Flo, and your check-ins
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
