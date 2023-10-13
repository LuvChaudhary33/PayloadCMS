
const Header = () => {
  return (
    <div className="bg-white flex justify-between items-center w-full px-2 md:px-16 py-2 border border-b-black/9">
        <h1 className="text-5xl font-bold cursor-pointer">LUV<span className="text-violet-500">.</span></h1>
        <ul className="flex gap-8">
            <li className="cursor-pointer py-2 hover:text-violet-500">Home</li>
            <li className="cursor-pointer py-2 hover:text-violet-500">Contact Us</li>
        </ul>
    </div>
  )
}

export default Header