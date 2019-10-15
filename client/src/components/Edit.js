import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { updateBook } from "../redux/actionCreators";
const Edit = props => {
  const UPDATE_BOOK = gql`
    mutation updateBook(
      $id: ID!
      $title: String!
      $author: String!
      $description: String!
      $published_year: Int!
    ) {
      updateBook(
        id: $id
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
  const { currentBook } = props;
  let { title, author, description, published_year } = currentBook;
  const addUpdatedBookToStore = book => {
    props.dispatch(updateBook(book));
    props.history.push("/");
  };

  return (
    <Mutation
      mutation={UPDATE_BOOK}
      key={currentBook._id}
      onCompleted={({ updateBook }) => addUpdatedBookToStore(updateBook)}
    >
      {(updateBook, { loading, error }) => (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">EDIT BOOK</h3>
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
                  updateBook({
                    variables: {
                      id: currentBook._id,
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
                    defaultValue={currentBook.title}
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
                    defaultValue={currentBook.author}
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
                    defaultValue={currentBook.description}
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
                    defaultValue={currentBook.published_year}
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

const mapStateToProps = state => ({ currentBook: state.currentBook });

export default connect(mapStateToProps)(Edit);
