import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import Script from 'next/script'
import ClientBody from '../ClientBody'
import Analytics from '@/components/Analytics'
import { SocialBarAd } from '@/components/ads'

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

// 生成静态参数
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

// 生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wwe2k26.wiki'

	// 获取 SEO 翻译
	const t = await getTranslations('seo.home')

	// 将 keywords 字符串分割为数组
	const keywordsString = t('keywords')
	const keywords = keywordsString.split(',').map(k => k.trim())

	return {
		title: t('title'),
		description: t('description'),
		keywords: keywords,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		openGraph: {
			type: 'website',
			locale: locale,
			url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}`,
			siteName: 'WWE 2K26 Wiki',
			title: t('ogTitle'),
			description: t('ogDescription'),
			images: [
				{
					url: `${siteUrl}/og-image.jpg`,
					width: 1200,
					height: 630,
					alt: 'WWE 2K26 - Wrestling Simulation Game',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: t('twitterTitle'),
			description: t('twitterDescription'),
			images: [`${siteUrl}/og-image.jpg`],
			creator: '@WWEgames',
		},
		icons: {
			icon: [
				{ url: '/favicon.ico', sizes: 'any' },
				{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
				{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			],
			apple: [
				{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
			],
		},
		manifest: '/manifest.json',
		alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
	}
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	// 验证 locale
	if (!routing.locales.includes(locale as Locale)) {
		notFound()
	}

	// 获取翻译消息（不需要 setRequestLocale！）
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<meta name="google-adsense-account" content="ca-pub-7733402184034568" />
				<Script
					crossOrigin="anonymous"
					src="https://unpkg.com/same-runtime@0.0.1/dist/index.global.js"
					strategy="beforeInteractive"
				/>
				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7733402184034568"
					crossOrigin="anonymous"
					strategy="lazyOnload"
				/>
			</head>
			<body suppressHydrationWarning className="antialiased">
				<Analytics />
				<NextIntlClientProvider messages={messages}>
					<ClientBody>{children}</ClientBody>
				</NextIntlClientProvider>
				{/* 社交栏广告 */}
				<SocialBarAd adKey={process.env.NEXT_PUBLIC_AD_SOCIAL_BAR || ''} />
			</body>
		</html>
	)
}
