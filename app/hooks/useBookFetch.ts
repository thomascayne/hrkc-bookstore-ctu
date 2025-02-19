// hooks/useBookFetch.ts
import { useState, useEffect } from 'react';
import { Book } from "@/app/interfaces/Book";

export function useBookFetch(category: { key: string; label: string }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);

            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
            const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_URL;

            try {
                const response = await fetch(
                    `${apiUrl}?q=subject:${encodeURIComponent(
                        category.label
                    )}&orderBy=relevance&maxResults=12&key=${apiKey}`
                );

                const data = await response.json();
                const fetchedItems = data.items || [];

                const booksWithImages = fetchedItems.filter(
                    (book: Book) =>
                        book.volumeInfo &&
                        book.volumeInfo.imageLinks &&
                        book.volumeInfo.imageLinks.thumbnail
                );

                setBooks(booksWithImages);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [category]);

    return { books, isLoading };
}