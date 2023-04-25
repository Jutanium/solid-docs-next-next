import { createResource, createSignal, For, Setter, Show } from "solid-js";

interface Book {
  title: string;
  author: string;
}

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

interface BookshelfProps {
  name: string;
}

export function FinishedBookshelf(props: BookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!showForm());

  return (
    <div>
      <div>
        <h2>{props.name}'s Bookshelf</h2>
        <BookList books={books()} />
      </div>
      <div>
        <Show
          when={showForm()}
          fallback={<button onClick={toggleForm}>Add a book</button>}
        >
          <AddBook setBooks={setBooks} />
          <input type="button" onClick={toggleForm}>
            Finished adding books
          </input>
        </Show>
      </div>
    </div>
  );
}

interface BookListProps {
  books: Book[];
}

export function BookList(props: BookListProps) {
  return (
    <>
      <p>My books: {props.books.length}</p>
      <ul>
        <For each={props.books}>
          {(book) => {
            return (
              <li>
                {book.title} <span>({book.author})</span>
              </li>
            );
          }}
        </For>
      </ul>
    </>
  );
}

interface ResultItem {
  title: string;
  author_name: string[];
}

interface Response {
  docs: ResultItem[];
}

interface AddBookProps {
  setBooks: Setter<Book[]>;
}

async function searchBooks(query: string) {
  if (query.trim() === "") return [];
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURI(query)}`
  );

  const results = (await response.json()) as Response;
  const documents = results.docs;
  return documents.slice(0, 10).map(({ title, author_name }) => ({
    title,
    author: author_name?.join(", "),
  }));
}

export function AddBook(props: AddBookProps) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");
  const [data] = createResource<Book[], string>(query, searchBooks);
  return (
    <>
      <form>
        <div>
          <label for="title">Search books</label>
          <input
            id="title"
            value={input()}
            onInput={(e) => {
              setInput(e.currentTarget.value);
            }}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setQuery(input());
          }}
        >
          Search
        </button>
      </form>
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul>
          <For each={data()}>
            {(book) => (
              <li>
                {book.title} by {book.author}{" "}
                <button
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  onClick={(e) => {
                    e.preventDefault();
                    props.setBooks((books) => [...books, book]);
                  }}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
