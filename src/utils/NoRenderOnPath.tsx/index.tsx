import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface NoRenderOnPathProps {
  noRenderPaths?: string[];
  children: ReactNode;
}

const NoRenderOnPath: React.FC<NoRenderOnPathProps> = (props: NoRenderOnPathProps) => {
  const location = useLocation();
  return props.noRenderPaths && props.noRenderPaths.includes(location.pathname) ? (
    <></>
  ) : (
    <>{props.children}</>
  );
};

export default NoRenderOnPath;