"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const moods = [
  { emoji: "⚡", label: "Energized", value: "energized" },
  { emoji: "😊", label: "Okay", value: "okay" },
  { emoji: "😐", label: "Flat", value: "flat" },
  { emoji: "😔", label: "Low", value: "low" },
  { emoji: "🔥", label: "Burnt out", value: "burnt-out" },
]

interface MoodCheckinProps {
  onMoodSelect?: (mood: string) => void
  selectedMood?: string | null
}

export function MoodCheckin({ onMoodSelect, selectedMood }: MoodCheckinProps) {
  const [selected, setSelected] = useState<string | null>(selectedMood || null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSelect = (value: string) => {
    setIsAnimating(true)
    setSelected(value)
    setTimeout(() => {
      onMoodSelect?.(value)
    }, 400)
  }

  return (
    <div className={cn(
      "rounded-2xl bg-card p-6 shadow-sm border border-border transition-all duration-500",
      isAnimating && "scale-[0.98] opacity-90"
    )}>
      <div className="mb-5">
        <h3 className="text-lg font-medium text-card-foreground">How are you feeling today?</h3>
        <p className="text-sm text-muted-foreground mt-1">Takes 5 seconds — helps personalize your training</p>
      </div>
      
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        {moods.map((mood, index) => (
          <button
            key={mood.value}
            onClick={() => handleSelect(mood.value)}
            style={{ animationDelay: `${index * 50}ms` }}
            className={cn(
              "flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all duration-200 flex-1",
              "hover:bg-secondary/80 hover:scale-105 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "animate-in fade-in slide-in-from-bottom-2",
              selected === mood.value
                ? "bg-primary/10 ring-2 ring-primary scale-105 shadow-md"
                : "bg-secondary/40"
            )}
            aria-label={`Select mood: ${mood.label}`}
          >
            <span className={cn(
              "text-xl sm:text-2xl transition-transform duration-200",
              selected === mood.value && "scale-110"
            )} role="img" aria-hidden="true">
              {mood.emoji}
            </span>
            <span className={cn(
              "text-[10px] sm:text-xs font-medium transition-colors duration-200",
              selected === mood.value ? "text-primary" : "text-muted-foreground"
            )}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-5 p-3 rounded-xl bg-primary/5 border border-primary/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-sm text-primary text-center font-medium">
            Thanks for checking in — your plan has been adjusted.
          </p>
        </div>
      )}
    </div>
  )
}
