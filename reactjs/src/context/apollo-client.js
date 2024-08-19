import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

// Create a link for sending requests to the GraphQL server
const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql' });

// Middleware link to add token to headers
const authLink = new ApolloLink((operation, forward) => {
    // Get the token from AuthContext
    const token = localStorage.getItem('authToken');

    // Use the token in the headers of each request
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    });

    return forward(operation);
});

// Combine the links
const link = authLink.concat(httpLink);

// Create Apollo Client instance
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

export default client;
