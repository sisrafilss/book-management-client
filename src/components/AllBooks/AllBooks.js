import React, { useEffect, useState } from "react";
import "./AllBooks.css";
import axios from "axios";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import WarningMessage from "../WarningMessage/WarningMessage";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [bookStore, setBookStore] = useState([]);

  const navigate = useNavigate();
  const { user, loading, setLoading } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios.get("https://book-management-server-k51n.onrender.com/all-books").then((res) => {
      setAllBooks(res?.data);
      setBookStore(res?.data);
      setLoading(false);
    });
  }, []);

  // handle delete book
  const handleDelete = (id) => {
    if (!user?.email) {
      console.log("clicked on!!");
      navigate("/login");
      return;
    }

    if (user?.role !== "admin") {
      window.alert(
        "You are a subscriber. Only admin can perform this operation."
      );
      return;
    }

    const proceed = window.confirm("Are you sure, Want to Delete?");
    if (proceed) {
      // send delete request...
      axios
        .delete(`https://book-management-server-k51n.onrender.com/delete-book/${id}`)
        .then((res) => {
          setSuccess(true);
          const restBooks = bookStore.filter((book) => book._id !== id);
          setBookStore(restBooks);
          setAllBooks(restBooks);
        })
        .catch((err) => setWarning(true));
    }
  };

  // handle search
  const handleSearch = (e) => {
    setSearchValue(e.target.value);

    console.log(searchValue);
    const matched = bookStore.filter(
      (book) =>
        book.bookTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author.toLowerCase().includes(searchValue.toLowerCase())
    );
    setAllBooks(matched);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mt-5">
          <div className="row">
            {bookStore.length <= 0 ? (
              <div>
                <h2 className="text-center display-4">No Book Found!</h2>
              </div>
            ) : (
              <div className="col-lg-10 col-md-12 text-center my-3 mx-auto">
                <input
                  className="form-control mb-4 border border-dark"
                  type="search"
                  placeholder="Search by book title or author"
                  aria-label="Search"
                  onChange={handleSearch}
                />

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
              <div className="col-md-4 col-sm-12 mx-auto">
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
              <div className="col-md-4 col-sm-12 mx-auto">
                <WarningMessage
                  setWarning={setWarning}
                  message="Somethin Went Wrong! Please try again."
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllBooks;
