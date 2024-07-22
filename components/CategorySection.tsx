// components/CategorySection.tsx

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { Book } from "@/app/interfaces/Book";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useBookFetch } from "@/app/hooks/useBookFetch";

interface CategorySectionProps {
  category: { key: string; label: string };
}

export default function CategorySection({ category }: CategorySectionProps) {
  const { books, isLoading } = useBookFetch(category);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const renderLoadingMasks = () => (
    <>
      <div className="w-1/3 h-8 bg-gray-300 rounded mb-6 animate-pulse"></div>
      <div className="relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div className="flex overflow-hidden px-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="mask-placeholder shadow-sm mr-4 flex flex-col items-center justify-center border p-4 rounded cursor-pointer hover:border-blue-500 bg-gray-200 animate-pulse w-[164px]"
            >
              <div
                className="w-full bg-gray-300 mb-2"
                style={{ aspectRatio: "2/3" }}
              ></div>
              <div className="w-full h-4 bg-gray-300 mb-2"></div>
              <div className="w-2/3 h-4 bg-gray-300"></div>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </>
  );

  if (isLoading) {
    return (
      <section className="category-section mx-4 p-10 border-b border-b-foreground/5 border-t border-t-foreground/5">
        {renderLoadingMasks()}
      </section>
    );
  }

  // Don't render anything if there are no books
  if (books.length === 0) {
    return null;
  }

  return (
    <section className="category-section mx-4 p-10 border-b border-b-foreground/5 border-t border-t-foreground/5">
      <h3 className="text-2xl font-bold mb-6">{category.label}</h3>
      <div className="relative embla__wrapper">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="embla__button embla__button--prev dark:bg-white dark:text-black"
        />
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {books.map((book, index) => (
              <div
                key={`${book.id}-${index}`}
                className="embla__slide each-book pt-0 px-2 min-w-[200px] h-auto"
              >
                <div className="shadow-sm border p-4 rounded cursor-pointer hover:border-blue-500 h-full flex flex-grow flex-col">
                  {book.volumeInfo.imageLinks && (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                      className="w-32 h-48 object-cover mb-4"
                    />
                  )}
                  <h4 className="text-lg font-bold text-center line-clamp-2">
                    {book.volumeInfo.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="embla__button embla__button--next dark:bg-white dark:text-black"
        />
      </div>
    </section>
  );
}
