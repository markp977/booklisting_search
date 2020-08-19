import React from 'react';
import BookSearch from './BookSearch';
import '../scss/app.scss';

class App extends React.Component {
    render() {
      return (
        <div className="booklisting_container">
          <BookSearch />
        </div>
      );
    }
  }

export default App;
