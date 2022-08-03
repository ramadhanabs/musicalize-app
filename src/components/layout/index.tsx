import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return <div style={{ marginLeft: '240px', padding: '16px' }}>{children}</div>;
};

export default AppLayout;
