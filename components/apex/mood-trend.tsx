"use client"

import { cn } from "@/lib/utils"

interface MoodEntry {
  date: string
  mood: "energized" | "okay" | "flat" | "low" | "burnt-out"
}

const moodHistory: MoodEntry[] = [
  { date: "Jan 24", mood: "okay" },
  { date: "Jan 25", mood: "flat" },
  { date: "Jan 26", mood: "okay" },
  { date: "Jan 27", mood: "okay" },
  { date: "Jan 28", mood: "okay" },
  { date: "Jan 29", mood: "energized" },
  { date: "Jan 30", mood: "okay" },
]

const moodEmojis = {
  energized: "⚡",
  okay: "😊",
  flat: "😐",
  low: "😔",
  "burnt-out": "🔥",
}

const moodColors = {
  energized: "bg-chart-1",
  okay: "bg-chart-4",
  flat: "bg-muted-foreground",
  low: "bg-accent",
  "burnt-out": "bg-destructive",
}

const moodHeights = {
  energized: "h-16",
  okay: "h-12",
  flat: "h-8",
  low: "h-5",
  "burnt-out": "h-3",
}

export function MoodTrend() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-medium text-card-foreground">Mood Trend</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Last 7 days</p>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-chart-4/10 text-chart-4">
          Stable
        </span>
      </div>

      <div className="flex items-end justify-between gap-2 h-20">
        {moodHistory.map((entry, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-full max-w-[32px] rounded-t-lg transition-all duration-300",
                moodColors[entry.mood],
                moodHeights[entry.mood]
              )}
            />
            <span className="text-[10px] text-muted-foreground">
              {entry.date.split(" ")[1]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Average this week</span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg">{moodEmojis.okay}</span>
            <span className="text-sm font-medium text-card-foreground">Okay</span>
          </div>
        </div>
      </div>
    </div>
  )
}
