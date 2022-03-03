import { useState, useEffect } from "react";

const images = [
  {
    src: "/images/landing/carousel/1.png",
    title: "Ketik65",
    subtitle: "THOCC Experience",
  },
  {
    src: "/images/landing/carousel/2.jpg",
    title: "Ketik65+",
    subtitle: "VERY THOCC Experience",
  },
];

const CarouselWrapper = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex) => (activeIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className={`text-white ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${
            index === activeIndex ? "" : "hidden"
          } flex relative top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat `}
          style={{
            backgroundImage: `url(${image.src})`,
          }}
        >
          <div className="top-0 left-0 w-full h-screen absolute bg-black opacity-50" />
          <div className="top-0 left-0 w-full h-screen absolute flex flex-col justify-center pl-48 gap-4">
            <h1 className="text-7xl font-bold">{image.title}</h1>
            <h2 className="text-2xl font-light">{image.subtitle}</h2>
          </div>
        </div>
      ))}
      <div className="bottom-0 left-0 w-full h-full flex flex-col justify-end gap-32 pb-20">
        {children}
        <div className="flex justify-between mx-20">
          <br />
          <button className="">FIND MORE</button>
          <div className="flex gap-4">
            {images.map((image, index) => (
              <button key={index} onClick={() => setActiveIndex(index)}>
                <div
                  className={`h-1 w-14 bg-white ${
                    index === activeIndex ? "opacity-100" : " opacity-30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselWrapper;
