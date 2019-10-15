import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBook } from "../redux/actionCreators";
const Create = props => {
  let title, author, description, published_year;
  const ADD_BOOK = gql`
    mutation AddBook(
      $title: String!
      $author: String!
      $description: String!
      $published_year: Int!
    ) {
      addBook(
        title: $title
        author: $author
        description: $description
        published_year: $published_year
      ) {
        _id
        title
        author
        description
        published_year
      }
    }
  `;

  const addBookToState = book => {
    props.dispatch(addBook(book));
    props.history.push("/");
  };

  return (
    <Mutation
      mutation={ADD_BOOK}
      onCompleted={({ addBook }) => addBookToState(addBook)}
    >
      {(addBook, { loading, error }) => (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">ADD BOOK</h3>
            </div>
            <div className="panel-body">
              <h4>
                <Link to="/" className="btn btn-primary">
                  Book List
                </Link>
              </h4>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addBook({
                    variables: {
                      title: title.value,
                      author: author.value,
                      description: description.value,
                      published_year: parseInt(published_year.value)
                    }
                  });
                  title.value = "";
                  author.value = "";
                  description.value = "";
                  published_year.value = "";
                }}
              >
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    ref={node => {
                      title = node;
                    }}
                    placeholder="Title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Author:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    ref={node => {
                      author = node;
                    }}
                    placeholder="Author"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    className="form-control"
                    name="description"
                    ref={node => {
                      description = node;
                    }}
                    placeholder="Description"
                    cols="80"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Published Year:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="published_year"
                    ref={node => {
                      published_year = node;
                    }}
                    placeholder="Published Year"
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
              {loading && <p>Loading...</p>}
              {error && <p>Error :( Please try again</p>}
            </div>
          </div>
        </div>
      )}
    </Mutation>
  );
};

export default connect()(Create);
