"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, ArrowRight, LinkIcon, Shield, Zap, Github, Twitter, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const heroLinesEn = ["fund futures through education.", "invest in student potential.", "power learning with capital."]
const heroLinesEs = [
  "financiamos futuros a través de la educación.",
  "invertimos en el potencial estudiantil.",
  "impulsamos el aprendizaje con capital.",
]

export default function HomePage() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [language, setLanguage] = useState("en")
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Typewriter effect for hero text
  useEffect(() => {
    const heroLines = language === "en" ? heroLinesEn : heroLinesEs
    const currentLine = heroLines[currentLineIndex]
    if (!currentLine) return

    const words = currentLine.split(" ").filter((word) => word && word.trim() !== "")
    let wordIndex = 0
    setDisplayedText("")

    const typewriterInterval = setInterval(() => {
      if (wordIndex < words.length) {
        const word = words[wordIndex]
        if (word && word.trim() !== "") {
          setDisplayedText((prev) => {
            const newText = prev + (prev ? " " : "") + word
            return newText
          })
        }
        wordIndex++
      } else {
        clearInterval(typewriterInterval)
        // Wait 3.5 seconds before starting next line
        setTimeout(() => {
          setCurrentLineIndex((prevIndex) => (prevIndex + 1) % heroLines.length)
        }, 3500)
      }
    }, 700) // 700ms between each word

    return () => clearInterval(typewriterInterval)
  }, [currentLineIndex, language]) // Add language as dependency

  const handleWalletConnect = (walletName: string) => {
    // Simulate wallet connection
    setConnectedWallet(walletName)
    setIsWalletModalOpen(false)

    // In a real implementation, you would integrate with the actual wallet APIs
    console.log(`Connecting to ${walletName} wallet...`)

    // Show success message or handle connection logic here
    alert(`Successfully connected to ${walletName}!`)
  }

  const handleEmailConnect = (email: string) => {
    // Simulate email connection
    setConnectedWallet("Email")
    setIsWalletModalOpen(false)

    console.log(`Connecting with email: ${email}`)
    alert(`Successfully registered with email: ${email}!`)
  }

  const content = {
    en: {
      nav: {
        pools: "Pools",
        apply: "Apply",
        connect: connectedWallet ? `Connected: ${connectedWallet}` : "Connect Wallet",
      },
      hero: {
        philosophy: "Philosophy>",
        philosophyText:
          "Education drives transformation. Through decentralized finance, we eliminate barriers preventing talented individuals from accessing quality education. Our platform creates sustainable ecosystems where investors earn meaningful returns while funding the next generation of innovators across Latin America.",
      },
      howItWorks: {
        title: "How it works",
        step1: {
          title: "Connect Securely",
          desc: "Link your Stellar wallet for instant access to the platform",
        },
        step2: {
          title: "Discover & Choose",
          desc: "Browse verified education pools or submit your funding application",
        },
        step3: {
          title: "Track Impact",
          desc: "Monitor real-time progress, returns, and educational outcomes",
        },
      },
      wallet: {
        title: "Connect Your Stellar Wallet",
        subtitle: "Choose your preferred Stellar wallet to get started",
        email: "Connect with Email",
        emailPlaceholder: "Enter your email address",
        emailButton: "Continue with Email",
      },
      cta: {
        title: "Ready to make an impact?",
        subtitle: "Join the educational revolution on Stellar",
        button: "Get Started",
      },
      footer: {
        rights: "All rights reserved.",
        description: "Democratizing access to education through blockchain technology.",
        product: "Product",
        company: "Company",
      },
    },
    es: {
      nav: {
        pools: "Pools",
        apply: "Solicitar",
        connect: connectedWallet ? `Conectado: ${connectedWallet}` : "Conectar Wallet",
      },
      hero: {
        philosophy: "Filosofía",
        philosophyText:
          "La educación impulsa la transformación. A través de finanzas descentralizadas, eliminamos barreras que impiden a individuos talentosos acceder a educación de calidad. Nuestra plataforma crea ecosistemas sostenibles donde los inversores obtienen retornos significativos mientras financian la próxima generación de innovadores en América Latina.",
      },
      howItWorks: {
        title: "Cómo funciona",
        step1: {
          title: "Conecta Seguro",
          desc: "Vincula tu wallet de Stellar para acceso instantáneo a la plataforma",
        },
        step2: {
          title: "Descubre y Elige",
          desc: "Explora pools educativos verificados o envía tu solicitud de financiamiento",
        },
        step3: {
          title: "Rastrea Impacto",
          desc: "Monitorea progreso en tiempo real, retornos y resultados educativos",
        },
      },
      wallet: {
        title: "Conecta tu Wallet de Stellar",
        subtitle: "Elige tu wallet de Stellar preferida para comenzar",
        email: "Conectar con Email",
        emailPlaceholder: "Ingresa tu correo electrónico",
        emailButton: "Continuar con Email",
      },
      cta: {
        title: "¿Listo para generar impacto?",
        subtitle: "Únete a la revolución educativa en Stellar",
        button: "Comenzar",
      },
      footer: {
        rights: "Todos los derechos reservados.",
        description: "Democratizando el acceso a la educación a través de la tecnología blockchain.",
        product: "Producto",
        company: "Empresa",
      },
    },
  }

  const t = content[language as keyof typeof content]

  // Updated wallet images with specific sizing for Freighter
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

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Global Background Pattern */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url('/images/stellar-logo.png')`,
            backgroundSize: "300px 300px",
            backgroundRepeat: "repeat",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-50 w-full border-b border-gray-800 bg-gray-900/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">Oikos</div>
            </div>

            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/pools" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {t.nav.pools}
                </Link>
                <Link href="/apply" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {t.nav.apply}
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className={`border-gray-600 text-white hover:bg-gray-800 bg-transparent ${
                        connectedWallet ? "border-green-500 text-green-400" : ""
                      }`}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      {t.nav.connect}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">{t.wallet.title}</DialogTitle>
                      <DialogDescription className="text-gray-400">{t.wallet.subtitle}</DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                      {!showEmailForm ? (
                        <div className="space-y-3">
                          {stellarWallets.map((wallet, index) => (
                            <button
                              key={wallet.name}
                              className="w-full text-left p-4 rounded-xl border border-gray-700 hover:border-gray-600 hover:bg-gray-700/50 transition-all group shadow-lg hover:shadow-xl"
                              onClick={() => handleWalletConnect(wallet.name)}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-sm border border-gray-600">
                                  <Image
                                    src={wallet.image || "/placeholder.svg"}
                                    alt={wallet.name}
                                    width={index === 0 ? 48 : 56}
                                    height={index === 0 ? 48 : 56}
                                    className={index === 0 ? "w-12 h-12 object-contain" : "w-14 h-14 object-contain"}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-white group-hover:text-blue-400 transition-colors text-lg">
                                    {wallet.name}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}

                          <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-gray-800 text-gray-400">or</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setShowEmailForm(true)}
                            className="w-full text-left p-4 rounded-xl border border-gray-700 hover:border-gray-600 hover:bg-gray-700/50 transition-all group shadow-lg hover:shadow-xl"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30">
                                <Mail className="w-8 h-8 text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-white group-hover:text-blue-400 transition-colors text-lg">
                                  {t.wallet.email}
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <button
                            onClick={() => setShowEmailForm(false)}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            ← Back to wallets
                          </button>
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-white">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder={t.wallet.emailPlaceholder}
                              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            />
                            <Button
                              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                              onClick={() => {
                                const emailInput = document.getElementById("email") as HTMLInputElement
                                if (emailInput?.value) {
                                  handleEmailConnect(emailInput.value)
                                }
                              }}
                            >
                              {t.wallet.emailButton}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-[80vh] flex items-center justify-center px-4 pt-16 z-10"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            {/* Main Hero Text - Centered with fixed height */}
            <div className="text-center">
              <div className="h-32 md:h-40 lg:h-48 xl:h-56 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight">
                  {language === "en" && (
                    <span
                      className="font-bold text-white mr-4"
                      style={{
                        textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      We
                    </span>
                  )}
                  <span
                    className="typewriter-text"
                    style={{
                      textShadow: "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)",
                      background: "linear-gradient(45deg, #ffffff, #60a5fa, #3b82f6)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {displayedText || ""}
                    <span className="typewriter-cursor">|</span>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Side by side layout */}
      <section className="relative py-12 px-4 z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side - Philosophy label */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-medium text-white">{t.hero.philosophy}</h3>
            </div>

            {/* Right side - Philosophy text - pushed more to the right */}
            <div className="lg:col-span-6 lg:col-start-4">
              <p className="text-sm text-gray-400 leading-relaxed">{t.hero.philosophyText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-20 md:py-24 px-4 z-10 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{t.howItWorks.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center space-y-6 group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300">
                <LinkIcon className="h-8 w-8 md:h-10 md:w-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-white">{t.howItWorks.step1.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">{t.howItWorks.step1.desc}</p>
              </div>
            </div>

            <div className="text-center space-y-6 group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300">
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-white">{t.howItWorks.step2.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">{t.howItWorks.step2.desc}</p>
              </div>
            </div>

            <div className="text-center space-y-6 group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                <Zap className="h-8 w-8 md:h-10 md:w-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-white">{t.howItWorks.step3.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">{t.howItWorks.step3.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-24 px-4 z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{t.cta.title}</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">{t.cta.subtitle}</p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
              onClick={() => setIsWalletModalOpen(true)}
            >
              {t.cta.button}
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12 px-4 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Section - Brand and Copyright */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-2xl font-bold">Oikos</div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{t.footer.description}</p>
              <p className="text-gray-400 text-sm">© 2025 Oikos. {t.footer.rights}</p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Section - Links */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-white">{t.footer.product}</h4>
                <div className="space-y-2">
                  <Link href="/pools" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    Pools
                  </Link>
                  <Link href="/apply" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    Apply
                  </Link>
                  <Link href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white">{t.footer.company}</h4>
                <div className="space-y-2">
                  <Link href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                  <Link href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .typewriter-text {
          position: relative;
        }

        .typewriter-cursor {
          animation: blink 1s infinite;
          color: #60a5fa;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
