import Image from "next/image";

const images = [
  {
    src: "/images/landing/carousel/1.png",
    title: "Ketik65",
    subtitle: "THOCC Experience",
  },
  {
    src: "/images/landing/carousel/2.jpg",
    title: "Ketik65",
    subtitle: "THOCC Experience",
  },
];

const Carousel = ({ className }: { className?: string }) => {
  return (
    <div className={`text-white ${className}`}>
      <div>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.title}
            layout="fill"
            className="h-full"
          />
        ))}
      </div>
      <div className="flex justify-between mx-20 z-10 relative">
        <br />
        <span className="">FIND MORE</span>
        <div className="flex gap-4">
          {images.map((image, index) => (
            <button key={index}>IMAGE</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
