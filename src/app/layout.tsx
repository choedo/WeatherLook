import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Weather Look',
    default: 'Weather Look - AI 맞춤 코디 날씨',
  },
  description:
    '기상청 정밀 날씨 데이터와 AI를 활용한 오늘의 옷차림 및 라이프 가이드',
  openGraph: {
    title: 'Weather Look',
    description: '오늘 뭐 입지? 날씨에 맞는 완벽한 코디를 추천해 드립니다.',
    siteName: 'Weather Look',
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko-KR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F0F9FF]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
