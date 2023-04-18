import './App.css';
import { Form } from './Compiling/Form/Form';
import { useState } from "react";
import { Posts } from './Compiling/Posts/Posts';

function App() {
    const [currentUser , setCurrentUser] = useState("")
    const registerUser = (event) => {
        event.preventDefault()
        fetch("http://127.0.0.1:3000/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ name: event.target.username.value })
        }).then(response => {
            if (response.ok) {
                Login(event)

            }
        })
    }
    const Login = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ name: username })
        }).then(response => {
            if (response.ok) {
                setCurrentUser(username)
            }
        })
        event.target.reset()
    }
    const Logout = () => {
        fetch("http://127.0.0.1:3000/logout", {
            method: "POST",
            credentials: "include",
        }).then(response => {
            if (response.ok) {
                setCurrentUser("")
            }
        })
    }
  return (
      <div className="App">
          {currentUser == ""
              ? <div className= "forms">
          <Form Text="Register" onSubmit={registerUser} />
                  <Form Text="Log in" onSubmit={Login} />
              </div>

              : <div>
                  <button onClick={Logout}>Log out</button> <Posts currentUser={currentUser} />
              </div> 
          }
    </div>
  );
}

export default App;
