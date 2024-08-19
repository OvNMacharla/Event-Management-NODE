import { gql } from '@apollo/client';
export const LOGIN = gql`
query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        userId
        token
    }
}
`;

export const EVENTS_QUERY = gql`
  query Events{
  events {
      _id
      title
      description
      price
      date
      creator {
        _id
        email
      }
    }
}
`;

export const BOOKINGS_QUERY = gql`
  query Bookings {
    bookings {
      _id
      event {
        _id
        title
      }
      user {
        _id
        email
      }
      createdAt
      updatedAt
    }
  }
`;