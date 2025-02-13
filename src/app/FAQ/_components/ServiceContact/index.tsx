import Image from 'next/image';
import { ReactNode } from 'react';

import DownLoadIcon from '@/assets/ic_download.svg';
import WriteIcon from '@/assets/ic_write.svg';
import KakaoIcon from '@/assets/ic_talk.svg';
import withTitle from '@/components/withTitle';

const ServiceContactItem = ({
  children,
  ...props
}: { children: ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...props}
      className="flex flex-1 justify-center sm:justify-start items-center text-[length:var(--btn-xxlg-size)] 
    h-[var(--btn-xxlg)] min-h-[var(--btn-xxlg)] px-[1.4em] font-semibold  
    my-0 border border-midnight-900 hover:bg-gray-50 md:last:min-w-[calc(100%-var(--space-md))]"
    >
      {children}
    </a>
  );
};

const ServiceContact = () => {
  return (
    <div className="flex text-midnight-900 gap-[calc(var(--space-md)/2)] md:flex-wrap sm:flex-col sm:gap-[12px]">
      <ServiceContactItem href="/WibleBizProductProposal.pdf" download="위블비즈 상품제안서.pdf">
        <Image className="mr-[8px]" src={DownLoadIcon} alt="DownLoad Icon" />
        <span>상품제안서 다운로드</span>
      </ServiceContactItem>

      <ServiceContactItem href="https://wiblebiz.kia.com/Counsel">
        <Image className="mr-[8px]" src={WriteIcon} alt="Write Icon" />
        <span>상담문의 등록하기</span>
      </ServiceContactItem>

      <ServiceContactItem href="https://pf.kakao.com/_xfLxjdb">
        <Image className="mr-[8px]" src={KakaoIcon} alt="KakaoTalk Icon" />
        <span className="inline-flex flex-col">
          카톡으로 문의하기{' '}
          <em className="text-[14px] text-gray-500 font-normal not-italic">
            ID: Wible Biz(위블 비즈)
          </em>
        </span>
      </ServiceContactItem>
    </div>
  );
};

export default withTitle(ServiceContact, '서비스 문의');
