import UserContext from "../utils/UserContext";
import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {

  constructor(props) {
    super(props);

    //console.log("Parent Constructor");
  }

  componentDidMount() {
    //console.log("Parent component did mount");
  }

  render() {
    //console.log("Parent Render");
    return (
      <div>
          <h1>About class component</h1>
          <div>
            loggedInUser
            <UserContext.Consumer>
              {({loggedInUser}) => (
                <h1 className="text-xl font-bold">{loggedInUser}</h1>
              )}
            </UserContext.Consumer>
          </div>
          <h2>This is part of learning react series</h2>
        
          <UserClass name={"First (class)"} location={"sre class"}/>
          
      </div>
    );
  }
}

export default About;