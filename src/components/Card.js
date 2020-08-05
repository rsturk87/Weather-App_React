import React from 'react';
import './Card.css';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.API_key = '1c326f4182035441c375514b4d8b8c82';
        this.state = {
            city: this.props.city,
            temp: undefined,
            min: undefined,
            max: undefined,
            desc: undefined,
            icon: undefined
        };
    }

    fetchData = () => {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&lang=pt_br&units=metric&appid=${this.API_key}`
        )
        .then(res => res.json())
        .then(
            data => {
                this.setState(
                    {
                        temp: data.main.temp,
                        min: data.main.temp_min,
                        max: data.main.temp_max,
                        desc: data.weather[0].description,
                        icon: data.weather[0].icon
                    }
                );
            }
        )
    }

    componentDidMount(){
        this.fetchData();
    }

    componentDidUpdate(){
        if (this.props.city !== this.state.city) {
            this.fetchData();
        }
    }
    
    render(){
        const renderCard = () => {
            var temp = this.state.temp;
            var min = this.state.min;
            var max = this.state.max;
            
            return(
                <>
                    <div className="cardWrapper">
                        <div className="col1">
                            <span className="temp">{Math.round(temp)}<sup className="celsius">°C</sup></span>
                            <span className="city">{this.props.city}</span>
                        </div>

                        <div className="col2">
                            <div className="row1">
                                <span>Min: {Math.round(min)}<sup className="celsius">°C</sup></span>
                                <span>Max: {Math.round(max)}<sup className="celsius">°C</sup></span>
                            </div>
                            <div className="row2">
                                <span className="card-description">{this.state.desc}</span>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        const renderLoading = () => {
            return (
                <img src="loading.gif" alt="carregando"></img>
            );
        }

        return this.state.icon ? renderCard() : renderLoading();
    }
}

export default Card;