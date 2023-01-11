import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NoImg from "../images/no-img.png";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("https://crudbooks.herokuapp.com/books");
        setBooks(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://crudbooks.herokuapp.com/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover && book.cover.includes(".") ? book.cover : NoImg || NoImg} alt="" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>${book.price}</span>
            <div className="buttons">
              <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
              <button className="update">
                <Link
                  to={`/update/${book.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Update
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </>
  );
};

export default Books;
