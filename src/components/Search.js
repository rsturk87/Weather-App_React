import React from 'react';
import Card from './Card';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            city: 'são paulo', 
            searchText: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(
            {city: this.state.searchText}
        )
    }

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }
    
    render(){
        return(
            <>
            <Card city={this.state.city} />
            <form onSubmit={this.handleSubmit}>
                <input id="search-box" type="text" value={this.state.searchText} onChange={this.handleChange} />
            </form>
            </>
        );
    }
}

export default Search;