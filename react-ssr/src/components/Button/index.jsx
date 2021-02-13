import React, { memo } from 'react';
import { Button } from 'antd';

const Index = memo(({
  hidden, children, type = 'primary', onClick,
}) => {
  if (hidden) return '';

  return (
    <Button
      type={type}
      onClick={onClick}
    >
      { children}
    </Button>
  );
});

export default Index;
