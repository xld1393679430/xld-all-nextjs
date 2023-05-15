import Link from 'next/link';

const printedBooks = [
  { name: 'Ethical  Design', id: 'ethical-design' },
  { name: 'Design_Systems', id: 'design-systems' },
];

export default function PrintedBooks() {
  return printedBooks.map((printedBook) => (
    <Link
      href={{
        pathname: `/printed-books/[book-id]`,
        query: { 'book-id': `${printedBook.id}` },
      }}
    >
      {printedBook.name}
    </Link>
  ));
}