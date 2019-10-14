var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var BookModel = require("../models/book");

var bookType = new GraphQLObjectType({
  name: "book",
  fields: function() {
    return {
      _id: {
        type: GraphQLID
      },
      title: {
        type: GraphQLString
      },
      author: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      published_year: {
        type: GraphQLInt
      }
    };
  }
});

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function() {
    return {
      books: {
        type: new GraphQLList(bookType),
        resolve: function() {
          const books = BookModel.find().exec();
          if (!books) {
            throw new Error("Error");
          }
          return books;
        }
      },
      book: {
        type: bookType,
        args: {
          id: {
            name: "_id",
            type: GraphQLID
          }
        },
        resolve: function(root, params) {
          const bookDetails = BookModel.findById(params.id).exec();
          if (!bookDetails) {
            throw new Error("Error");
          }
          return bookDetails;
        }
      }
    };
  }
});

var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function() {
    return {
      addBook: {
        type: bookType,
        args: {
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          author: {
            type: new GraphQLNonNull(GraphQLString)
          },
          description: {
            type: new GraphQLNonNull(GraphQLString)
          },
          published_year: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: function(root, params) {
          const bookModel = new BookModel(params);
          const newBook = bookModel.save();
          if (!newBook) {
            throw new Error("Error");
          }
          return newBook;
        }
      },
      updateBook: {
        type: bookType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          },
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          author: {
            type: new GraphQLNonNull(GraphQLString)
          },
          description: {
            type: new GraphQLNonNull(GraphQLString)
          },
          published_year: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
          return BookModel.findByIdAndUpdate(
            params.id,
            {
              title: params.title,
              author: params.author,
              description: params.description,
              published_year: params.published_year
            },
            function(err) {
              if (err) return next(err);
            }
          );
        }
      },
      removeBook: {
        type: bookType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(root, params) {
          const remBook = BookModel.findByIdAndRemove(params.id).exec();
          if (!remBook) {
            throw new Error("Error");
          }
          return remBook;
        }
      }
    };
  }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
