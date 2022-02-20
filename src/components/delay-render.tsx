import React, { Suspense, useEffect, useState } from 'react';
import { Spinner } from 'grommet';

function useDelayRender<T>(delayInMilliseconds: number) {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delayInMilliseconds);
    return () => clearTimeout(timeout);
  }, []);
  return (fn: () => T) => !delayed && fn();
}

function Fallback({
  children,
  delayInMilliseconds,
}: DelayRenderProps) {
  return useDelayRender<JSX.Element>(delayInMilliseconds)(() => children);
}

type DelayRenderProps = {
  children: JSX.Element;
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
