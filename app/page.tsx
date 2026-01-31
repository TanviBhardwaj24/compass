"use client"

import { useState, useEffect } from "react"
import { Header, type NavItem } from "@/components/apex/header"
import { MoodCheckin } from "@/components/apex/mood-checkin"
import { WeeklySchedule } from "@/components/apex/weekly-schedule"
import { ActiveGoals } from "@/components/apex/active-goals"
import { HealthMetrics } from "@/components/apex/health-metrics"
import { ConnectedApps } from "@/components/apex/connected-apps"
import { MoodTrend } from "@/components/apex/mood-trend"
import { ReadinessScore } from "@/components/apex/readiness-score"
import { Onboarding, type OnboardingData } from "@/components/apex/onboarding"

export default function CompassDashboard() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<NavItem>("Dashboard")
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null)
  const [userData, setUserData] = useState<OnboardingData | null>(null)

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem("compass_onboarded")
    const storedUserData = localStorage.getItem("compass_user_data")
    setIsOnboarded(onboardingComplete === "true")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }

    // Demo reset shortcut: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "R") {
        e.preventDefault()
        localStorage.removeItem("compass_onboarded")
        localStorage.removeItem("compass_user_data")
        window.location.reload()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleOnboardingComplete = (data: OnboardingData) => {
    localStorage.setItem("compass_onboarded", "true")
    localStorage.setItem("compass_user_data", JSON.stringify(data))
    setUserData(data)
    setIsOnboarded(true)
  }

  // Show loading state while checking onboarding status
  if (isOnboarded === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm animate-pulse">
          <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l2 4-2 4-2-4 2-4z" fill="currentColor" />
          </svg>
        </div>
      </div>
    )
  }

  // Show onboarding if not completed
  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  const userName = userData?.name || "Tanvi"

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground font-serif text-balance">
            Good morning, {userName}
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
            <span>Thursday, January 30</span>
            <span className="hidden sm:inline text-border">·</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Week 12 of 24
            </span>
          </p>
        </div>

        {/* Tab Content */}
        {activeTab === "Dashboard" && (
          <>
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Mood Check-in - Only show if not completed */}
                {!selectedMood && (
                  <MoodCheckin onMoodSelect={setSelectedMood} />
                )}

                {/* Weekly Schedule with AI Explanation */}
                <WeeklySchedule />

                {/* Active Goals */}
                <ActiveGoals />
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Readiness Score */}
                <ReadinessScore />

                {/* Health Metrics */}
                <HealthMetrics />

                {/* Mood Trend */}
                <MoodTrend />

                {/* Connected Apps */}
                <ConnectedApps />
              </div>
            </div>

            {/* AI Coach Message */}
            <div className="mt-8 rounded-2xl bg-card p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 shrink-0 relative">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-chart-1 rounded-full border-2 border-card" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-card-foreground">From your AI Coach</h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">Just now</span>
                  </div>
                  <p className="text-card-foreground leading-relaxed">
                    Your consistency is paying off — <span className="font-medium text-chart-1">sleep quality up 12%</span> this month and running economy is trending up. For today&apos;s tempo, stay relaxed through the first half. The goal is controlled effort, not max speed. <span className="font-medium">Trust the process.</span>
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <button className="text-sm font-medium text-primary hover:text-primary/80 transition-all duration-200 hover:underline underline-offset-2">
                      Ask a question
                    </button>
                    <span className="text-muted-foreground">·</span>
                    <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:underline underline-offset-2">
                      View insights
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "Training" && (
          <div className="rounded-2xl bg-card p-8 shadow-sm border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground font-serif">Training Plans</h2>
                <p className="text-muted-foreground">Your personalized training schedule and history</p>
              </div>
            </div>
            <WeeklySchedule />
          </div>
        )}

        {activeTab === "Insights" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-card p-8 shadow-sm border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground font-serif">Your Insights</h2>
                  <p className="text-muted-foreground">Trends and patterns from your health data</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HealthMetrics />
                <MoodTrend />
              </div>
            </div>
            <ReadinessScore />
          </div>
        )}

        {activeTab === "Goals" && (
          <div className="rounded-2xl bg-card p-8 shadow-sm border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground font-serif">Your Goals</h2>
                <p className="text-muted-foreground">Track progress toward your real-life milestones</p>
              </div>
            </div>
            <ActiveGoals />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pb-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l2 4-2 4-2-4 2-4z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm font-medium text-foreground">Compass</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto text-balance">
            Train toward what matters.
          </p>
        </footer>
      </main>
    </div>
  )
}
