import {BrowserRouter, Route, Routes} from "react-router-dom"
import {HomeScreen} from './components/Screens/HomeScreen'
import {PlaygroundScreen} from './components/Screens/PlaygroundScreen'
import { PlaygroundProvider } from './components/Providers/PlaygroundProvider'
import ModalProvider from './components/Providers/ModalProvider'

function App() {
  
  return (
    <>
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/playground/:fileId/:folderId' element={<PlaygroundScreen />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
     </PlaygroundProvider>
    </>
  )
}

export default App
