import '@testing-library/jest-dom';
import { createRoot } from 'react-dom/client';
import { act, ReactElement } from 'react';

let container: HTMLDivElement

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null as any
})

export const render = (ui: ReactElement) => {
  const root = createRoot(container)
  act(() => {
    root.render(ui)
  })
  return { container }
}
