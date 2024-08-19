import { gql } from "@apollo/client"
export const CREATE = gql`
mutation Create($email:String!, $password:String!){
    createUser(userInput : {email: $email, password: $password}) {
      _id
      email
    }
}
`

export const CREATE_EVENT_MUTATION = gql`
mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
  createEvent(eventInput: { title: $title, description: $description, price: $price, date: $date }) {
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

export const BOOK_EVENT_MUTATION = gql`
mutation BookEvent($eventId: ID!) {
  bookEvent(eventId: $eventId) {
    _id
    createdAt
    updatedAt
    event {
      _id
      title
      date
    }
    user {
      _id
      email
    }
  }
}
`
export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id
      creator{
      email
      }
    }
  }
`;