import React, { Suspense, useEffect, useState } from 'react';
import { Spinner } from 'grommet';

function useDelayRender(delayInMilliseconds: number) {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delayInMilliseconds);
    return () => clearTimeout(timeout);
  }, []);
  return (fn: () => any) => !delayed && fn();
}

function Fallback({
  children,
  delayInMilliseconds,
}: DelayRenderProps) {
  return useDelayRender(delayInMilliseconds)(() => children);
}

type DelayRenderProps = {
  children: React.ReactNode;
  delayInMilliseconds?: number;
};

function DelayRender({
  children,
  delayInMilliseconds,
}: DelayRenderProps) {
  return (
    <Suspense fallback={<Fallback delayInMilliseconds={delayInMilliseconds}><Spinner /></Fallback>}>
      {children}
    </Suspense>
  );
}

DelayRender.defaultProps = {
  delayInMilliseconds: 500,
};

export default DelayRender;
