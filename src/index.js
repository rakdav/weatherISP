import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.css"
import {Nav,NavItem} from "react-bootstrap";

const PLACES=[
    {name:"Moscow"},
    {name:"Paris"},
    {name:"London"},
    {name:"Portu"},
];
class WeatherDisplay extends React.Component
{

    constructor() {
        super();
        this.state={
            wheatherData:null
        }
    }
    componentDidMount()
    {
        const  name=this.props.name;
        const URL="http://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=443c1c3e63cf5d70eee6cd4cb67513e9";
        fetch(URL).then(res=>res.json()).then(json=>{this.setState({wheatherData:json});
        });
    }

    render()
    {
        const wheatherData=this.state.wheatherData;
         if(!wheatherData) return <div>Loading</div>;
        // return  <div>{JSON.stringify(wheatherData)}</div>
        const wheather=wheatherData.weather[0];
        const iconUrl="http://openweathermap.org/img/w/"+wheather.icon+".png";
        return(
            <div>
                <h1>
                    {wheather.main} in {wheatherData.name}
                    <img src={iconUrl} alt={wheatherData.description}/>
                </h1>
                <p>Температура сейчас:{wheatherData.main.temp}</p>
                <p>Температура максимальная:{wheatherData.main.temp_max}</p>
                <p>Температура минимальная:{wheatherData.main.temp_min}</p>
                <p>Ветер:{wheatherData.wind.speed}</p>
            </div>
        );
    }
}

class App extends React.Component{

    constructor() {
        super();
        this.state={
            activePlace:0,
        };
    }

    render()
    {
        const activePlace=this.state.activePlace;
        return(
            <div>
                <h3>Выберите город</h3>
                <Nav activeKey={activePlace} onSelect={index=>{this.setState({activePlace:index});}}>
                    {PLACES.map((place,index)=>(
                        <Nav.Item>
                            <Nav.Link eventKey={index}>{place.name}</Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
                <div>
                    <WeatherDisplay key={activePlace} name={PLACES[activePlace].name}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


