import React, { useEffect, useState } from "react";
import "./AllBooks.css";
import axios from "axios";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import WarningMessage from "../WarningMessage/WarningMessage";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/all-books").then((res) => {
      setAllBooks(res?.data);
    });
  }, []);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure, Want to Delete?");
    if (proceed) {
      // send delete request...
      axios
        .delete(`http://localhost:5000/delete-book/${id}`)
        .then((res) => {
          setSuccess(true);
          const restBooks = allBooks.filter((book) => book._id !== id);
          setAllBooks(restBooks);
        })
        .catch((err) => setWarning(true));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {allBooks.length <= 0 ? (
          <div>
            <h2 className="text-center display-4">No Book Found!</h2>
          </div>
        ) : (
          <div className="col-lg-10 col-md-12 text-center my-3 mx-auto">
            <table className="table table-hover">
              <thead className="bg-dark text-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allBooks.map((book, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{book?.bookTitle}</td>
                    <td>{book?.author}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(book?._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Success */}
      {success && (
        <div className="row">
          <div className="col-md-4 col-sm-12 mx-auto mt-2">
            <SuccessMessage
              setSuccess={setSuccess}
              message="Deleted Successfully!"
            />
          </div>
        </div>
      )}

      {/* Warning */}
      {warning && (
        <div className="row">
          <div className="col-md-4 col-sm-12 mx-auto mt-2">
            <WarningMessage
              setWarning={setWarning}
              message="Somethin Went Wrong! Please try again."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
