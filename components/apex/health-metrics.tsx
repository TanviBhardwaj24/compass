"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface MetricProps {
  label: string
  value: string
  subValue?: string
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
  status?: "good" | "warning" | "attention"
}

function Metric({ label, value, subValue, icon, trend, status = "good" }: MetricProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
      <div className={cn(
        "p-2.5 rounded-xl",
        status === "good" && "bg-primary/10 text-primary",
        status === "warning" && "bg-accent/10 text-accent",
        status === "attention" && "bg-destructive/10 text-destructive"
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-xl font-semibold text-card-foreground">{value}</span>
          {subValue && (
            <span className="text-sm text-muted-foreground">{subValue}</span>
          )}
          {trend && (
            <span className={cn(
              "text-xs font-medium",
              trend === "up" && "text-primary",
              trend === "down" && "text-destructive",
              trend === "neutral" && "text-muted-foreground"
            )}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function HealthMetrics() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-primary/10">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-card-foreground">Apple Health</h3>
          <p className="text-sm text-muted-foreground">Recovery & readiness signals</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Metric
          label="Sleep"
          value="7h 24m"
          subValue="avg"
          status="good"
          trend="up"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          }
        />
        <Metric
          label="HRV"
          value="48"
          subValue="ms"
          status="good"
          trend="up"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          }
        />
        <Metric
          label="Resting HR"
          value="58"
          subValue="bpm"
          status="good"
          trend="neutral"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          }
        />
        <Metric
          label="Steps"
          value="8,432"
          subValue="today"
          status="good"
          trend="up"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
            </svg>
          }
        />
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Metric
            label="Cycle Phase"
            value="Luteal"
            subValue="Day 18"
            status="warning"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            }
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">via Flo</p>
      </div>
    </div>
  )
}
