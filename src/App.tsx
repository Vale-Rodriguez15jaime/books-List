import { FC } from 'react'
import Home from '@pages/Home'
import BookStore from '@pages/BookStore'
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
        <Route
          path="/bookstore"
          element={
            <SuspenseComponent>
              <BookStore />
            </SuspenseComponent>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
