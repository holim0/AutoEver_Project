import Header from './_components/Header';
import FAQContents from './_components/FAQContents';
import ServiceContact from './_components/ServiceContact';
import UsageProcessGuide from './_components/UsageProcessGuide';

const FAQPage = async () => {
  return (
    <main>
      <Header />
      <div className="min-h-[calc(100vh-var(--header-height)-var(--footer-height))] overflow-hidden px-[var(--side-padding)] pb-[var(--bottom-padding)]">
        <div className="mx-auto max-w-[1240px]">
          <h1 className="flex flex-col items-center justify-center font-bold text-[length:var(--h1-fsize)] h-[var(--h1-height)] leading-[var(--line-height-sm)]">
            자주 묻는 질문{' '}
            <em className="font-normal text-[length:var(--h1-fsize-sm)] leading-[var(--line-height-md)] mt-[0.4em] text-center break-keep not-italic">
              궁금하신 내용을 빠르게 찾아보세요.
            </em>
          </h1>
          <FAQContents />
          <ServiceContact />
          <UsageProcessGuide />
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
