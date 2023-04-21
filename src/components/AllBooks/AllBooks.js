import React, { useEffect, useState } from "react";
import "./AllBooks.css";
import axios from "axios";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/all-books").then((res) => {
      setAllBooks(res?.data);
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {allBooks.length <= 0 ? (
          <div>
            <h2 className="text-center display-4">No Book Found!</h2>
          </div>
        ) : (
          allBooks.map((book) => (
            <div
              key={book._id}
              className="col-lg-3 col-md-4 col-6 text-center my-3"
            >
              <div className="card my-card pointer">
                <div className="card-body">
                  <h5 className="disppla">{book?.bookTitle}</h5>
                  <p className="lead">{book?.author}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllBooks;
