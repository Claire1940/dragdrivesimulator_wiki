'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Gamepad2,
  Gift,
  Hammer,
  Home,
  Keyboard,
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
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center`}>
    <div className="text-muted-foreground">Loading...</div>
  </div>
)

export default function HomePage() {
  const t = useMessages() as any
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wwe2k26.wiki'

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: "WWE 2K26 Wiki",
        description: "Complete WWE 2K26 resource hub with roster, ratings, locker codes, match types, and game mode guides.",
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          caption: "WWE 2K26 - Wrestling Simulation Game",
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
        name: "WWE 2K26 Wiki",
        alternateName: "WWE 2K26",
        url: siteUrl,
        description: "Complete WWE 2K26 Wiki resource hub for roster, ratings, and game modes",
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
          caption: "WWE 2K26 Wiki - Master Wrestling",
        },
        sameAs: [
          'https://wwe.2k.com/2k26/',
          'https://discord.com/invite/wwe2k',
          'https://x.com/WWEgames',
        ],
      },
      {
        '@type': 'VideoGame',
        name: "WWE 2K26",
        gamePlatform: ['PlayStation 5', 'Xbox Series X|S', 'PC', 'Nintendo Switch 2'],
        applicationCategory: 'Game',
        genre: ['Sports', 'Wrestling', 'Simulation'],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 4,
        },
        offers: {
          '@type': 'Offer',
          price: '69.99',
          priceCurrency: 'USD',
          availability: 'https://schema.org/PreOrder',
          url: 'https://store.steampowered.com/app/3717070/WWE_2K26/',
        },
      },
    ],
  }

  // Copy state
  const [copiedPath, setCopiedPath] = useState<string | null>(null)

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
                           drop-shadow-[0_2px_8px_rgba(220,38,38,0.3)]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('locker-codes')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg
                           transition-all duration-300
                           hover:shadow-[0_8px_24px_rgba(220,38,38,0.4)]
                           hover:-translate-y-1"
              >
                <Gift className="w-5 h-5 transition-transform group-hover:scale-110" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://store.steampowered.com/app/3717070/WWE_2K26/"
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
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
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
              videoId="oYd6rXOrz7E"
              title="The Show Is On! | WWE 2K26 Official Announce Trailer"
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
                'match-types', 'showcase', 'mygm', 'myrise',
                'universe-mode', 'community-creations', 'the-island', 'myfaction',
                'locker-codes', 'pc-requirements', 'arenas', 'dlc-unlockables'
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
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {t.modules.releaseEditions.quickFacts.map((fact: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border-2 border-[hsl(var(--gold)/0.3)] text-center hover:border-[hsl(var(--gold))] transition-all duration-300">
                <div className="text-2xl font-bebas text-gold-gradient">{fact.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{fact.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.modules.releaseEditions.editions.map((edition: any, i: number) => (
              <div key={i} className="p-6 rounded-xl border-2 border-border bg-card hover:border-[hsl(var(--nav-theme))] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(220,38,38,0.2)] hover:-translate-y-1">
                <h3 className="text-xl font-bebas mb-2">{edition.name}</h3>
                <div className="text-3xl font-bebas text-gold-gradient mb-4">{edition.price}</div>
                <div className="text-sm text-muted-foreground mb-4">{edition.releaseDate}</div>
                <ul className="space-y-2">
                  {edition.includes.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme))] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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

      {/* Module 5: Match Types */}
      <section id="match-types" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.matchTypes.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.matchTypes.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.modules.matchTypes.matches.map((match: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--nav-theme))]">{match.name}</h3>
                <p className="text-sm text-muted-foreground">{match.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Showcase */}
      <section id="showcase" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.showcase.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.showcase.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.showcase.moments.map((moment: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{moment.title}</h3>
                <p className="text-sm text-muted-foreground">{moment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: MyGM */}
      <section id="mygm" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.mygm.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.mygm.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.modules.mygm.features.map((feature: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
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

      {/* Module 8: MyRISE */}
      <section id="myrise" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.myrise.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.myrise.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </section>

      {/* Module 9: Universe Mode */}
      <section id="universe-mode" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.universeMode.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.universeMode.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.modules.universeMode.features.map((feature: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.modules.communityCreations.sections.map((section: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {t.modules.theIsland.orders.map((order: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-xl font-bold mb-2 text-[hsl(var(--nav-theme))]">{order.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">Leader: {order.leader}</p>
                <p className="text-sm">{order.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.modules.theIsland.prestige.map((tier: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="font-bold text-[hsl(var(--nav-theme))] mb-1">{tier.tier}</div>
                <div className="text-xs text-muted-foreground">{tier.ovrRange}</div>
              </div>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.modules.myfaction.features.map((feature: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300">
                <h3 className="text-lg font-bold mb-2 text-[hsl(var(--nav-theme))]">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 13: Locker Codes */}
      <section id="locker-codes" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.lockerCodes.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.lockerCodes.subtitle}</p>
          </div>
          <div className="space-y-4">
            {t.modules.lockerCodes.codes.map((codeItem: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border-2 border-[hsl(var(--gold)/0.5)] hover:border-[hsl(var(--gold))] transition-all duration-300 glow-gold">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-mono text-2xl font-bebas text-gold-gradient">{codeItem.code}</div>
                  <button
                    onClick={() => navigator.clipboard.writeText(codeItem.code)}
                    className="group px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme))] text-white hover:bg-[hsl(var(--nav-theme)/0.9)] transition-all duration-300 flex items-center gap-2 hover:shadow-[0_4px_16px_rgba(220,38,38,0.4)]"
                  >
                    <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Copy
                  </button>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Expires: {codeItem.expires}</div>
                <ul className="space-y-1">
                  {codeItem.rewards.map((reward: string, j: number) => (
                    <li key={j} className="text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme))]" />
                      {reward}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-xl bg-muted/50 border-2 border-border">
            <h4 className="font-bebas text-xl mb-4">How to Redeem</h4>
            <ol className="space-y-2">
              {t.modules.lockerCodes.howToRedeem.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[hsl(var(--nav-theme))] text-white flex items-center justify-center text-sm font-bebas flex-shrink-0">{i + 1}</div>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 广告位 8: 方形广告 300×250 - Locker Codes 下方 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="my-8"
      />

      {/* Module 14: PC Requirements */}
      <section id="pc-requirements" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 relative inline-block">
              {t.modules.pcRequirements.title}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">{t.modules.pcRequirements.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card border-2 border-border hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300">
              <h3 className="text-xl font-bebas mb-4 text-[hsl(var(--nav-theme))]">Minimum</h3>
              <dl className="space-y-3">
                <div><dt className="text-sm text-muted-foreground">OS</dt><dd className="font-medium">{t.modules.pcRequirements.minimum.os}</dd></div>
                <div><dt className="text-sm text-muted-foreground">Processor</dt><dd className="font-medium">{t.modules.pcRequirements.minimum.processor}</dd></div>
                <div><dt className="text-sm text-muted-foreground">Memory</dt><dd className="font-medium">{t.modules.pcRequirements.minimum.memory}</dd></div>
                <div><dt className="text-sm text-muted-foreground">Graphics</dt><dd className="font-medium">{t.modules.pcRequirements.minimum.graphics}</dd></div>
                <div><dt className="text-sm text-muted-foreground">Storage</dt><dd className="font-medium">{t.modules.pcRequirements.minimum.storage}</dd></div>
              </dl>
            </div>
            <div className="p-6 rounded-xl bg-card border-2 border-[hsl(var(--gold)/0.5)] hover:border-[hsl(var(--gold))] transition-all duration-300 glow-gold relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] text-white text-xs font-bebas">RECOMMENDED</div>
              <h3 className="text-xl font-bebas mb-4 text-gold-gradient">Recommended</h3>
              <dl className="space-y-3">
                <div><dt className="text-sm text-muted-foreground">OS</dt><dd className="font-medium">{t.modules.pcRequirements.recommended.os}</dd></div>
                <div><dt className="text-sm text-muted-foreground">Processor</dt><dd className="font-medium">{t.modules.pcRequirements.recommended.processor}</dd></div>
                <div><dt className="text-sm text-muted-foreground">Memory</dt><dd className="font-medium">{t.modules.pcRequirements.recommended.memory}</dd></div>
                <div><dt className="text-sm text-muted-foreground">Graphics</dt><dd className="font-medium">{t.modules.pcRequirements.recommended.graphics}</dd></div>
                <div><dt className="text-sm text-muted-foreground">Storage</dt><dd className="font-medium">{t.modules.pcRequirements.recommended.storage}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Module 15: Arenas */}
      <section id="arenas" className="scroll-mt-24 px-4 py-20 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.arenas.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.arenas.subtitle}</p>
          </div>
          <div className="space-y-8">
            {t.modules.arenas.categories.map((category: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-bold mb-4 text-[hsl(var(--nav-theme))]">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.arenas.map((arena: string, j: number) => (
                    <span key={j} className="px-3 py-1 rounded-full bg-muted text-sm">{arena}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 16: DLC & Unlockables */}
      <section id="dlc-unlockables" className="scroll-mt-24 px-4 py-20 bg-muted/30 scroll-reveal">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.dlcUnlockables.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.modules.dlcUnlockables.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {t.modules.dlcUnlockables.seasons.map((season: any, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="font-bold text-[hsl(var(--nav-theme))] mb-1">{season.season}</div>
                <div className="text-xs text-muted-foreground">{season.release}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.modules.dlcUnlockables.editionPacks.map((pack: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-bold mb-3 text-[hsl(var(--nav-theme))]">{pack.name}</h3>
                <ul className="space-y-2">
                  {pack.includes.map((item: string, j: number) => (
                    <li key={j} className="text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme))]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
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
                    href="https://discord.com/invite/wwe2k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/WWEgames"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <Link
                    href="https://www.reddit.com/r/WWEGames/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.reddit}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/@WWEGames"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[hsl(var(--nav-theme-light))] transition-colors"
                  >
                    {t.footer.youtube}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/wwegames/"
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
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
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
