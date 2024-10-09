"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import { LiaStarSolid } from "react-icons/lia";
import { SubmitHandler, useForm } from "react-hook-form";

type Book = {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
};

type Review = {
  id: number;
  text: string;
};

type ReviewFormInputs = {
  review: string;
};

function BookDetail({ params }: { params: { id: string } }): JSX.Element {
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  //react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormInputs>();

  useEffect(() => {
    const fetchBook = async (): Promise<void> => {
      const res: Response = await fetch("/data/books.json");
      const data: Book[] = await res.json();
      const selectedBook: Book | undefined = data.find(
        (book) => book.id === parseInt(params.id as string)
      );
      setBook(selectedBook || null);
    };

    fetchBook();
  }, [params.id]);

  const onSubmit: SubmitHandler<ReviewFormInputs> = (data):void => {
    const newReview: Review = {
      id: reviews.length + 1,
      text: data.review,
    };
    setReviews([...reviews, newReview]);
    reset(); //reset form after submission
  };

  if (!book) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="conatiner mx-auto p-6 mt-20">
        <h1 className="text-2xl lg:text-3xl font-bold mb-10 text-center lg:text-left">
          Book Details
        </h1>
        <div>
          <h2 className=" text-3xl md:text-4xl font-semibold mb-2 text-center">
            {book.title}
          </h2>
          <p className="text-xl mb-4 text-center">by {book.author}</p>
          <Image
            src={book.coverImage}
            alt={book.title}
            width={200}
            height={250}
            className="mx-auto p-4"
            priority
          />
          <p className="text-lg mb-6 md:text-center text-justify">
            {book.description}
          </p>
        </div>

        <div className="mt-5">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <ul className="mb-4">
            {reviews.map((review) => (
              <li key={review.id} className="mb-2">
                <p className="flex gap-2 items-center border-2 border-gray-400 p-2">
                  <LiaStarSolid className="text-yellow-400" />
                  {review.text}
                </p>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <textarea
              {...register("review", { required: true })}
              placeholder="Write a review..."
              className="w-full p-2 border border-gray-400 rounded-lg mb-4 outline-none"
            />
            {errors.review && (
              <p className="text-red-500">Review is required</p>
            )}

            <button
              type="submit"
              className="bg-gray-400 text-white text-medium px-4 py-2 rounded-lg"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookDetail;
