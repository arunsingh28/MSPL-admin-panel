import SidebarItem from './SidebarItems'
import items from './data.json'
import Logo from '../../Assets/LOGO.png'

export default function Navbar() {
  return(
    <div className='
    bg-gradient-to-b from-[#9d081e] to-[#3F0D12]
    overflow-x-scroll h-screen'>
      {/* <h1 className='text-white text-center text-4xl py-4'>Sportylife</h1> */}
      <img src={Logo} alt="SportyLife" className='w-18'/>
      {
        items.map((item:any,index:number)=>
          <SidebarItem key={index} item={item} />
        )
      }
    </div>
  )
}