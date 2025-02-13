import Link, { LinkProps } from 'next/link';
import Image from 'next/image';

import GooglePlayLogo from '@/assets/logo_googleplay.svg';
import AppStoreLogo from '@/assets/logo_appstore.svg';
import { ReactNode } from 'react';

const APP_STORE_LINK = {
  googlePlay: 'https://play.google.com/store/apps/details?id=kor.mop.user.app',
  appStore: 'https://apps.apple.com/kr/app/%EC%9C%84%EB%B8%94-%EB%B9%84%EC%A6%88/id1598065794',
};

const StoreLink = ({ children, ...props }: { children: ReactNode } & LinkProps) => {
  return (
    <Link
      className="flex justify-center items-center h-[60px] bg-white rounded-[8px] 
      xl:w-[392px] lg:w-[296px] md:w-[264px] sm:max-w-[264px] sm:w-full"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </Link>
  );
};

const ServiceAppInfo = () => {
  return (
    <div className="bg-gray-10 rounded-[16px] flex flex-col items-center mt-[48px] overflow-hidden p-[32px]">
      <h2 className="mb-6 font-bold xl:text-[32px] lg:text-[24px] md:text-[20px] sm:text-[16px]">
        <em className="not-italic text-mint-900">위블 비즈 App</em> 지금 만나보세요!
      </h2>
      <div className="flex justify-center sm:flex-col md:flex-col sm:items-center md:items-center font-semibold gap-[16px] w-full">
        <StoreLink href={APP_STORE_LINK.googlePlay}>
          <Image src={GooglePlayLogo} alt="GooglePlay Logo" />
          Google Play
        </StoreLink>
        <StoreLink href={APP_STORE_LINK.appStore}>
          <Image src={AppStoreLogo} alt="AppStore Logo" />
          App Store
        </StoreLink>
      </div>
    </div>
  );
};

export default ServiceAppInfo;
