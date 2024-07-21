import { FC, ReactElement, Suspense } from 'react'

const SuspenseComponent: FC<{ children: ReactElement }> = ({ children }) => {
  return <Suspense fallback={<div>Loading... </div>}>{children}</Suspense>
}

export default SuspenseComponent
