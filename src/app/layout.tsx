import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import MSWWrapper from '@/components/MSWWrapper';
import QueryProvider from '@/components/QueryProvider';
import { initMsw } from '@/mocks';

initMsw();

const kiaFont = localFont({
  src: [
    {
      path: '../fonts/KiaSignatureFixRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/KiaSignatureFixBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-kia', // Tailwind에서 사용하기 위한 CSS 변수 설정
});

export const metadata: Metadata = {
  title: '서비스 이용 FAQ | 위블 비즈(Wible Biz) - 친환경 모빌리티 서비스',
  description:
    '위블 비즈는 기업을 위한 친환경 모빌리티 서비스로 차량부터 전용 App/Web까지 업무차량 토탈 솔루션을 제공합니다.',
  keywords:
    '위블비즈,위블 비즈,모빌리티,구독서비스,차량구독,차량관리,업무용차량,법인차,관용차,전기차,FMS,스마트솔루션',
  robots: 'index,follow',
  openGraph: {
    title: '서비스 이용 FAQ | 위블 비즈(Wible Biz) - 친환경 모빌리티 서비스',
    description:
      '위블 비즈 서비스 이용 FAQ를 통해 차량(전기차), 정비, 충전, 고객센터, 관리자, App 등 차량관리 토탈 솔루션의 이용 방법을 자세하게 알아보세요.',
    url: 'https://wiblebiz.kia.com/FAQ',
    siteName: '위블 비즈(Wible Biz)',
    images: [
      {
        url: '/images/wb_sns_default.jpg',
        width: 1200,
        height: 630,
        alt: '위블 비즈 SNS 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '서비스 이용 FAQ | 위블 비즈(Wible Biz) - 친환경 모빌리티 서비스',
    description:
      '위블 비즈 서비스 이용 FAQ를 통해 차량(전기차), 정비, 충전, 고객센터, 관리자, App 등 차량관리 토탈 솔루션의 이용 방법을 자세하게 알아보세요.',
    images: ['/images/wb_sns_default.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kiaFont.variable} font-kia`}>
        <MSWWrapper>
          <QueryProvider>{children}</QueryProvider>
        </MSWWrapper>
      </body>
    </html>
  );
}
