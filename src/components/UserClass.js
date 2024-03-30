import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userInfo: {
                name: "dummy",
                location: "default",
            },
        };
        //console.log(this.props.name+"child constructor");
    }
    
    async componentDidMount() {
        //console.log(this.props.name+"child component did mount");
        // api call

        const data = await fetch("https://api.github.com/users/akshaymarch7");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });

        console.log(json);
    }

    render() {

        //console.log(this.props.name+"child render");
        
        const { name, location, avatar_url } = this.state.userInfo;
        return (
                <div className="user-card">
                    <img src={avatar_url} />
                    <h2>Name: {name}</h2>
                    <h2>Loc: {location}</h2>
                    <h3>@abc</h3>
                </div>
        );
    }
}

export default UserClass;