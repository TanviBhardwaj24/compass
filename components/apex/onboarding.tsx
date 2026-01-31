"use client"

import React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const STEPS = ["Welcome", "Goals", "Goal Details", "Lifestyle", "Integrations", "Your Plan"] as const
type Step = (typeof STEPS)[number]

interface GoalOption {
  id: string
  label: string
  description: string
  icon: React.ReactNode
}

const goalOptions: GoalOption[] = [
  {
    id: "marathon",
    label: "Run a marathon",
    description: "Train for 26.2 miles",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    id: "half-marathon",
    label: "Run a half marathon",
    description: "Train for 13.1 miles",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    id: "climb",
    label: "Climb a mountain",
    description: "Summit your peak",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
      </svg>
    ),
  },
  {
    id: "triathlon",
    label: "Complete a triathlon",
    description: "Swim, bike, run",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
      </svg>
    ),
  },
  {
    id: "strength",
    label: "Build strength",
    description: "Get stronger, feel better",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: "wellness",
    label: "Improve overall wellness",
    description: "Sleep, stress, energy",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    id: "custom",
    label: "Something else",
    description: "Tell us your goal",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
]

const experienceLevels = [
  { id: "beginner", label: "Beginner", description: "New to this type of training" },
  { id: "intermediate", label: "Intermediate", description: "Some experience, ready to grow" },
  { id: "advanced", label: "Advanced", description: "Experienced and looking to optimize" },
]

interface LifestyleOption {
  id: string
  label: string
  category: string
}

const lifestyleOptions: LifestyleOption[] = [
  { id: "vegetarian", label: "Vegetarian", category: "Diet" },
  { id: "vegan", label: "Vegan", category: "Diet" },
  { id: "gluten-free", label: "Gluten-free", category: "Diet" },
  { id: "dairy-free", label: "Dairy-free", category: "Diet" },
  { id: "keto", label: "Keto", category: "Diet" },
  { id: "early-bird", label: "Early bird", category: "Schedule" },
  { id: "night-owl", label: "Night owl", category: "Schedule" },
  { id: "busy-professional", label: "Busy professional", category: "Schedule" },
  { id: "parent", label: "Parent", category: "Lifestyle" },
  { id: "shift-worker", label: "Shift worker", category: "Lifestyle" },
  { id: "traveler", label: "Frequent traveler", category: "Lifestyle" },
  { id: "cycle-aware", label: "Cycle-aware training", category: "Health" },
  { id: "injury-history", label: "Managing past injury", category: "Health" },
  { id: "chronic-condition", label: "Chronic condition", category: "Health" },
]

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

const integrationOptions: Integration[] = [
  {
    id: "apple-health",
    name: "Apple Health",
    description: "Sleep, HRV, activity, workouts",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
  },
  {
    id: "oura",
    name: "Oura Ring",
    description: "Sleep, readiness, activity",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    ),
  },
  {
    id: "strava",
    name: "Strava",
    description: "Running, cycling, workouts",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
      </svg>
    ),
  },
  {
    id: "garmin",
    name: "Garmin",
    description: "GPS, heart rate, training",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93V4.07z" />
      </svg>
    ),
  },
  {
    id: "whoop",
    name: "WHOOP",
    description: "Strain, recovery, sleep",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="4" y="6" width="16" height="12" rx="6" />
      </svg>
    ),
  },
  {
    id: "flo",
    name: "Flo",
    description: "Cycle tracking, predictions",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: "fitbit",
    name: "Fitbit",
    description: "Activity, sleep, heart rate",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2m0 6a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2m0 6a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2m0 6a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2" />
      </svg>
    ),
  },
  {
    id: "myfitnesspal",
    name: "MyFitnessPal",
    description: "Nutrition, calories, macros",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
]

export interface GoalDetail {
  goalId: string
  targetDate: string
  eventName?: string
  experienceLevel: string
}

export interface OnboardingData {
  name: string
  goals: string[]
  goalDetails: GoalDetail[]
  customGoal?: string
  lifestyle: string[]
  integrations: string[]
  generatedPlan?: GeneratedPlan
}

interface GeneratedPlan {
  weeklySchedule: {
    day: string
    activity: string
    duration: string
    type: "run" | "cross" | "strength" | "rest" | "long"
  }[]
  totalWeeks: number
  startDate: string
  milestones: {
    week: number
    description: string
  }[]
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState<Step>("Welcome")
  const [name, setName] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [goalDetails, setGoalDetails] = useState<GoalDetail[]>([])
  const [customGoal, setCustomGoal] = useState("")
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>([])
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null)

  const currentStepIndex = STEPS.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => {
      const newGoals = prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId]
      // Initialize goal details for new goals
      if (!prev.includes(goalId)) {
        setGoalDetails((details) => [
          ...details,
          { goalId, targetDate: "", eventName: "", experienceLevel: "intermediate" },
        ])
      } else {
        setGoalDetails((details) => details.filter((d) => d.goalId !== goalId))
      }
      return newGoals
    })
  }

  const updateGoalDetail = (goalId: string, field: keyof GoalDetail, value: string) => {
    setGoalDetails((prev) => prev.map((d) => (d.goalId === goalId ? { ...d, [field]: value } : d)))
  }

  const toggleLifestyle = (optionId: string) => {
    setSelectedLifestyle((prev) =>
      prev.includes(optionId) ? prev.filter((o) => o !== optionId) : [...prev, optionId]
    )
  }

  const toggleIntegration = (integrationId: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(integrationId) ? prev.filter((i) => i !== integrationId) : [...prev, integrationId]
    )
  }

  const generatePlan = () => {
    setIsGeneratingPlan(true)

    // Simulate AI plan generation
    setTimeout(() => {
      const primaryGoal = goalDetails[0]
      const goalOption = goalOptions.find((g) => g.id === primaryGoal?.goalId)

      // Generate a sample plan based on the goal
      const isRunning = ["marathon", "half-marathon"].includes(primaryGoal?.goalId || "")
      const isClimb = primaryGoal?.goalId === "climb"

      const plan: GeneratedPlan = {
        weeklySchedule: isRunning
          ? [
              { day: "Mon", activity: "Easy Run", duration: "30 min", type: "run" },
              { day: "Tue", activity: "Strength", duration: "45 min", type: "strength" },
              { day: "Wed", activity: "Tempo Run", duration: "40 min", type: "run" },
              { day: "Thu", activity: "Rest / Yoga", duration: "30 min", type: "rest" },
              { day: "Fri", activity: "Easy Run", duration: "35 min", type: "run" },
              { day: "Sat", activity: "Long Run", duration: "60-90 min", type: "long" },
              { day: "Sun", activity: "Active Recovery", duration: "30 min", type: "cross" },
            ]
          : isClimb
            ? [
                { day: "Mon", activity: "Hiking", duration: "60 min", type: "long" },
                { day: "Tue", activity: "Strength", duration: "45 min", type: "strength" },
                { day: "Wed", activity: "Cardio", duration: "40 min", type: "cross" },
                { day: "Thu", activity: "Rest", duration: "—", type: "rest" },
                { day: "Fri", activity: "Strength", duration: "45 min", type: "strength" },
                { day: "Sat", activity: "Long Hike", duration: "2-3 hrs", type: "long" },
                { day: "Sun", activity: "Active Recovery", duration: "30 min", type: "rest" },
              ]
            : [
                { day: "Mon", activity: "Strength", duration: "45 min", type: "strength" },
                { day: "Tue", activity: "Cardio", duration: "30 min", type: "cross" },
                { day: "Wed", activity: "Strength", duration: "45 min", type: "strength" },
                { day: "Thu", activity: "Rest / Yoga", duration: "30 min", type: "rest" },
                { day: "Fri", activity: "Strength", duration: "45 min", type: "strength" },
                { day: "Sat", activity: "Long Activity", duration: "60 min", type: "long" },
                { day: "Sun", activity: "Active Recovery", duration: "30 min", type: "rest" },
              ],
        totalWeeks: primaryGoal?.goalId === "marathon" ? 20 : primaryGoal?.goalId === "half-marathon" ? 12 : 16,
        startDate: new Date().toISOString().split("T")[0],
        milestones: [
          { week: 4, description: "Build aerobic base" },
          { week: 8, description: "Increase intensity" },
          { week: 12, description: "Peak training" },
          { week: 16, description: "Taper and race prep" },
        ],
      }

      setGeneratedPlan(plan)
      setIsGeneratingPlan(false)
    }, 2500)
  }

  // Generate plan when reaching the plan step
  useEffect(() => {
    if (currentStep === "Your Plan" && !generatedPlan && !isGeneratingPlan) {
      generatePlan()
    }
  }, [currentStep, generatedPlan, isGeneratingPlan])

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex])
    } else {
      onComplete({
        name,
        goals: selectedGoals,
        goalDetails,
        customGoal: selectedGoals.includes("custom") ? customGoal : undefined,
        lifestyle: selectedLifestyle,
        integrations: selectedIntegrations,
        generatedPlan: generatedPlan || undefined,
      })
    }
  }

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex])
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case "Welcome":
        return name.trim().length >= 2
      case "Goals":
        return selectedGoals.length > 0 && (!selectedGoals.includes("custom") || customGoal.trim().length > 0)
      case "Goal Details":
        return goalDetails.every((d) => d.targetDate && d.experienceLevel)
      case "Lifestyle":
        return true
      case "Integrations":
        return true
      case "Your Plan":
        return generatedPlan !== null
      default:
        return false
    }
  }

  const getGoalLabel = (goalId: string) => {
    return goalOptions.find((g) => g.id === goalId)?.label || goalId
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 bg-secondary">
        <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-in fade-in duration-500">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <svg
                className="w-6 h-6 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l2 4-2 4-2-4 2-4z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-2xl font-semibold text-foreground font-serif tracking-tight">Compass</span>
          </div>

          {/* Welcome Step */}
          {currentStep === "Welcome" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold text-foreground font-serif text-balance">
                  Train toward what matters
                </h1>
                <p className="text-muted-foreground text-balance max-w-md mx-auto">
                  Compass learns your body, emotions, and life goals to create training that actually fits your life.
                </p>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-foreground">What should we call you?</span>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your first name"
                    className="mt-2 h-12 text-base"
                    autoFocus
                  />
                </label>
              </div>
            </div>
          )}

          {/* Goals Step */}
          {currentStep === "Goals" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground font-serif">
                  What are you training toward, {name}?
                </h2>
                <p className="text-muted-foreground text-sm">Select all that apply. You can always add more later.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goalOptions.map((goal, index) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-200 animate-in fade-in slide-in-from-bottom-2",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      selectedGoals.includes(goal.id)
                        ? "bg-primary/10 ring-2 ring-primary"
                        : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        selectedGoals.includes(goal.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-muted-foreground"
                      )}
                    >
                      {goal.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{goal.label}</p>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {selectedGoals.includes("custom") && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Input
                    type="text"
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    placeholder="Describe your goal..."
                    className="h-12"
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}

          {/* Goal Details Step */}
          {currentStep === "Goal Details" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground font-serif">Tell us more</h2>
                <p className="text-muted-foreground text-sm">
                  Help us build the perfect plan for your {selectedGoals.length > 1 ? "goals" : "goal"}.
                </p>
              </div>

              <div className="space-y-6">
                {goalDetails.map((detail, index) => {
                  const goalOption = goalOptions.find((g) => g.id === detail.goalId)
                  return (
                    <div
                      key={detail.goalId}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="p-5 rounded-xl bg-card border border-border space-y-4 animate-in fade-in slide-in-from-bottom-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">{goalOption?.icon}</div>
                        <div>
                          <p className="font-medium text-foreground">{goalOption?.label}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground">Event name (optional)</label>
                          <Input
                            type="text"
                            value={detail.eventName || ""}
                            onChange={(e) => updateGoalDetail(detail.goalId, "eventName", e.target.value)}
                            placeholder="e.g., SF Marathon, Mt. Kilimanjaro"
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground">Target date</label>
                          <Input
                            type="date"
                            value={detail.targetDate}
                            onChange={(e) => updateGoalDetail(detail.goalId, "targetDate", e.target.value)}
                            className="mt-1.5"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Experience level</label>
                          <div className="grid grid-cols-3 gap-2">
                            {experienceLevels.map((level) => (
                              <button
                                key={level.id}
                                onClick={() => updateGoalDetail(detail.goalId, "experienceLevel", level.id)}
                                className={cn(
                                  "p-3 rounded-lg text-center transition-all duration-200",
                                  "hover:scale-[1.02] active:scale-[0.98]",
                                  detail.experienceLevel === level.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary/50 hover:bg-secondary text-foreground"
                                )}
                              >
                                <p className="text-sm font-medium">{level.label}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Lifestyle Step */}
          {currentStep === "Lifestyle" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground font-serif">
                  Tell us about your lifestyle
                </h2>
                <p className="text-muted-foreground text-sm">
                  This helps us personalize your training and nutrition guidance.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {lifestyleOptions.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => toggleLifestyle(option.id)}
                    style={{ animationDelay: `${index * 30}ms` }}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 animate-in fade-in",
                      "hover:scale-105 active:scale-95",
                      selectedLifestyle.includes(option.id)
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary/60 text-foreground hover:bg-secondary"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Skip this step if you prefer — you can set preferences later.
              </p>
            </div>
          )}

          {/* Integrations Step */}
          {currentStep === "Integrations" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground font-serif">Connect your apps</h2>
                <p className="text-muted-foreground text-sm">
                  Sync your health data for personalized insights and training adjustments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {integrationOptions.map((integration, index) => (
                  <button
                    key={integration.id}
                    onClick={() => toggleIntegration(integration.id)}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 animate-in fade-in slide-in-from-bottom-2",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      selectedIntegrations.includes(integration.id)
                        ? "bg-primary/10 ring-2 ring-primary"
                        : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        selectedIntegrations.includes(integration.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-muted-foreground"
                      )}
                    >
                      {integration.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{integration.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{integration.description}</p>
                    </div>
                    {selectedIntegrations.includes(integration.id) && (
                      <svg
                        className="w-5 h-5 text-primary shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground">
                You can connect more apps anytime from Settings.
              </p>
            </div>
          )}

          {/* Plan Generation Step */}
          {currentStep === "Your Plan" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {isGeneratingPlan ? (
                <div className="text-center space-y-6 py-8">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-secondary" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8l2 4-2 4-2-4 2-4z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground font-serif">Creating your plan...</h2>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                      Analyzing your goals, experience, and lifestyle to build the perfect training plan.
                    </p>
                  </div>
                </div>
              ) : generatedPlan ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-chart-1/10 text-chart-1 mb-2">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground font-serif">
                      Your plan is ready, {name}!
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {generatedPlan.totalWeeks} weeks to reach your goal. Here&apos;s your first week:
                    </p>
                  </div>

                  {/* Weekly Schedule Preview */}
                  <div className="rounded-xl bg-card border border-border p-4">
                    <div className="grid grid-cols-7 gap-1.5">
                      {generatedPlan.weeklySchedule.map((day, index) => (
                        <div
                          key={day.day}
                          style={{ animationDelay: `${index * 50}ms` }}
                          className={cn(
                            "p-2 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2",
                            day.type === "rest" ? "bg-secondary/30" : "bg-secondary/60"
                          )}
                        >
                          <p className="text-[10px] font-medium text-muted-foreground mb-1">{day.day}</p>
                          <div
                            className={cn(
                              "w-6 h-6 mx-auto rounded-full flex items-center justify-center mb-1",
                              day.type === "run" && "bg-primary/10 text-primary",
                              day.type === "long" && "bg-chart-1/10 text-chart-1",
                              day.type === "strength" && "bg-accent/10 text-accent",
                              day.type === "cross" && "bg-chart-3/10 text-chart-3",
                              day.type === "rest" && "bg-muted text-muted-foreground"
                            )}
                          >
                            {day.type === "run" && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                            )}
                            {day.type === "long" && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                />
                              </svg>
                            )}
                            {day.type === "strength" && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                />
                              </svg>
                            )}
                            {day.type === "cross" && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                            )}
                            {day.type === "rest" && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                                />
                              </svg>
                            )}
                          </div>
                          <p className="text-[9px] font-medium text-foreground truncate">{day.activity.split(" ")[0]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="rounded-xl bg-secondary/30 p-4">
                    <p className="text-sm font-medium text-foreground mb-3">Training milestones</p>
                    <div className="space-y-2">
                      {generatedPlan.milestones.slice(0, 3).map((milestone, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-xs font-medium text-muted-foreground">
                            W{milestone.week}
                          </div>
                          <p className="text-sm text-foreground">{milestone.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-center text-xs text-muted-foreground">
                    Your plan adapts to your mood, sleep, and recovery data each day.
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {currentStepIndex > 0 && currentStep !== "Your Plan" ? (
              <Button variant="ghost" onClick={prevStep} className="gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Back
              </Button>
            ) : (
              <div />
            )}

            <Button onClick={nextStep} disabled={!canProceed()} className="gap-2 min-w-[120px]">
              {currentStep === "Your Plan" ? "Start Training" : "Continue"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index <= currentStepIndex ? "bg-primary" : "bg-secondary"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground">Compass — Train toward what matters</p>
      </footer>
    </div>
  )
}
