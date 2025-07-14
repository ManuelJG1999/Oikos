"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ApplyPage() {
  const [language, setLanguage] = useState("en")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    program: "",
    amount: "",
    description: "",
  })

  const searchParams = useSearchParams()
  const poolId = searchParams.get("poolId")
  const poolTitle = searchParams.get("poolTitle")
  const category = searchParams.get("category")

  // Pre-fill form if coming from a specific pool
  useEffect(() => {
    if (poolTitle) {
      setFormData((prev) => ({
        ...prev,
        program: poolTitle,
      }))
    }
  }, [poolTitle])

  const content = {
    en: {
      title: "Apply for Educational Funding",
      subtitle: "Get access to microcredits for your professional development",
      selectedPool: "Selected Pool",
      form: {
        name: "Full Name",
        email: "Email Address",
        program: "Educational Program",
        amount: "Requested Amount (USDC)",
        description: "Tell us about your goals",
        submit: "Submit Application",
      },
      success: {
        title: "Application Submitted Successfully!",
        message: "We have received your application and will review it within 3-5 business days.",
        backToPools: "Back to Pools",
        submitAnother: "Submit Another Application",
      },
    },
    es: {
      title: "Solicitar Financiamiento Educativo",
      subtitle: "Accede a microcréditos para tu desarrollo profesional",
      selectedPool: "Pool Seleccionado",
      form: {
        name: "Nombre Completo",
        email: "Correo Electrónico",
        program: "Programa Educativo",
        amount: "Monto Solicitado (USDC)",
        description: "Cuéntanos sobre tus objetivos",
        submit: "Enviar Solicitud",
      },
      success: {
        title: "¡Solicitud Enviada Exitosamente!",
        message: "Hemos recibido tu solicitud y la revisaremos en 3-5 días hábiles.",
        backToPools: "Volver a Pools",
        submitAnother: "Enviar Otra Solicitud",
      },
    },
  }

  const t = content[language as keyof typeof content]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would send the application data to your backend
    console.log("Submitting application:", {
      ...formData,
      poolId,
      poolTitle,
      category,
    })

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({
      name: "",
      email: "",
      program: poolTitle || "",
      amount: "",
      description: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium border border-gray-700 hover:border-gray-600"
              >
                Home
              </Link>
              <div className="text-2xl font-bold">Oikos</div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="text-gray-300 hover:text-white text-xs border border-gray-600 hover:border-gray-500"
            >
              {language === "en" ? "ES" : "EN"}
            </Button>
          </div>
        </div>
      </header>

      {/* Apply Section */}
      <section className="py-20 px-4 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('/images/stellar-logo.png')`,
              backgroundSize: "250px 250px",
              backgroundRepeat: "repeat",
              backgroundPosition: "0 0",
            }}
          />
        </div>

        <div className="container mx-auto max-w-2xl relative z-10">
          {!isSubmitted ? (
            <>
              <div className="text-center space-y-4 mb-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-blue-400" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white">{t.title}</h1>
                <p className="text-xl text-gray-400">{t.subtitle}</p>
              </div>

              {/* Show selected pool info if coming from pools page */}
              {poolTitle && (
                <Card className="bg-gray-800 border-gray-700 mb-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      {t.selectedPool}
                      {category && (
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                          {category}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-gray-400">{poolTitle}</CardDescription>
                  </CardHeader>
                </Card>
              )}

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Application Form</CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill out the form below to apply for educational funding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        {t.form.name}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        {t.form.email}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="program" className="text-white">
                        {t.form.program}
                      </Label>
                      <Input
                        id="program"
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        placeholder="e.g., Full Stack Development Bootcamp"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-white">
                        {t.form.amount}
                      </Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        placeholder="5000"
                        min="100"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-white">
                        {t.form.description}
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                        placeholder="Describe your educational goals and how this funding will help you achieve them..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    >
                      {t.form.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-white">{t.success.title}</h1>
                <p className="text-xl text-gray-400 max-w-lg mx-auto">{t.success.message}</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  onClick={() => (window.location.href = "/pools")}
                >
                  {t.success.backToPools}
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  onClick={resetForm}
                >
                  {t.success.submitAnother}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
