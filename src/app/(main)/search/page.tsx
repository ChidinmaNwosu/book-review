"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";

type Book = {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
};

const Search: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // To add search functionality use state to store search query
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 3;

  useEffect(() => {
    const fetchBooks = async ():Promise<void> => {
      try {
        const res = await fetch("/data/books.json");
        const data: Book[] = await res.json();
        setBooks(data);
      } catch (error) {
        console.log("Error loading books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on search query(Title or Author)
  const filteredBooks: Book[] = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination functionality...
  const indexOfLastBook:number = currentPage * booksPerPage;
  const indexOfFirstBook:number = indexOfLastBook - booksPerPage;
  const currentBooks: Book[] = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages:number = Math.ceil(filteredBooks.length / booksPerPage);

  const handleNextPage = ():void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = ():void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">
          Search Books
        </h1>
        <p className="text-base text-center lg:text-left md:text-xl mb-5">
          Here, you can search for books based on title or author.
        </p>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset current page to 1 when search query changes
          }}
          placeholder="Search by title or author"
          className="mb-6 p-4 border-2 border-gray-500 rounded w-full lg:w-1/2 outline-none"
        />{" "}
        {/* Add input field to search books by title or author */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-2xl rounded-lg overflow-hidden p-2"
            >
              <Image
                src={book.coverImage}
                alt={book.title}
                width={200}
                height={250}
                className="mx-auto p-4"
                priority
              />
              <h2 className="text-xl font-semibold text-center">
                <Link href={`/book-detail/${book.id}`}>{book.title}</Link>
              </h2>
              <p className="text-gray-600 text-center">by {book.author}</p>
              <p className="text-base lg:text-lg text-black mt-2 text-justify px-5 py-3">
                {book.description}
              </p>
            </div>
          ))}
        </div>
        {/* Add pagination buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
