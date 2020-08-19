import React from 'react';
import PropTypes from 'prop-types';
import '../scss/bookDetail.scss';

class BookDetail extends React.Component {
    render() {
        return (
            <div className="book-detail_container">
                <div className="book-detail_image">
                    <img src={this.props.image} alt={this.props.title} />
                </div>
                <div className="book-detail_content">
                    <p className="book-detail_content--title">{this.props.title}</p>
                    <p className="book-detail_content--author">By {this.props.author}</p>
                </div>
            </div>
        );
    }
}

BookDetail.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image:  PropTypes.string.isRequired
}
export default BookDetail;