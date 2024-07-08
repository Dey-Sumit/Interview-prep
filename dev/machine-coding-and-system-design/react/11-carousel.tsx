{
  /* <Carousel withIndicators height={200}>
  <Carousel.Slide>1</Carousel.Slide>
  <Carousel.Slide>2</Carousel.Slide>
  <Carousel.Slide>3</Carousel.Slide>
</Carousel>; */
}

export const darkTailwindBgColors = [
  "bg-gray-800",
  "bg-red-800",
  "bg-yellow-800",
  "bg-green-800",
  "bg-blue-800",
  "bg-indigo-800",
  "bg-purple-800",
  "bg-pink-800",
  "bg-gray-900",
  "bg-red-900",
  "bg-yellow-900",
  "bg-green-900",
  "bg-blue-900",
  "bg-indigo-900",
  "bg-purple-900",
  "bg-pink-900",
  "bg-gray-950",
];

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
  loop = true,
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(loop ? 1 : 0);
  const [transitionDuration, setTransitionDuration] = useState(300);

  //  const slides = React.Children.toArray(children);
  const slidesWithProps =
    React.Children.map(children, (child, index) =>
      React.cloneElement(child as React.ReactElement<any>, { slideIndex: index })
    ) || [];

  const totalSlides = slidesWithProps?.length || 0;

  const onPrev = () => {
    setTransitionDuration(300);
    setActiveIndex((currentActiveIndex) => {
      const newIndex = currentActiveIndex - 1;
      if (loop) {
        return newIndex < 0 ? totalSlides : newIndex;
      }
      return newIndex < 0 ? totalSlides - 1 : newIndex;
    });
  };

  const onNext = () => {
    setTransitionDuration(300);

    setActiveIndex((currentActiveIndex) => {
      const newIndex = currentActiveIndex + 1;
      if (loop) {
        return newIndex > totalSlides + 1 ? 0 : newIndex;
      }
      return newIndex > totalSlides - 1 ? 0 : newIndex;
    });
  };

  const handleTransitionEnd = () => {
    if (loop) {
      if (activeIndex === 0) {
        setTransitionDuration(0);
        setActiveIndex(totalSlides);
      } else if (activeIndex === totalSlides + 1) {
        setTransitionDuration(0);
        setActiveIndex(1);
      }
    }
  };

  return (
    <div
      className="relative flex flex-col border overflow-hidden "
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <div
        className="flex h-full transition-transform"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* 2 0 1 2 0         */}
        {loop && slidesWithProps[totalSlides - 1]}

        {slidesWithProps?.map((slide, index) => (
          <>{slide}</>
        ))}
        {loop && slidesWithProps[0]}
      </div>
      {withIndicators && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slidesWithProps.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                index === activeIndex - 1 ? "bg-white" : ""
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

const Slide = ({
  children,
  slideIndex,
}: PropsWithChildren<{
  slideIndex?: number;
}>) => {
  console.log("Slide", slideIndex);

  return (
    <div
      className={`grid place-items-center  w-full flex-grow-0 flex-shrink-0 basis-full ${
        darkTailwindBgColors[slideIndex || 0]
      } `}
    >
      {children}
    </div>
  );
};
Slide.displayName = "Slide";

Carousel.Slide = Slide;

const CarouselDemo = () => {
  return (
    <Carousel>
      <Carousel.Slide>0</Carousel.Slide>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
    </Carousel>
  );
};

export default CarouselDemo;
