import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

import KiaLogo from '@/assets/logo_kia.svg';
import { cn } from '@/utils/cn';

const AddressItem = ({
  as: Component = 'i',
  name,
  value,
}: {
  as?: keyof JSX.IntrinsicElements; // HTML 태그 타입 제한
  name: string;
  value: string;
}) => {
  return (
    <>
      <span className="inline-flex lg:ml-[12px] xl:ml-[12px] sm:mr-[12px] md:mr-[12px]">
        {name}:{' '}
        <Component className={cn('not-italic', Component === 'i' ? 'ml-[4px]' : 'ml-[12px]')}>
          {value}
        </Component>
      </span>
    </>
  );
};

const Footer = () => {
  return (
    <footer
      className="flex sm:flex-col-reverse md:flex-col-reverse sm:items-start md:items-start sm:pt-[18px] px-[var(--side-padding)] md:pt-[34px] sm:pb-[29px] md:pb-[44px]
    justify-between items-center bg-midnight-900 text-gray-400 h-[var(--footer-height)] leading-[var(--line-height)]"
    >
      <div>
        <Image src={KiaLogo} alt="Kia Logo" height={56} className="mb-[2px]" />
        <p className="text-[14px] sd:text-[12px] text-gray-400">
          © 2023 KIA CORP. All Rights Reserved.
        </p>
      </div>
      <div className="flex flex-col items-end sm:items-start md:items-start ">
        <span className="text-white mb-[10px]">
          <Link
            href="https://privacy.kia.com/overview/full-policy"
            target="_blank"
            className="mr-[24px]"
          >
            <b>개인정보 처리방침</b>
          </Link>
          <button type="button">이용약관</button>
        </span>
        <address className="text-right sm:text-left md:text-left not-italic text-[14px] sm:text-[12px] text-gray-400">
          <AddressItem as="em" name="서울특별시 서초구 헌릉로 12" value="기아㈜" />
          <br className="lg:hidden xl:hidden md:hidden" />
          <AddressItem as="i" name="대표" value="송호성, 최준영" />
          <br className="lg:hidden xl:hidden" />
          <AddressItem as="i" name="사업자등록번호" value="119-81-02316" />
          <br className="lg:hidden xl:hidden md:hidden" />
          <AddressItem as="i" name="통신판매번호" value="2006-07935" />
          <br className="lg:hidden xl:hidden" />
          <AddressItem as="i" name="고객센터" value="1833-4964" />
          <br className="lg:hidden xl:hidden md:hidden" />
          <span className="inline-flex lg:ml-[12px] xl:ml-[12px] sm:mr-[12px] md:mr-[12px]">
            제휴문의:{' '}
            <a className="underline ml-[4px]" href="mailto:wible.biz@kia.com">
              wible.biz@kia.com
            </a>
          </span>
        </address>
      </div>
    </footer>
  );
};

export default Footer;
