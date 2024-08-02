import React, { useState, ReactNode, Children, cloneElement } from "react";

interface CarouselProps {
  children: ReactNode;
  slidesPerView: number; // new prop
}

interface CarouselProps {
  children: React.ReactNode;
  slidesPerView: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, slidesPerView }) => {
  const items = Children.toArray(children);
  const [pageIndex, setPageIndex] = useState(0);

  const goToPrevious = () => {
    setPageIndex((prevPageIndex) =>
      prevPageIndex === 0 ? Math.ceil(items.length / slidesPerView) - 1 : prevPageIndex - 1
    );
  };

  const goToNext = () => {
    setPageIndex((prevPageIndex) =>
      prevPageIndex === Math.ceil(items.length / slidesPerView) - 1 ? 0 : prevPageIndex + 1
    );
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-300"
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
  );
};

interface CarouselItemProps {
  children: React.ReactNode;
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
      <Carousel slidesPerView={2}>
        <CarouselItem>
          <div className="h-64 bg-blue-500 flex items-center justify-center text-white text-xl">
            Slide 1
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-64 bg-red-500 flex items-center justify-center text-white text-xl">
            Slide 2
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-64 bg-green-500 flex items-center justify-center text-white text-xl">
            Slide 3
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-64 bg-green-400 flex items-center justify-center text-white text-xl">
            Slide 4
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-64 bg-green-300 flex items-center justify-center text-white text-xl">
            Slide 5
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  );
};

export default App;
