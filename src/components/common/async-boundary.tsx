import { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
  errorFallback: ReactNode;
}

export default function AsyncBoundary({
  children,
  fallback,
  errorFallback,
}: Props) {
  return (
    <ErrorBoundary fallback={<>{errorFallback}</>}>
      <Suspense fallback={<>{fallback}</>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
