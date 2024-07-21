import { FC } from 'react'
import Home from '@pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SuspenseComponent from '@components/Suspense'

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SuspenseComponent>
              <Home />
            </SuspenseComponent>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
