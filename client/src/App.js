import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { setBooks, setCurrentBook } from "./redux/actionCreators";
const App = props => {
  let [bookList, setBookList] = useState(props.books);
  const GET_BOOKS = gql`
    {
      books {
        _id
        title
        author
      }
    }
  `;
  const loadBooks = books => {
    props.dispatch(setBooks(books));
    setBookList(books);
  };
  const addCurrentBookToState = book => {
    props.dispatch(setCurrentBook(book));
    props.history.push("/show");
  };
  if (bookList.length > 0) {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">LIST OF BOOKS</h3>
            <h4>
              <Link to="/create">Add Book</Link>
            </h4>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {bookList.map((book, index) => (
                  <tr key={index}>
                    <td>
                      <span
                        className="link-span"
                        onClick={() => {
                          addCurrentBookToState(book);
                        }}
                      >
                        {book.title}
                      </span>
                    </td>
                    <td>{book.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Query
        query={GET_BOOKS}
        onCompleted={({ books }) => {
          loadBooks(books);
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">LIST OF BOOKS</h3>
                  <h4>
                    <Link to="/create">Add Book</Link>
                  </h4>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.books.map((book, index) => (
                        <tr key={index}>
                          <td>
                            <Link to={`/show/${book._id}`}>{book.title}</Link>
                          </td>
                          <td>{book.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
};

const mapStateToProps = state => ({ books: state.books });

export default connect(mapStateToProps)(App);
