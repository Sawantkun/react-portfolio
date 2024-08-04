import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Music from "../assets/Music/Music.mp3";
import Github from "../assets/Svgs/github.svg";
import Instagram from "../assets/Svgs/instagram.svg";
import Linkedin from "../assets/Svgs/linkedin.svg";

const home = () => {
      const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
      });
      const [cursorVariant, setCursorVariant] = useState("default");
    
    
      useEffect(() => {
        const mouseMove = e => {
          setMousePosition({
            x: e.clientX,
            y: e.clientY
          })
        }
    
        window.addEventListener("mousemove", mouseMove);
    
        return () => {
          window.removeEventListener("mousemove", mouseMove);
        }
      }, []);
    
      const variants = {
        default: {
          x: mousePosition.x -1,
          y: mousePosition.y - 2,
          backgroundColor: "white",
          mixBlendMode: "difference"
        },
        text: {
          height: 350,
          width: 350,
          x: mousePosition.x - 175,
          y: mousePosition.y - 175,
          backgroundColor: "white",
          mixBlendMode: "difference"
        }
      }


      const [isPlaying, setIsPlaying] = useState(false);
      const audioRef = useRef(null);
      const togglePlayPause = () => {
        setIsPlaying((prevIsPlaying) => {
          const newIsPlaying = !prevIsPlaying;
    
          if (newIsPlaying) {
            audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
    
          return newIsPlaying;
        });
      };
      
    
      const textEnter = () => {
          setCursorVariant("text")
      };
      const textLeave = () => {
        setCursorVariant("default");
    };

    const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };    
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleScrollDown = () => {
    // Scroll down by a specific amount or to a specific element
    window.scrollTo({
      top: window.innerHeight, // You can adjust this value to control how much the page should scroll down
      behavior: 'smooth', // This adds a smooth scrolling effect
    });
  };
  return (
    <div className='text-[#d9d9d9] bg-[#0A0A0A] p-6 px-20 uppercase h-screen'>
        <motion.div
        className='cursor'
        variants={variants}
        animate={cursorVariant}
        />
        <div className='flex w-full items-center justify-between'>
            <div className='font-medium text-[1.4rem] cursor-none'>SK</div>
            <div className='font-medium text-[0.9rem] cursor-pointer'>Available For Full time</div>
            <div className='bg-[#d9d9d9] text-[black] px-6 py-2 font-light text-[0.9rem] cursor-none'>{formattedTime}</div>
        </div>
        <div className='flex w-full items-center justify-between  h-[80vh]'>
            <div>
                <span  onMouseEnter={textEnter} onMouseLeave={textLeave} className='ml-[17.5rem] font-medium pb-[1rem]'>SK</span>
                <div className='mt-[1rem]'>
                    <span  onMouseEnter={textEnter} onMouseLeave={textLeave} className='leading-[6.5rem] ml-[17rem] font-bold text-9xl'>Multi -</span>
                    <span  onMouseEnter={textEnter} onMouseLeave={textLeave} className='leading-[6.5rem] font-bold text-9xl ml-[8rem] '>disciplined</span>
                    <div className='flex items-center justify-center'>
                        <div  onMouseEnter={textEnter} onMouseLeave={textLeave} className='mr-6 font-bold text-9xl ml-[10rem]'>Developer</div>
                        <div  onMouseEnter={textEnter} onMouseLeave={textLeave} className='font-medium'>Good Design is honest</div>
                    </div>
                </div>
            </div>
            <div className=' w-[100px] flex flex-col items-center'> 
               <a target="_blank" href="https://github.com/Sawantkun"><img className='w-[20px] my-4' src={Github} alt="" /></a>
               <a target="_blank" href="https://www.linkedin.com/in/sawant-kumar-367638235/"><img className='w-[20px] my-4' src={Linkedin} alt="" /></a>
               <a target="_blank" href="https://www.instagram.com/sawant.jsx/"><img className='w-[20px] my-4' src={Instagram} alt="" /></a>
            </div>
        </div>
        <div className='flex w-full items-center justify-between'>
           <div className='flex justify-between items-start font-extrabold'>
               <audio ref={audioRef} src={Music} />
               <div className='text-[#737373] cursor-none'>Sound</div>
               <div onClick={togglePlayPause} className='cursor-pointer'>&nbsp; {isPlaying ? 'on' : 'off'}</div>
          </div>
           <div className='cursor-pointer mouse-scroll text-center mx-6' onClick={handleScrollDown}></div>
        </div>
    </div>
  )
}

export default home