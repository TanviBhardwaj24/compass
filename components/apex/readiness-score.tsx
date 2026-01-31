"use client"

import { useEffect, useState } from "react"

export function ReadinessScore() {
  const targetScore = 82
  const [score, setScore] = useState(0)
  const circumference = 2 * Math.PI * 45

  useEffect(() => {
    const timer = setTimeout(() => setScore(targetScore), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-medium text-card-foreground">Readiness</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Based on recovery signals</p>
        </div>
        <span className="text-xs font-medium text-chart-1 bg-chart-1/10 px-2 py-1 rounded-full">Ready to train</span>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              className="stroke-secondary"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className="stroke-primary"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference - (score / 100) * circumference,
                transition: "stroke-dashoffset 1.5s ease-out"
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-card-foreground tabular-nums">{score}</span>
            <span className="text-xs text-muted-foreground">of 100</span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-1" />
            <span className="text-sm text-muted-foreground">Sleep</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">Good</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-1" />
            <span className="text-sm text-muted-foreground">HRV</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">Strong</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-4" />
            <span className="text-sm text-muted-foreground">Cycle</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">Moderate</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-1" />
            <span className="text-sm text-muted-foreground">Mood</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">Stable</span>
        </div>
      </div>

      <div className="mt-5 p-3 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-sm text-card-foreground">
          <span className="font-medium">You&apos;re cleared for today&apos;s tempo run.</span> Your body is well-recovered.
        </p>
      </div>
    </div>
  )
}
