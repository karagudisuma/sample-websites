const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/tododb");

const Todo = mongoose.model("Todo", {
    text: String,
    complete: Boolean
});

const typeDefs = `
    type Query {
        hello (name: String): String!
        todos: [Todo]
    }
    type Todo {
        id: ID!
        text: String!
        complete: Boolean!
    }
    type Mutation {
        createTodo(text: String!): Todo,
        updateTodo(id: ID!, complete: Boolean!): Boolean,
        removeTodo(id: ID!): Boolean
    }
`;

const resolvers = {
    Query: {
        hello: (_, {name}) => `Hello ${(name || "World")}`,
        todos: () => Todo.find()
    },
    Mutation: {
        createTodo: async (_, {text }) => {
            const todo = new Todo({ text, complete: false});
            await todo.save();
            return todo;
        },
        updateTodo: async (_, { id, complete }) => {
            await Todo.findByIdAndUpdate(id, {complete});
            return true;
        },
        removeTodo: async (_, { id }) => {
            await Todo.findByIdAndDelete(id);
            return true;
        }
    }
};

const server = new GraphQLServer({ typeDefs, resolvers });

mongoose.connection.once("open", () => {
    server.start(() => console.log('server running at 4000'));
})
