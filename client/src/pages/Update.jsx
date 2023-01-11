import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const defaultValues = {
  title: "",
  desc: "",
  price: null,
  cover: "",
};

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [values, setValues] = useState(defaultValues);
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
      const fetchOneBook = async () => {
        try {
          const res = await axios.get(`http://localhost:8800/books/${bookId}`);
          setValues({
            title: res.data[0].title || "",
            desc: res.data[0].desc || "",
            price: res.data[0].price || null,
            cover: res.data[0].cover || "",
          });
          setBook({
            title: res.data[0].title || "",
            desc: res.data[0].desc || "",
            price: res.data[0].price || null,
            cover: res.data[0].cover || "",
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetchOneBook();
  }, []);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      console.log(book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        value={values.title}
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        value={values.desc}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        value={values.price}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        value={values.cover}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
