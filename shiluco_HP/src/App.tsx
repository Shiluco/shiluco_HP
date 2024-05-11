import './App.css'
import eating_man from './assets/eating_man.png'
import bus from './assets/bus.png'

function App() {
  const url_goto_hama = `https://transit.yahoo.co.jp/search/result?flatlon=&fromgid=&from=六間坂上%2F遠鉄バス&to=浜松駅%2F遠鉄バス&viacode=&via=&viacode=&via=&viacode=&via=&type=1&ticket=ic&expkind=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1`
  const url_goto_home = `https://transit.yahoo.co.jp/search/result?flatlon=&fromgid=&from=浜松駅%2F遠鉄バス&to=六間坂上%2F遠鉄バス&viacode=&via=&viacode=&via=&viacode=&via=&type=1&ticket=ic&expkind=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1`
  const url_goto_home_chuo = `https://transit.yahoo.co.jp/search/result?flatlon=&fromgid=&from=田町中央通り%2F遠鉄バス&to=六間坂上%2F遠鉄バス&viacode=&via=&viacode=&via=&viacode=&via=&type=1&ticket=ic&expkind=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1`
  const url_hama_coop = `https://twitter.com/hama_coop`



  return (
    <>
      <h1 id="title" >my os</h1>
      <div id="element">
        <div id="bus_all">
          <a id="bus_loku_to_hama" href={url_goto_hama} target="_blank">
            <img className='img_bus' src={bus} alt="bus" />
            <p className='text'>六間坂上→浜松駅</p>
            </a>
          
          <a id="bus_hama_to_loku" href={url_goto_home} target="_blank">
            <img className='img_bus' src={bus} alt="bus" />
            <p className='text'>浜松駅→六間坂上</p>
          </a>
          
          <a id="bus_tama_to_loku" href={url_goto_home_chuo} target="_blank">
            <img className='img_bus' src={bus} alt="bus" />
            <p className='text'>田町中央通り→六間坂上</p>
          </a>
        </div>
        
        <a id="coop" href={url_hama_coop} target="_blank">
          <img id="img_eating_man" src={eating_man} alt="eating_man"  />
          <p className='text'>生協X</p>
        </a>
      </div>
    </>
  )
}

export default App
