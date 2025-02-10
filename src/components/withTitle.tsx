import { ComponentType } from 'react';

const withTitle = <P extends object>(WrappedComponent: ComponentType<P>, title: string) => {
  const WithTitleComponent = (props: P) => (
    <>
      <h2 className="font-bold text-[length:var(--heading-2)] mt-[48px] mx-0 mb-[24px]">{title}</h2>
      <WrappedComponent {...props} />
    </>
  );

  WithTitleComponent.displayName = `WithTitle(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithTitleComponent;
};

export default withTitle;
