
import { useEffect, useState } from 'react'
import './App.css'
import ReactPlayer from 'react-player/youtube'
import Header from './components/Header';
import loader from "./assets/loader.svg"
import TopButton from './components/TopButton';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false)

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/posts/videos/stream?page=${page}`);
      const newVideos = await response.json();
      console.log(newVideos)
      setNextPage(newVideos.hasNextPage)
      setVideos([...videos, ...newVideos.docs]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading && nextPage
      ) {
        fetchVideos();
      }
    }
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <>
    <Header />
    <div className='flex flex-col gap-8 mb-3 py-5 justify-center'>
      {videos?.map((ca) => (
        <div className='bg-white w-full md:w-[42rem] px-4 py-4 mx-auto rounded-lg shadow-2xl' key={ca.id}>
          <h1 className='text-4xl font-semibold pb-2'>{ca.title}</h1>
          <div className='py-2'>
            <p className='bg-gray-300 text-center rounded-full w-[7rem] text-lg text-black/70 '>{ca.type}</p>
          </div>
          <div className='rounded-lg overflow-hidden'>
            <ReactPlayer url={ca.media.url} />
          </div>
        </div>
      ))}
      {loading && <img className='w-10 mx-auto' src={loader} alt="loader" />}
    </div>
    <TopButton />
    </>
  )
}

export default App
