import React from "react";
import "./AllBooks.css";

const AllBooks = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {Array.from(Array(10).keys()).map((idx) => (
          <div key={idx} className="col-lg-3 col-md-4 col-6 text-center my-3">
            <div className="card my-card pointer">
              <div className="card-body">
                <h5 className="disppla">Think and Grow Rich</h5>
                <p className="lead">Napoleon Hill</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
