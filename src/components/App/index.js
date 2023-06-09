import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Form, Button, Image, Card, Divider, Placeholder, Message, Icon } from 'semantic-ui-react';



const App = () => (
            // create airbnb like search bar
            <Container>
                <Header as='h1' textAlign='center'>Search for a book</Header>
                <SearchBar />
            </Container>
        );

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState([]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(false);
            setBooks([]);

            const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            setBooks(result.data.items);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} error={error}>
            <Form.Input
                placeholder='Search for a book'
                value={query}
                onChange={e => setQuery(e.target.value)}
                action={{
                    color: 'blue',
                    content: 'Search',
                    icon: 'search',
                    loading,
                    disabled: loading,
                }}
            />
            <Message error header='Error' content='Something went wrong' />
            <Card.Group itemsPerRow={5}>
                {books.map(book => <Book key={book.id} book={book} />)}
            </Card.Group>
        </Form>
    );
};

const Book = ({ book }) => {
    const { volumeInfo } = book;
    const { title, authors, imageLinks, infoLink } = volumeInfo;

    return (
        <Card>
            <Image src={imageLinks?.thumbnail || 'https://react.semantic-ui.com/images/wireframe/image.png'} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{authors?.[0]}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <a href={infoLink}>
                    <Icon name='info' />
                    More info
                </a>
            </Card.Content>
        </Card>
    );
};



export default App;