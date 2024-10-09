"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

type Book = {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
};

const Home: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async ():Promise<void> => {
      try {
        const res:Response = await fetch("/data/books.json"); //fetch the json file from the
        const data: Book[] = await res.json();
        setBooks(data);
      } catch (error) {
        console.log("Error loading books:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading books...</div>; // Loading indicator
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6 mt-32">
        <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">
          Featured Books
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-2xl rounded-lg overflow-hidden p-2"
            >
              <Image
                src={book.coverImage}
                alt={`Cover image of ${book.title}`}
                width={200}
                height={250}
                className="mx-auto p-4"
              />
              <h2 className="text-xl font-semibold text-center">
                {book.title}
              </h2>
              <p className="text-gray-600 text-center">by {book.author}</p>
              <p className=" text-base lg:text-lg text-black mt-2 text-justify px-5 py-3">
                {book.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
