import React, { useState, Children, cloneElement } from "react";

interface CarouselProps {
  children: React.ReactNode;
  slidesPerView: number;
  step: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, slidesPerView = 1, step = 1 }) => {
  const items = Children.toArray(children);
  const totalItems = items.length;

  const totalPages = Math.ceil(totalItems / slidesPerView) + step; // 5/2 = 2.5 items per slide = total pages 3
  const [pageIndex, setPageIndex] = useState(0); // ! LOOP! should be changed

  const goToPrevious = () => {
    setPageIndex((prevPageIndex) => {
      const newIndex = prevPageIndex - step;
      return newIndex < totalPages ? newIndex : 0;
    });
  };

  const goToNext = () => {
    setPageIndex((prevPageIndex) => {
      const newIndex = prevPageIndex + step;
      return newIndex >= totalPages ? 0 : newIndex;
    });
  };

  return (
    <>
      <div className="relative border">
        <div
          className="flex transition-transform duration-300 "
          style={{ transform: `translateX(-${(pageIndex * 100) / slidesPerView}%)` }}
        >
          {items.map((item, index) =>
            cloneElement(item as React.ReactElement, {
              key: index,
              style: { flex: `0 0 ${100 / slidesPerView}%` },
            })
          )}
        </div>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
          onClick={goToPrevious}
          aria-label="Previous"
        >
          Previous
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
          onClick={goToNext}
          aria-label="Next"
        >
          Next
        </button>
      </div>
      <div className="p-4">
        <pre>
          {JSON.stringify(
            {
              pageIndex,
              totalPages,
              totalItems,
              slidesPerView,
            },
            null,
            2
          )}
        </pre>
      </div>
    </>
  );
};

interface CarouselItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children, style }) => {
  return (
    <div className=" flex-shrink-0" style={style}>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto">
      <Carousel slidesPerView={2} step={2}>
        <CarouselItem>
          <div className="h-64 bg-blue-500 flex items-center justify-center text-white text-lg">
            Slide 1
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-64 bg-red-500 flex items-center justify-center text-white text-lg">
            Slide 2
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-64 bg-green-500 flex items-center justify-center text-white text-lg">
            Slide 3
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-64 bg-green-400 flex items-center justify-center text-white text-lg">
            Slide 4
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  );
};

export default App;
