import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { removeBook } from "../redux/actionCreators";
import { connect } from "react-redux";

const Show = props => {
  const bookId = props.match.params.id;
  const GET_BOOK = gql`
    query book($bookId: ID) {
      book(id: $bookId) {
        _id
        title
        author
        description
        published_year
      }
    }
  `;

  const DELETE_BOOK = gql`
    mutation removeBook($id: ID!) {
      removeBook(id: $id) {
        _id
      }
    }
  `;

  const removeBookFromState = bookId => {
    props.dispatch(removeBook(bookId));
    props.history.push("/");
  };
  return (
    <Query query={GET_BOOK} variables={{ bookId: bookId }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>
                  <Link to="/">Book List</Link>
                </h4>
                <h3 className="panel-title">{data.book.title}</h3>
              </div>
              <div className="panel-body">
                <dl>
                  <dt>Author:</dt>
                  <dd>{data.book.author}</dd>
                  <dt>Description:</dt>
                  <dd>{data.book.description}</dd>
                  <dt>Published Year:</dt>
                  <dd>{data.book.published_year}</dd>
                </dl>
                <Mutation
                  mutation={DELETE_BOOK}
                  key={data.book._id}
                  onCompleted={({ removeBook }) =>
                    removeBookFromState(removeBook._id)
                  }
                >
                  {(removeBook, { loading, error }) => (
                    <div>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          removeBook({ variables: { id: data.book._id } });
                        }}
                      >
                        <Link
                          to={`/edit/${data.book._id}`}
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
      }}
    </Query>
  );
};

export default connect()(Show);
