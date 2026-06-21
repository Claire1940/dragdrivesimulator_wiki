'use client'

import { setRequestLocale } from 'next-intl/server'
import { useEffect, useState, Suspense, lazy } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Gamepad2,
  Gift,
  Flag,
  Hammer,
  Home,
  Info,
  Keyboard,
  Map as MapIcon,
  MessageCircle,
  Package,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X
} from 'lucide-react'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { NativeBannerAd, AdBanner, SidebarAd } from '@/components/ads'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({
  height = 'h-64',
  text = 'Loading content...',
}: {
  height?: string
  text?: string
}) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center`}>
    <div className="text-muted-foreground">{text}</div>
  </div>
)

export default function HomePage() {
  const t = useMessages() as any
  const loadingText = t.common?.loading ?? 'Loading content...'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dragdrivesimulator.wiki'

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: "Drag Drive Simulator Wiki",
        description: "Guides, codes, tuning setups, jobs, and map resources for Drag Drive Simulator on Roblox.",
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          caption: "Drag Drive Simulator Wiki",
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: "Drag Drive Simulator Wiki",
        alternateName: "Drag Drive Simulator",
        url: siteUrl,
        description: "Community-driven Drag Drive Simulator wiki for codes, tuning, jobs, vehicles, and tracks.",
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          caption: "Drag Drive Simulator Wiki - Roblox Racing Guides",
        },
        sameAs: [
          'https://www.roblox.com/games/131378148336503/Drag-Drive-Simulator',
          'https://www.roblox.com/communities/11378976/ADV-Gamers-Team',
          'https://discord.com/invite/officialadvgamers',
          'https://www.youtube.com/channel/UC6bXTzU6mefwqPV2zFU-HZg',
        ],
      },
      {
        '@type': 'VideoGame',
        name: "Drag Drive Simulator",
        gamePlatform: ['Roblox'],
        applicationCategory: 'Game',
        genre: ['Racing', 'Simulation', 'Roleplay'],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 25,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.roblox.com/games/131378148336503/Drag-Drive-Simulator',
        },
      },
    ],
  }

  // Copy state
  const [copiedPath, setCopiedPath] = useState<string | null>(null)
  const [moduleOneTab, setModuleOneTab] = useState<'active' | 'expired' | 'redeem' | 'notes'>('active')

  const moduleOne = t.modules?.releaseEditions ?? {}
  const moduleOneActiveCodes = moduleOne.activeCodes ?? []
  const moduleOneExpiredCodes = moduleOne.expiredCodes ?? []
  const moduleOneHowToRedeem = moduleOne.howToRedeem ?? []
  const moduleOneCodeNotes = moduleOne.codeNotes ?? []
  const moduleOneReferenceLinks = moduleOne.referenceLinks ?? []

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedPath(text)
      setTimeout(() => setCopiedPath(null), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部横幅（Sticky）- 全平台显示 */}
      <div className="sticky top-20 z-20 border-b border-border py-2 bg-background/95 backdrop-blur-sm">
        <AdBanner
          type="banner-320x50"
          adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50}
        />
      </div>

      {/* 左侧边栏 Sticky 广告 - 桌面端 */}
      <div className="hidden lg:block fixed left-4 top-24 z-10">
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </div>

      {/* 右侧边栏 Sticky 广告 - 桌面端 */}
      <div className="hidden lg:block fixed right-4 top-24 z-10">
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border-2 border-[hsl(var(--gold)/0.5)] mb-6 glow-gold">
              <Sparkles className="w-4 h-4 text-[hsl(var(--gold))]" />
              <span className="text-sm font-semibold">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bebas mb-6 leading-tight
                           bg-gradient-to-r from-foreground via-[hsl(var(--nav-theme))] to-foreground
                           bg-clip-text text-transparent
                           drop-shadow-[0_2px_8px_hsl(var(--nav-theme)/0.3)]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('release-editions')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg
                           transition-all duration-300
                           hover:shadow-[0_8px_24px_hsl(var(--nav-theme)/0.4)]
                           hover:-translate-y-1"
              >
                <Gift className="w-5 h-5 transition-transform group-hover:scale-110" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/131378148336503/Drag-Drive-Simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           border-2 border-[hsl(var(--gold)/0.5)] hover:bg-[hsl(var(--gold)/0.1)]
                           rounded-lg font-semibold text-lg
                           transition-all duration-300
                           hover:shadow-[0_8px_24px_rgba(251,191,36,0.3)]
                           hover:-translate-y-1"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" text={loadingText} />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 - Hero 区域下方 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId="ZJR6KxyDTDE"
              title="Official Drag Drive Simulator Trailer"
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* 广告位 3: 标准横幅 728×90 - 视频区域下方 */}
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
      />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
              {t.tools.title}{' '}
              <span className="text-gold-gradient">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 映射卡片索引到 section ID
              const sectionIds = [
                'release-editions', 'roster', 'ratings', 'controls',
                'starter-vehicles', 'dealership-locations', 'vehicles-hub', 'tuning-guide',
                'universe-mode', 'community-creations', 'the-island', 'myfaction',
                'gamepasses', 'customization', 'updates-events', 'community-private-servers'
              ]
              const sectionId = sectionIds[index]

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group p-6 rounded-xl border-2 border-border
                             bg-card hover:border-[hsl(var(--gold)/0.6)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-[0_12px_32px_rgba(251,191,36,0.2)]
                             hover:-translate-y-2 relative overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Diagonal Decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[hsl(var(--gold)/0.1)] to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-12 h-12 rounded-lg mb-4
                                  bg-gradient-to-br from-[hsl(var(--nav-theme)/0.1)] to-[hsl(var(--gold)/0.1)]
                                  border-2 border-[hsl(var(--gold)/0.3)]
                                  flex items-center justify-center
                                  group-hover:border-[hsl(var(--gold))]
                                  transition-all duration-300 relative z-10">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))] group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="font-bebas text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 - 导航卡片下方 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
      />

      {/* Module 1: Release & Editions */}
      <section id="release-editions" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.releaseEditions.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.releaseEditions.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">
              {t.modules.releaseEditions.intro}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { key: 'active', label: 'Active Codes', icon: Gift },
              { key: 'expired', label: 'Expired Codes', icon: X },
              { key: 'redeem', label: 'How to Redeem', icon: Keyboard },
              { key: 'notes', label: 'Code Notes', icon: AlertTriangle },
            ].map((tab) => {
              const TabIcon = tab.icon
              const isActive = moduleOneTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setModuleOneTab(tab.key as 'active' | 'expired' | 'redeem' | 'notes')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.1)] text-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-[hsl(var(--nav-theme)/0.5)]'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl border-2 border-[hsl(var(--gold)/0.4)] bg-card p-6 md:p-8 glow-gold">
            {moduleOneTab === 'active' && (
              <div className="space-y-4">
                {moduleOneActiveCodes.map((codeItem: any, i: number) => (
                  <div key={i} className="rounded-xl border border-border bg-muted/30 p-4 md:p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-base md:text-lg font-semibold text-[hsl(var(--nav-theme-light))] break-all">
                          {codeItem.code}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold border border-[hsl(var(--gold)/0.6)] bg-[hsl(var(--gold)/0.12)] text-[hsl(var(--gold))] inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {codeItem.status}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(codeItem.code)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white text-sm font-semibold transition-all duration-300"
                      >
                        {copiedPath === codeItem.code ? <ClipboardCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedPath === codeItem.code ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{codeItem.reward}</p>
                  </div>
                ))}
              </div>
            )}

            {moduleOneTab === 'expired' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {moduleOneExpiredCodes.map((code: string, i: number) => (
                  <div key={i} className="rounded-lg border border-border bg-muted/30 p-3 flex items-center gap-2">
                    <X className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-sm break-all">{code}</span>
                  </div>
                ))}
              </div>
            )}

            {moduleOneTab === 'redeem' && (
              <ol className="space-y-3">
                {moduleOneHowToRedeem.map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[hsl(var(--nav-theme))] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm md:text-base">{step}</span>
                  </li>
                ))}
              </ol>
            )}

            {moduleOneTab === 'notes' && (
              <ul className="space-y-3">
                {moduleOneCodeNotes.map((note: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 shrink-0" />
                    <span className="text-sm md:text-base">{note}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-muted/30 p-5">
            <h3 className="text-xl font-bebas mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              Official & Community References
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {moduleOneReferenceLinks.map((linkItem: any, i: number) => (
                <a
                  key={i}
                  href={linkItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300"
                >
                  <div className="text-sm font-medium flex items-center justify-between gap-2">
                    <span>{linkItem.title}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--nav-theme-light))] shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 - 第1个模块下方 */}
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
      />

      {/* Module 2: Roster */}
      <section id="roster" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.roster.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.roster.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.modules.roster.stats.map((stat: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border text-center">
                <div className="text-4xl font-bold text-[hsl(var(--nav-theme))] mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.modules.roster.categories.map((category: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 text-[hsl(var(--nav-theme))]">{category.name}</h3>
                <ul className="space-y-2">
                  {category.superstars.map((name: string, j: number) => (
                    <li key={j} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--nav-theme))]" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 - 第2个模块下方 */}
      <AdBanner
        type="banner-320x50"
        adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50}
      />

      {/* Module 3: Ratings */}
      <section id="ratings" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.ratings.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.ratings.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300">
              <h3 className="text-2xl font-bebas mb-6 text-[hsl(var(--nav-theme))]">Men&apos;s Top 10</h3>
              <div className="space-y-3">
                {t.modules.ratings.menTopRated.map((superstar: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] flex items-center justify-center font-bebas text-white">{i + 1}</div>
                      <span className="font-medium">{superstar.name}</span>
                    </div>
                    <div className="text-2xl font-bebas text-gold-gradient">{superstar.rating}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300">
              <h3 className="text-2xl font-bebas mb-6 text-[hsl(var(--nav-theme))]">Women&apos;s Top 10</h3>
              <div className="space-y-3">
                {t.modules.ratings.womenTopRated.map((superstar: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] flex items-center justify-center font-bebas text-white">{i + 1}</div>
                      <span className="font-medium">{superstar.name}</span>
                    </div>
                    <div className="text-2xl font-bebas text-gold-gradient">{superstar.rating}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: Controls */}
      <section id="controls" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.controls.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.controls.subtitle}</p>
          </div>
          <div className="space-y-6">
            {t.modules.controls.platforms.map((platform: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme))]">{platform.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {platform.controls.map((control: any, j: number) => (
                    <div key={j} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium">{control.action}</span>
                      <span className="px-3 py-1 rounded bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme))] font-mono text-xs">{control.input}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 方形广告 300×250 - Module 4-5 之间 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="my-8"
      />

      {/* Module 5: Starter Vehicles */}
      <section id="starter-vehicles" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.matchTypes.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.matchTypes.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.matchTypes.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.matchTypes.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.modules.matchTypes.matches.map((match: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[hsl(var(--gold)/0.15)] text-[hsl(var(--gold))] text-sm font-bebas flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--nav-theme))] pr-10">{match.name}</h3>
                <p className="text-sm text-muted-foreground">{match.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.matchTypes.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-muted/30 px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Dealership Locations */}
      <section id="dealership-locations" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.showcase.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.showcase.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.showcase.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.showcase.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {t.modules.showcase.moments.map((moment: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{moment.title}</h3>
                <p className="text-sm text-muted-foreground">{moment.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.showcase.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Vehicles */}
      <section id="vehicles-hub" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.mygm.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.mygm.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.mygm.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.mygm.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="text-lg font-bebas text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
                <div className="text-xs text-muted-foreground">{fact.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {t.modules.mygm.features.map((feature: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold mb-4 text-[hsl(var(--nav-theme))]">Vehicle Categories</h3>
              <div className="space-y-3">
                {t.modules.mygm.vehicleCategories.map((category: any, i: number) => (
                  <div key={i} className="rounded-lg border border-border bg-muted/40 p-3">
                    <div className="font-semibold">{category.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{category.access}{category.priceRobux ? ` · ${category.priceRobux} Robux` : ''}</div>
                    <div className="text-sm mt-1">{category.notes}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold mb-4 text-[hsl(var(--nav-theme))]">Featured Vehicles</h3>
              <div className="space-y-3">
                {t.modules.mygm.featuredVehicles.map((vehicle: any, i: number) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3">
                    <div>
                      <div className="font-semibold">{vehicle.name}</div>
                      <div className="text-xs text-muted-foreground">{vehicle.type}</div>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full border border-[hsl(var(--gold)/0.5)] bg-[hsl(var(--gold)/0.1)] text-[hsl(var(--gold))]">{vehicle.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.mygm.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-muted/30 px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 标准横幅 728×90 - Module 7-8 之间 */}
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="my-8"
      />

      {/* Module 8: Tuning Guide */}
      <section id="tuning-guide" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.myrise.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.myrise.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.myrise.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.myrise.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {t.modules.myrise.divisions.map((division: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--nav-theme))]">{division.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{division.goal}</p>
                <div className="flex flex-wrap gap-2">
                  {division.opponents.map((opponent: string, j: number) => (
                    <span key={j} className="px-3 py-1 rounded-full bg-muted text-xs">{opponent}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold mb-4 text-[hsl(var(--nav-theme))]">Tuning Options</h3>
              <div className="space-y-3">
                {t.modules.myrise.tuningOptions.map((option: any, i: number) => (
                  <div key={i} className="rounded-lg border border-border bg-muted/40 p-3">
                    <div className="font-semibold">{option.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{option.access}{option.priceRobux ? ` · ${option.priceRobux} Robux` : ''}</div>
                    <div className="text-sm mt-1">{option.notes}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 bg-gradient-to-br from-card to-[hsl(var(--nav-theme)/0.08)]">
              <h3 className="text-lg font-bold mb-4 text-[hsl(var(--nav-theme))]">Drag Tuning Workflow</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-[hsl(var(--nav-theme))] text-white text-xs font-bold flex items-center justify-center shrink-0">1</span><span>Set a baseline with one launch run at Sentul Track.</span></li>
                <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-[hsl(var(--nav-theme))] text-white text-xs font-bold flex items-center justify-center shrink-0">2</span><span>Adjust one gear ratio value only, then repeat the same route.</span></li>
                <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-[hsl(var(--nav-theme))] text-white text-xs font-bold flex items-center justify-center shrink-0">3</span><span>Track launch feel, shift timing, and top-end behavior before the finish.</span></li>
                <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-[hsl(var(--nav-theme))] text-white text-xs font-bold flex items-center justify-center shrink-0">4</span><span>Lock the best setup, then apply visual customization and suspension fine-tuning.</span></li>
              </ol>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.myrise.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Module 9: Universe Mode */}
      <section id="universe-mode" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.universeMode.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.universeMode.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.universeMode.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.universeMode.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[Home, Clock, Users, TrendingUp, Flag, Shield].map((ItemIcon, i) => {
              const section = t.modules.universeMode.sections[i]
              if (!section) return null

              return (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center">
                    <ItemIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.universeMode.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Module 10: Community Creations */}
      <section id="community-creations" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.communityCreations.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.communityCreations.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.communityCreations.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.communityCreations.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[Gift, Star, Sparkles, Clock, Check].map((ItemIcon, i) => {
              const section = t.modules.communityCreations.sections[i]
              if (!section) return null

              return (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg mb-4 bg-[hsl(var(--gold)/0.14)] border border-[hsl(var(--gold)/0.4)] flex items-center justify-center">
                    <ItemIcon className="w-5 h-5 text-[hsl(var(--gold))]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.communityCreations.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 7: 中型横幅 468×60 - Module 10-11 之间 */}
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="my-8"
      />

      {/* Module 11: The Island */}
      <section id="the-island" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.theIsland.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.theIsland.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.theIsland.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.theIsland.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[MapIcon, Home, TrendingUp, Gamepad2, Package, ArrowRight].map((ItemIcon, i) => {
              const section = t.modules.theIsland.sections[i]
              if (!section) return null

              return (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center">
                    <ItemIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.theIsland.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Module 12: MyFACTION */}
      <section id="myfaction" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.myfaction.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.myfaction.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.myfaction.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.myfaction.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[Package, TrendingUp, MapIcon, Star, MessageCircle, BookOpen].map((ItemIcon, i) => {
              const section = t.modules.myfaction.sections[i]
              if (!section) return null

              return (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg mb-4 bg-[hsl(var(--gold)/0.14)] border border-[hsl(var(--gold)/0.4)] flex items-center justify-center">
                    <ItemIcon className="w-5 h-5 text-[hsl(var(--gold))]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              )
            })}
          </div>
          <details className="rounded-xl border border-border bg-card p-5 mb-8 group">
            <summary className="cursor-pointer list-none font-semibold flex items-center justify-between gap-3">
              <span>{t.modules.myfaction.spoilerToggle.label}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-4 space-y-2">
              {t.modules.myfaction.spoilerToggle.items.map((item: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[hsl(var(--gold))] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </details>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.myfaction.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Module 13: Gamepasses */}
      <section id="gamepasses" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.lockerCodes.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.lockerCodes.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.lockerCodes.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.lockerCodes.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[TrendingUp, Shield, Flag].map((ItemIcon, i: number) => {
              const section = t.modules.lockerCodes.sections[i]
              if (!section) return null
              return (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--gold)/0.6)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg mb-4 bg-[hsl(var(--gold)/0.14)] border border-[hsl(var(--gold)/0.4)] flex items-center justify-center">
                    <ItemIcon className="w-5 h-5 text-[hsl(var(--gold))]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              )
            })}
          </div>
          <div className="rounded-2xl border-2 border-[hsl(var(--gold)/0.45)] bg-card overflow-hidden mb-8">
            <div className="grid grid-cols-12 bg-muted/40 border-b border-border px-4 py-3 text-xs md:text-sm font-semibold">
              <div className="col-span-4">Pass</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-3">Updated</div>
              <div className="col-span-1 text-right">Action</div>
            </div>
            {t.modules.lockerCodes.gamepassData.map((passItem: any, i: number) => (
              <div key={i} className="grid grid-cols-12 px-4 py-4 border-b border-border/70 last:border-b-0 text-sm gap-y-2">
                <div className="col-span-12 md:col-span-4">
                  <div className="font-semibold">{passItem.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{passItem.userBenefit}</div>
                </div>
                <div className="col-span-4 md:col-span-2 font-medium text-[hsl(var(--nav-theme-light))]">
                  {passItem.priceRobux ? `${passItem.priceRobux} Robux` : 'Off Sale'}
                </div>
                <div className="col-span-4 md:col-span-2">{passItem.role}</div>
                <div className="col-span-4 md:col-span-3 text-muted-foreground">{passItem.updated}</div>
                <div className="col-span-12 md:col-span-1 flex md:justify-end">
                  <span className="px-2.5 py-1 rounded-full text-xs border border-[hsl(var(--gold)/0.5)] bg-[hsl(var(--gold)/0.12)] text-[hsl(var(--gold))]">
                    #{i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.lockerCodes.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-muted/30 px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 8: 方形广告 300×250 - Locker Codes 下方 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="my-8"
      />

      {/* Module 14: Customization */}
      <section id="customization" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.pcRequirements.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.pcRequirements.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.pcRequirements.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.pcRequirements.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[Sparkles, Hammer, Star].map((ItemIcon, i: number) => {
              const section = t.modules.pcRequirements.sections[i]
              if (!section) return null
              return (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center">
                    <ItemIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {t.modules.pcRequirements.customizationData.map((item: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--gold)/0.6)] transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-[hsl(var(--nav-theme))]">{item.name}</h3>
                  <span className="px-2.5 py-1 rounded-full text-xs border border-[hsl(var(--gold)/0.5)] bg-[hsl(var(--gold)/0.12)] text-[hsl(var(--gold))] whitespace-nowrap">
                    {item.status ?? `${item.priceRobux} Robux`}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">{item.type}</div>
                <p className="text-sm text-muted-foreground mb-3">{item.userBenefit}</p>
                <div className="text-xs text-muted-foreground">Updated: {item.updated}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.pcRequirements.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Module 15: Updates and Events */}
      <section id="updates-events" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.arenas.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.arenas.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.arenas.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {t.modules.arenas.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[Clock, Flag, TrendingUp].map((ItemIcon, i: number) => {
              const section = t.modules.arenas.sections[i]
              if (!section) return null
              return (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--gold)/0.6)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg mb-4 bg-[hsl(var(--gold)/0.14)] border border-[hsl(var(--gold)/0.4)] flex items-center justify-center">
                    <ItemIcon className="w-5 h-5 text-[hsl(var(--gold))]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              )
            })}
          </div>
          <div className="rounded-xl border border-border bg-card p-6 mb-8">
            <h3 className="text-xl font-bebas mb-4 text-[hsl(var(--nav-theme))]">
              {t.modules.arenas.latestVersion}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.modules.arenas.latestHighlights.map((item: string, i: number) => (
                <div key={i} className="rounded-lg border border-border bg-muted/30 p-3 text-sm flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--nav-theme))]">Event History</h3>
            <div className="space-y-3">
              {t.modules.arenas.eventHistory.map((eventItem: any, i: number) => (
                <div key={i} className="grid grid-cols-12 gap-3 rounded-lg border border-border bg-muted/30 p-3 text-sm">
                  <div className="col-span-12 md:col-span-6 font-medium">{eventItem.name}</div>
                  <div className="col-span-6 md:col-span-3 text-[hsl(var(--gold))]">{eventItem.awarded.toLocaleString()} awarded</div>
                  <div className="col-span-6 md:col-span-3 text-muted-foreground">{eventItem.updated}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.arenas.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Module 16: Community and Private Servers */}
      <section id="community-private-servers" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.dlcUnlockables.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.dlcUnlockables.subtitle}</p>
            <p className="text-sm text-muted-foreground/90 max-w-3xl mx-auto mt-4">{t.modules.dlcUnlockables.intro}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {t.modules.dlcUnlockables.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                <div className="font-semibold text-[hsl(var(--nav-theme-light))]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[Users, MessageCircle, Home].map((ItemIcon, i: number) => {
              const section = t.modules.dlcUnlockables.sections[i]
              if (!section) return null
              return (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center">
                    <ItemIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              )
            })}
          </div>
          <div className="rounded-xl border border-border bg-card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--nav-theme))]">Community Snapshot</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="text-xs text-muted-foreground mb-1">Server Size</div>
                <div className="text-xl font-bebas text-[hsl(var(--nav-theme-light))]">{t.modules.dlcUnlockables.communityData.serverSize}</div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="text-xs text-muted-foreground mb-1">Roblox Group Members</div>
                <div className="text-xl font-bebas text-[hsl(var(--nav-theme-light))]">{t.modules.dlcUnlockables.communityData.groupMembers.toLocaleString()}</div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="text-xs text-muted-foreground mb-1">Discord Members</div>
                <div className="text-xl font-bebas text-[hsl(var(--nav-theme-light))]">{t.modules.dlcUnlockables.communityData.discordMembers.toLocaleString()}</div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="text-xs text-muted-foreground mb-1">YouTube Subscribers</div>
                <div className="text-xl font-bebas text-[hsl(var(--nav-theme-light))]">{t.modules.dlcUnlockables.communityData.youtubeChannelSubscribers.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--nav-theme))]">Private Server Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.modules.dlcUnlockables.communityData.privateServerFeatures.map((feature: string, i: number) => (
                <div key={i} className="rounded-lg border border-border bg-muted/30 p-3 text-sm flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[hsl(var(--gold))] mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.modules.dlcUnlockables.referenceLinks.map((linkItem: any, i: number) => (
              <a
                key={i}
                href={linkItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card px-4 py-3 hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2"
              >
                <span>{linkItem.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder text={loadingText} />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder text={loadingText} />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/officialadvgamers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/communities/11378976/ADV-Gamers-Team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <Link
                    href="https://www.roblox.com/games/131378148336503/Drag-Drive-Simulator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.reddit}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UC6bXTzU6mefwqPV2zFU-HZg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.youtube}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/watch?v=ZJR6KxyDTDE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.instagram}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
