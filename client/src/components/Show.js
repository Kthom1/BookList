import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { removeBook } from "../redux/actionCreators";
import { connect } from "react-redux";

const Show = props => {
  const DELETE_BOOK = gql`
    mutation removeBook($id: ID!) {
      removeBook(id: $id) {
        _id
      }
    }
  `;

  const { currentBook } = props;

  const removeBookFromState = bookId => {
    props.dispatch(removeBook(bookId));
    props.history.push("/");
  };
  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            <Link to="/">Book List</Link>
          </h4>
          <h3 className="panel-title">{currentBook.title}</h3>
        </div>
        <div className="panel-body">
          <dl>
            <dt>Author:</dt>
            <dd>{currentBook.author}</dd>
            <dt>Description:</dt>
            <dd>{currentBook.description}</dd>
            <dt>Published Year:</dt>
            <dd>{currentBook.published_year}</dd>
          </dl>
          <Mutation
            mutation={DELETE_BOOK}
            key={currentBook._id}
            onCompleted={({ removeBook }) =>
              removeBookFromState(removeBook._id)
            }
          >
            {(removeBook, { loading, error }) => (
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    removeBook({ variables: { id: currentBook._id } });
                  }}
                >
                  <Link
                    to={`/edit/${currentBook._id}`}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button type="submit" className="btn btn-danger">
                    Delete
                  </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            )}
          </Mutation>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ currentBook: state.currentBook });

export default connect(mapStateToProps)(Show);
