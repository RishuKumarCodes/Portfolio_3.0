import './index.css'
import SiteBorder from './components/SiteBorder.jsx'
import Hero from './pageSections/Hero/Hero.jsx'

function App() {

  return (
    <>
    {/* preloader is directly added to index.html for faster loading time. */}
      <SiteBorder>
        <div className=''>
          <Hero/>
        </div>
      </SiteBorder>
    </>
  )
}

export default App
