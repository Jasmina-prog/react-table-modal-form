import './App.css'
import TablePage from './TablePage'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return(
  <>
  <QueryClientProvider client={queryClient}>
  <TablePage/>
  </QueryClientProvider>
  </>
  )
}
 export default App