import{Header} from './components/Header/Header'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import{Section} from './components/Section/Section'
import {Footer} from './components/Footer/Footer'

import './App.css'

function App() {
  const queryClient = new QueryClient();

  return (
    <>
   <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <Section/>
        <Footer/>
      </div>
    </QueryClientProvider>
    </>
  )
}

export default App
