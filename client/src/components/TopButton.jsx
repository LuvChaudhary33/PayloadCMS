import { useState, useEffect } from "react"
import {IoIosArrowDropup} from "react-icons/io"
const TopButton = () => {
    const [backToTop, setBackToTop] = useState(false)

    useEffect(() =>{
        window.addEventListener("scroll", () =>{
            if(window.scrollY >100){
                setBackToTop(true)
            }else{
                setBackToTop(false)
            }
        })
    }, [])

    const scrollUp = () =>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

  return (
    <div>
        {backToTop && <button className=" rounded-full text-white fixed bottom-[50px] right-[50px] h-[50px] w-[50px] text-5xl" onClick={scrollUp}><IoIosArrowDropup className="fill-black"/></button>}
    </div>
  )
}

export default TopButton