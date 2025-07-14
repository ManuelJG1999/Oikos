"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PoolsPage() {
  const [language, setLanguage] = useState("en")
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false)
  const [selectedPool, setSelectedPool] = useState<any>(null)
  const [contributionAmount, setContributionAmount] = useState("")
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [contributionStep, setContributionStep] = useState<"connect" | "amount" | "confirm" | "success">("connect")
  const router = useRouter()

  const pools = [
    {
      id: 1,
      category: "Technology",
      title: "Full Stack Development Bootcamp",
      raised: "45,230 USDC",
      target: "60,000 USDC",
      roi: "12%",
      students: 23,
      progress: 75,
    },
    {
      id: 2,
      category: "Health Sciences",
      title: "Medical School Preparation",
      raised: "67,800 USDC",
      target: "85,000 USDC",
      roi: "15%",
      students: 31,
      progress: 80,
    },
    {
      id: 3,
      category: "Engineering",
      title: "Mechanical Engineering Degree",
      raised: "52,400 USDC",
      target: "75,000 USDC",
      roi: "11%",
      students: 19,
      progress: 70,
    },
    {
      id: 4,
      category: "Business",
      title: "MBA Program Financing",
      raised: "89,200 USDC",
      target: "120,000 USDC",
      roi: "14%",
      students: 27,
      progress: 74,
    },
    {
      id: 5,
      category: "Languages",
      title: "Professional English Certification",
      raised: "28,500 USDC",
      target: "40,000 USDC",
      roi: "8%",
      students: 35,
      progress: 71,
    },
    {
      id: 6,
      category: "Design",
      title: "UX/UI Design Specialization",
      raised: "34,600 USDC",
      target: "50,000 USDC",
      roi: "10%",
      students: 22,
      progress: 69,
    },
    {
      id: 7,
      category: "Data Science",
      title: "Data Analytics Master's",
      raised: "71,300 USDC",
      target: "95,000 USDC",
      roi: "13%",
      students: 16,
      progress: 75,
    },
    {
      id: 8,
      category: "Law",
      title: "Legal Studies Program",
      raised: "43,800 USDC",
      target: "65,000 USDC",
      roi: "9%",
      students: 14,
      progress: 67,
    },
    {
      id: 9,
      category: "Marketing",
      title: "Digital Marketing Certification",
      raised: "25,900 USDC",
      target: "35,000 USDC",
      roi: "7%",
      students: 28,
      progress: 74,
    },
  ]

  const stellarWallets = [
    {
      name: "Freighter",
      image: "/images/freighter-icon.jpg",
    },
    {
      name: "Lobstr",
      image: "/images/lobstr-wallet.png",
    },
    {
      name: "xBull",
      image: "/images/xbull-logo.png",
    },
  ]

  const content = {
    en: {
      title: "Available Pools",
      subtitle: "Discover investment opportunities with social impact",
      contribute: "Contribute",
      apply: "Apply",
      students: "students",
      completed: "completed",
      contribution: {
        title: "Contribute to Pool",
        connectWallet: "Connect Your Wallet",
        selectWallet: "Select your preferred Stellar wallet",
        enterAmount: "Enter Investment Amount",
        amountLabel: "Amount (USDC)",
        amountPlaceholder: "Enter amount to invest",
        confirmTitle: "Confirm Investment",
        poolLabel: "Pool:",
        amountLabel2: "Investment Amount:",
        roiLabel: "Expected ROI:",
        confirmButton: "Confirm Investment",
        successTitle: "Investment Successful!",
        successMessage: "Your investment has been processed successfully.",
        viewDashboard: "View Dashboard",
        close: "Close",
        next: "Next",
        back: "Back",
      },
    },
    es: {
      title: "Pools Disponibles",
      subtitle: "Descubre oportunidades de inversión con impacto social",
      contribute: "Aportar",
      apply: "Solicitar",
      students: "estudiantes",
      completed: "completado",
      contribution: {
        title: "Aportar al Pool",
        connectWallet: "Conecta tu Wallet",
        selectWallet: "Selecciona tu wallet de Stellar preferida",
        enterAmount: "Ingresa Monto de Inversión",
        amountLabel: "Monto (USDC)",
        amountPlaceholder: "Ingresa monto a invertir",
        confirmTitle: "Confirmar Inversión",
        poolLabel: "Pool:",
        amountLabel2: "Monto de Inversión:",
        roiLabel: "ROI Esperado:",
        confirmButton: "Confirmar Inversión",
        successTitle: "¡Inversión Exitosa!",
        successMessage: "Tu inversión ha sido procesada exitosamente.",
        viewDashboard: "Ver Dashboard",
        close: "Cerrar",
        next: "Siguiente",
        back: "Atrás",
      },
    },
  }

  const t = content[language as keyof typeof content]

  const handleContribute = (pool: any) => {
    setSelectedPool(pool)
    setIsContributeModalOpen(true)
    setContributionStep("connect")
    setContributionAmount("")
  }

  const handleApply = (pool: any) => {
    // Navigate to apply page with pool information
    const queryParams = new URLSearchParams({
      poolId: pool.id.toString(),
      poolTitle: pool.title,
      category: pool.category,
    })
    router.push(`/apply?${queryParams.toString()}`)
  }

  const handleWalletConnect = (walletName: string) => {
    setConnectedWallet(walletName)
    setIsWalletConnected(true)
    setContributionStep("amount")
  }

  const handleAmountNext = () => {
    if (contributionAmount && Number.parseFloat(contributionAmount) >= 100) {
      setContributionStep("confirm")
    }
  }

  const handleConfirmInvestment = () => {
    // Here you would integrate with Stellar SDK to process the investment
    console.log(`Processing investment of ${contributionAmount} USDC to ${selectedPool?.title}`)

    // Simulate processing
    setTimeout(() => {
      setContributionStep("success")
    }, 2000)
  }

  const resetContributionModal = () => {
    setIsContributeModalOpen(false)
    setSelectedPool(null)
    setContributionAmount("")
    setContributionStep("connect")
    setIsWalletConnected(false)
    setConnectedWallet(null)
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

      {/* Pools Section */}
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

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">{t.title}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pools.map((pool, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      {pool.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-white">{pool.roi} ROI</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-white">{pool.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {pool.students} {t.students} • {pool.progress}% {t.completed}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Raised</span>
                      <span className="font-medium text-white">
                        {pool.raised} of {pool.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${pool.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-white text-gray-900 hover:bg-gray-100"
                      size="sm"
                      onClick={() => handleContribute(pool)}
                    >
                      {t.contribute}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                      size="sm"
                      onClick={() => handleApply(pool)}
                    >
                      {t.apply}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Modal */}
      <Dialog open={isContributeModalOpen} onOpenChange={resetContributionModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {contributionStep === "connect" && t.contribution.connectWallet}
              {contributionStep === "amount" && t.contribution.enterAmount}
              {contributionStep === "confirm" && t.contribution.confirmTitle}
              {contributionStep === "success" && t.contribution.successTitle}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {contributionStep === "connect" && t.contribution.selectWallet}
              {contributionStep === "amount" && selectedPool?.title}
              {contributionStep === "confirm" && `${t.contribution.poolLabel} ${selectedPool?.title}`}
              {contributionStep === "success" && t.contribution.successMessage}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {/* Connect Wallet Step */}
            {contributionStep === "connect" && (
              <div className="space-y-3">
                {stellarWallets.map((wallet, index) => (
                  <button
                    key={wallet.name}
                    className="w-full text-left p-4 rounded-xl border border-gray-700 hover:border-gray-600 hover:bg-gray-700/50 transition-all group shadow-lg hover:shadow-xl"
                    onClick={() => handleWalletConnect(wallet.name)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-sm border border-gray-600">
                        <Image
                          src={wallet.image || "/placeholder.svg"}
                          alt={wallet.name}
                          width={index === 0 ? 32 : 40}
                          height={index === 0 ? 32 : 40}
                          className={index === 0 ? "w-8 h-8 object-contain" : "w-10 h-10 object-contain"}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {wallet.name}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Amount Input Step */}
            {contributionStep === "amount" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Connected to {connectedWallet}</span>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-white">
                    {t.contribution.amountLabel}
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={t.contribution.amountPlaceholder}
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    min="100"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                    onClick={() => setContributionStep("connect")}
                  >
                    {t.contribution.back}
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    onClick={handleAmountNext}
                    disabled={!contributionAmount || Number.parseFloat(contributionAmount) < 100}
                  >
                    {t.contribution.next}
                  </Button>
                </div>
              </div>
            )}

            {/* Confirmation Step */}
            {contributionStep === "confirm" && (
              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.contribution.poolLabel}</span>
                    <span className="text-white font-medium">{selectedPool?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.contribution.amountLabel2}</span>
                    <span className="text-white font-medium">{contributionAmount} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.contribution.roiLabel}</span>
                    <span className="text-green-400 font-medium">{selectedPool?.roi}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                    onClick={() => setContributionStep("amount")}
                  >
                    {t.contribution.back}
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    onClick={handleConfirmInvestment}
                  >
                    {t.contribution.confirmButton}
                  </Button>
                </div>
              </div>
            )}

            {/* Success Step */}
            {contributionStep === "success" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>

                <div className="space-y-2">
                  <p className="text-white font-medium">Investment of {contributionAmount} USDC confirmed!</p>
                  <p className="text-gray-400 text-sm">Transaction will be processed on the Stellar network.</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-600 text-white hover:bg-gray-700 bg-transparent"
                    onClick={resetContributionModal}
                  >
                    {t.contribution.close}
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    onClick={() => {
                      resetContributionModal()
                      // Navigate to dashboard
                      router.push("/dashboard")
                    }}
                  >
                    {t.contribution.viewDashboard}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
