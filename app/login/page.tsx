"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSwitcherSimple } from "@/components/language-switcher-simple"
import { ModeToggle } from "@/components/mode-toggle"
import { Package } from "lucide-react"
import { useTranslations } from "@/lib/translations"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const t = useTranslations()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple authentication check
    if (username === "Ozoda" && password === "Developer2899") {
      // Set a session token in localStorage
      localStorage.setItem("isAuthenticated", "true")
      // Redirect to dashboard
      router.push("/")
    } else {
      setError(t("invalidCredentials"))
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-end p-4 space-x-2">
        <LanguageSwitcherSimple />
        <ModeToggle />
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-teal-600 text-white p-3 rounded-md">
                <Package className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl">{t("loginTitle")}</CardTitle>
            <CardDescription>{t("loginDescription")}</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t("username")}</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("usernamePlaceholder")}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Button variant="link" className="p-0 h-auto text-sm" type="button">
                    {t("forgotPassword")}
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("loggingIn") : t("login")}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className="p-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; 2024 {t("appName")}. {t("allRightsReserved")}
        </p>
      </div>
    </div>
  )
}
