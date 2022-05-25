import './App.css'
import { BrowserRouter } from 'react-router-dom'
import TabsQl from './component/quanlygc/TabsQl'
import Header from './component/Header'

function App() {
  return (
    <div className='App container'>
      <Header/>
        <TabsQl />

    </div>
  )
}

export default App
