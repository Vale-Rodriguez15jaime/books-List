import { FC } from 'react'
import Home from '@pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SuspenseComponent from '@components/Suspense'

// interface Response {
//   data?: {
//     items: BookType[]
//   }
// }

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
    // <div>
    //   <SearchInput setResponse={setResponse} />
    //   {response.data && <Books books={response.data.items} /> }
    // </div>
  )
}

export default App
