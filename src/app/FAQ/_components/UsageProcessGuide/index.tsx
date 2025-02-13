import Image from 'next/image';
import withTitle from '@/components/withTitle';

import Proccess1Icon from '@/assets/ic_process01.svg';
import Proccess2Icon from '@/assets/ic_process02.svg';
import Proccess3Icon from '@/assets/ic_process03.svg';
import Proccess4Icon from '@/assets/ic_process04.svg';
import StepArrowIcon from '@/assets/ic_step_arrow.svg';

const STEP = [
  {
    id: 1,
    title: '문의 등록',
    description: '상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을 제공합니다.',
    icon: Proccess1Icon,
  },
  {
    id: 2,
    title: '관리자 설정',
    description: '관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.',
    icon: Proccess2Icon,
  },
  {
    id: 3,
    title: '임직원 가입',
    description: '사용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.',
    icon: Proccess3Icon,
  },
  {
    id: 4,
    title: '서비스 이용',
    description: '사용자 App에서 차량 예약을 하고 위블존에서 바로 이용하세요!',
    icon: Proccess4Icon,
  },
] as const;

const UsageProcessGuide = () => {
  return (
    <ol className="flex md:flex-col sm:flex-col sm:gap-[24px] md:gap-[24px] mx-[-calc(var(--space-md)/2)]">
      {STEP.map((step, idx) => {
        return (
          <li
            className="flex-1 md:flex sm:flex md:p-0 sm:p-0
            md:m-0 sm:m-0 sm:gap-[16px] md:gap-[16px] mx-[calc(var(--space-md)/2)] px-6"
            key={step.id}
          >
            <Image src={step.icon} alt={step.description} className="mb-[8px]" />
            <span className="flex flex-col relative">
              <strong>
                {idx + 1}. {step.title}
              </strong>
              <em className="not-italic text-[16px] text-gray-700 mt-[8px]">{step.description}</em>
              {!!idx && (
                <Image
                  src={StepArrowIcon}
                  alt="Step Arrow Icon"
                  className="absolute top-0 -left-[36px] sm:hidden md:hidden"
                />
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default withTitle(UsageProcessGuide, '이용 프로세스 가이드');
