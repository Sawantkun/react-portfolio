import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import image from "../assets/Video/friendd.webp";
import image2 from "../assets/Video/ChatX.webp";
import Right from "../assets/Svgs/right.svg"

// Cursor component
const Cursor = ({ cursorVariant }) => {
  const cursorStyle = {
    position: 'fixed',
    width: 20,
    height: 20,
    borderRadius: '50%',
    pointerEvents: 'none',
    backgroundColor: 'white',
    mixBlendMode: 'difference',
    transform: 'translate(-50%, -50%)',
    transition: 'transform 0.1s ease, background-color 0.1s ease',
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  useEffect(() => {
    const handleMouseMove = e => {
      cursorStyle.x.set(e.clientX);
      cursorStyle.y.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorStyle]);

  const cursorVariants = {
    default: {
      x: cursorStyle.x,
      y: cursorStyle.y,
      backgroundColor: 'white',
      mixBlendMode: 'difference',
    },
    text: {
      height: 35,
      width: 35,
      x: cursorStyle.x,
      y: cursorStyle.y,
      backgroundColor: 'white',
      mixBlendMode: 'difference',
    },
  };

  return (
    <motion.div
      className='cursor'
      style={cursorStyle}
      variants={cursorVariants}
      animate={cursorVariant}
    />
  );
};

export const HoverImageLinks = () => {
  const [cursorVariant, setCursorVariant] = useState('default');

  const textEnter = () => setCursorVariant('text');
  const textLeave = () => setCursorVariant('default');

  return (
    <section className="bg-neutral-950 p-0 md:p-8 md:h-[160vh]">
       <div className="text-neutral-500 py-0 hor-scroll text-[10rem]">
      <span className="flex">
        <h1 className="mx-10">Projects</h1>
        <h1 className="mx-10">Projects</h1>
        <h1 className="mx-10">Projects</h1>
      </span>
      <span className="flex">
        <h1 className="mx-10">Projects</h1>
        <h1 className="mx-10">Projects</h1>
        <h1 className="mx-10">Projects</h1>

      </span>
    </div>
      <div className="mx-auto max-w-5xl py-10">
        <Link
          heading="JetX"
          subheading="Shop Best Labels for your Products"
          imgSrc={image}
          href="#"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        />
        <Link
          heading="Planit.io"
          subheading="Professional scheduling,zigzag Made Efficient."
          imgSrc={image}
          href="#"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        />
        <Link
          heading="ChatX"
          subheading="Communication made private"
          imgSrc={image2}
          href="#"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        />
        <Link
          heading="MultiAI"
          subheading="All your AI needs, in one place"
          imgSrc={image}
          href="#"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        />
        <Link
          heading="Frienducation"
          subheading="Learn today, learn tomorrow"
          imgSrc={image}
          href="#"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        />
      </div>
      <Cursor cursorVariant={cursorVariant} />
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, href, onMouseEnter, onMouseLeave }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-80"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            rotate:"-45deg",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            rotate:"0deg",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
      <img src={Right} className=" text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};

export default HoverImageLinks;
