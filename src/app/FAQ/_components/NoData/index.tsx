import Image from 'next/image';
import NoDataIcon from '@/assets/ic_nodata.svg';

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-[var(--space-box2)] border-b border-b-gray-200 border-t-2 border-t-midnight-900">
      <Image
        src={NoDataIcon}
        alt="No Data Icon"
        className="h-[var(--ic-xlg2)] w-auto mx-auto mb-[var(--space-xsm2)]"
      />
      <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
    </div>
  );
};

export default NoData;
