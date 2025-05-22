"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslations } from "@/lib/translations"
import {
  User,
  Building,
  Bell,
  Users,
  Link,
  Globe,
  Clock,
  Calendar,
  Shield,
  Database,
  Save,
  Upload,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ShoppingCart,
  Plus,
} from "lucide-react"

export default function SettingsPage() {
  const t = useTranslations()
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("settings")}</h1>
          <p className="text-muted-foreground">{t("manageGeneralSettings")}</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {t("general")}
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            {t("company")}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {t("notifications")}
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t("users")}
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            {t("integrations")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-teal-500" />
                {t("generalSettings")}
              </CardTitle>
              <CardDescription>{t("manageGeneralSettings")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name" className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-slate-500" />
                  {t("systemName")}
                </Label>
                <Input id="system-name" defaultValue="Wholesale Clothing CRM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  {t("timezone")}
                </Label>
                <select
                  id="timezone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>UTC-08:00 Pacific Time (US & Canada)</option>
                  <option>UTC-05:00 Eastern Time (US & Canada)</option>
                  <option>UTC+00:00 London</option>
                  <option>UTC+01:00 Paris</option>
                  <option>UTC+05:00 Tashkent</option>
                  <option>UTC+08:00 Beijing</option>
                  <option>UTC+09:00 Tokyo</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  {t("dateFormat")}
                </Label>
                <select
                  id="date-format"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-backup" />
                <Label htmlFor="auto-backup" className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-slate-500" />
                  {t("enableAutomaticBackups")}
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    {t("saving")}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {t("saveChanges")}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-teal-500" />
                {t("companyInformation")}
              </CardTitle>
              <CardDescription>{t("updateCompanyDetails")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Company Logo" />
                  <AvatarFallback className="text-2xl">CW</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {t("uploadLogo")}
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-name" className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-slate-500" />
                  {t("companyName")}
                </Label>
                <Input id="company-name" defaultValue="ClothWholesale Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  {t("address")}
                </Label>
                <Textarea id="company-address" defaultValue="123 Business Street, Suite 100, Business City, 12345" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    {t("phone")}
                  </Label>
                  <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    {t("email")}
                  </Label>
                  <Input id="company-email" defaultValue="info@clothwholesale.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-tax-id" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-500" />
                  {t("taxIDVAT")}
                </Label>
                <Input id="company-tax-id" defaultValue="US123456789" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    {t("saving")}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {t("saveChanges")}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-teal-500" />
                {t("notificationSettings")}
              </CardTitle>
              <CardDescription>{t("configureNotifications")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium">{t("newOrderNotifications")}</p>
                      <p className="text-sm text-muted-foreground">{t("receiveNewOrderNotifications")}</p>
                    </div>
                  </div>
                  <Switch id="new-order-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium">{t("lowStockAlerts")}</p>
                      <p className="text-sm text-muted-foreground">{t("receiveLowStockAlerts")}</p>
                    </div>
                  </div>
                  <Switch id="low-stock-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium">{t("paymentConfirmations")}</p>
                      <p className="text-sm text-muted-foreground">{t("receivePaymentConfirmations")}</p>
                    </div>
                  </div>
                  <Switch id="payment-confirmations" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-medium">{t("systemUpdates")}</p>
                      <p className="text-sm text-muted-foreground">{t("receiveSystemUpdates")}</p>
                    </div>
                  </div>
                  <Switch id="system-updates" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    {t("saving")}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {t("saveChanges")}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-500" />
                {t("userManagement")}
              </CardTitle>
              <CardDescription>{t("manageUserAccounts")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ozoda" />
                      <AvatarFallback>OZ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Ozoda</p>
                      <p className="text-sm text-muted-foreground">ozoda@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-teal-100 text-teal-800 border-teal-200 flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Admin
                    </Badge>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      {t("edit")}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Manager
                    </Badge>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      {t("edit")}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jane Smith" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">jane@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-slate-100 text-slate-800 border-slate-200 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Staff
                    </Badge>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      {t("edit")}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  {t("addUser")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5 text-teal-500" />
                {t("integrations")}
              </CardTitle>
              <CardDescription>{t("connectThirdParty")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <Database className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">PostgreSQL Database</p>
                      <p className="text-sm text-muted-foreground">Connected to your database</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-md">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email Service</p>
                      <p className="text-sm text-muted-foreground">Send emails to customers</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-md">
                      <CreditCard className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Gateway</p>
                      <p className="text-sm text-muted-foreground">Process payments</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Link className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  {t("addIntegration")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
