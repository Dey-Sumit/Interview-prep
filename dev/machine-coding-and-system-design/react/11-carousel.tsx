{
  /* <Carousel withIndicators height={200}>
  <Carousel.Slide>1</Carousel.Slide>
  <Carousel.Slide>2</Carousel.Slide>
  <Carousel.Slide>3</Carousel.Slide>
</Carousel>; */
}

/*
- state to keep active index
- navigation buttons
- pagination
- logic to handle the slide
- render the children (row wise for now) 

*/
import React, { useState, PropsWithChildren, ReactNode } from "react";

type CarouselProps = {
  children: ReactNode;
  withIndicators?: boolean;
  height?: number;
  width?: number;
  loop?: boolean;
};

const Carousel = ({
  children,
  withIndicators = true,
  height = 300,
  width = 600,
  loop = false,
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(loop ? 1 : 0);

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const onPrev = () => {
    setActiveIndex(
      (currentActiveIndex) => (currentActiveIndex - 1 + slides.length) % slides.length
    );
  };

  const onNext = () => {
    setActiveIndex((currentActiveIndex) => (currentActiveIndex + 1) % slides.length);
  };
  const handleTransitionEnd = () => {
    if (activeIndex === 0) {
      setActiveIndex(slides.length);
    } else if (activeIndex === slides.length + 1) {
      setActiveIndex(1);
    }
  };

  // const onPrev = () => {
  //   setActiveIndex((currentActiveIndex) => {
  //     const newIndex = currentActiveIndex - 1;
  //     return newIndex < 0 ? slides.length : newIndex;
  //   });
  // };

  // const onNext = () => {
  //   setActiveIndex((currentActiveIndex) => {
  //     const newIndex = currentActiveIndex + 1;
  //     return newIndex > slides.length ? 0 : newIndex;
  //   });
  // };
  return (
    <div
      className="relative flex flex-col border-2 border-red-600 overflow-hidden"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <div
        className="flex h-full duration-300 transition-transform"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
        //  onTransitionEnd={handleTransitionEnd}
      >
        {/* <div className="flex-shrink-0 flex-grow-0 basis-full">{slides[totalSlides - 1]}</div> */}
        {slides.map((slide, index) => (
          <>{slide}</>
        ))}
      </div>
      {withIndicators && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                index === activeIndex ? "bg-white" : ""
              } border border-gray-400`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between text-sm w-full px-4 text-black">
        <button onClick={onPrev} className="bg-gray-200 px-4 py-1 rounded-full">
          Prev
        </button>
        <button onClick={onNext} className="bg-gray-200 px-4 py-1 rounded-full">
          Next
        </button>
      </div>
    </div>
  );
};

const Slide = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="grid place-items-center border w-full flex-grow-0 flex-shrink-0 basis-full">
      {children}
    </div>
  );
};

Carousel.Slide = Slide;

const CarouselDemo = () => {
  return (
    <Carousel>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
    </Carousel>
  );
};

export default CarouselDemo;
