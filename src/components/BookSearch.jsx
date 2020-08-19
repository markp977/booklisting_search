import React from 'react';
import BookDetail from './BookDetail'
import '../scss/bookSearch.scss'

class BookSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            term:'',
            results: {},
            booksPerPage: 6, 
            currentPage: 0,
            loading: false
        }
    };

    setPageNum = (page) => {
        this.setState({currentPage: page});
    }

    renderPagination  = () => {
        const pagination = [];
        const perPage = this.state.booksPerPage
        const totalResults = this.state.results.length ? this.state.results.length : 0 ;
        const numberOfPages = totalResults / perPage;
        const currentPage = this.state.currentPage
        for (let i = 0; i < numberOfPages; ++i) {
            pagination.push(
                <div key={i} className={'pagination_page-num ' + (i === currentPage ? 'selected' : '')} onClick={() => this.setPageNum(i)}>
                    {i + 1}
                </div>
            )
        }
        return pagination;
    };

    handleOnChange = event => {
        this.setState({ term: event.target.value });
    };
   
    handleAPIcall = (searchTerm) => {
        const searchURL = `https://goodreads-server-express--dotdash.repl.co/search/${searchTerm}`;
        this.setState({ loading: true });
        fetch(searchURL) 
        .then(response => response.json())
        .then(json =>{
            this.setState({
                results: json.list
                
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
   
    handleSearch = e => {
        e.preventDefault();
        this.handleAPIcall(this.state.term);
    }

    renderBooks = () => {
        const books = this.state.results;
        const arrBooks = [];
        const totalBooks = this.state.booksPerPage;
        const currentPage = this.state.currentPage;
        const startFrom = currentPage * 6
        if(books.length > 0){
            for (let i = 0; i < totalBooks; ++i) {
                if(books[startFrom + i]){
                    const title = books[startFrom + i].title;
                    const author = books[startFrom + i].authorName;
                    const image = books[startFrom + i].imageUrl;
                    arrBooks.push(<BookDetail key={i} title={title} author={author} image={image} />)
                }
            }
            return arrBooks;
        }
    }


    render() {
        return (
            <div className="search-page_container">
                <div className="search_container">
                    <h1>SEARCH FOR BOOK by title or author name</h1>
                    <form className="search_form" onSubmit={this.handleSearch}>    
                        <input name='term' type='text' placeholder='Search' onChange={event => this.handleOnChange(event)} />
                        <button className="search_button" type="submit" id="submit">Search</button>
                    </form>
                </div>
                <div className="pagination_container">{this.renderPagination()}</div>
                <div className="display-books_container">{this.renderBooks()}</div>
                { this.state.loading && 
                    <div className="loadingImg">
                        <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="loading" />
                    </div>
                }
                <div className="pagination_container">{this.renderPagination()}</div>
            </div>
        );
    }
}

export default BookSearch;