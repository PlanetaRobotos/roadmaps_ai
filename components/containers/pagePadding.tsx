import React from 'react';

type Props = {
  children: React.ReactNode;
};

const PagePadding = (props: Props) => {
  const { children } = props;
  return <div className="mx-auto px-[10px] py-2 lg:px-[100px]">{children}</div>;
};

export default PagePadding;
