import React, { Component } from 'react';
import './App.css';

import { Switch, Route, Link } from 'react-router-dom'
import Home from './views/Home.js'; 
import Register from './views/Register.js';
import Login from './views/Login.js';
import Post from './views/Post.js';
import CreatePost from './views/CreatePost.js';
import editPost from './views/editPost.js';
import PostDetail from './views/PostDetail.js';
import HocTest from './views/HocTest.js';
import AuthMiddleware from './AuthMiddle';
import "react-responsive-carousel/lib/styles/carousel.min.css";

let token = localStorage.getItem('token');            

class App extends Component {
  ShowLogin(){
    let loginorlogout = <Link className="btn btn-success" to='/login'>Login</Link>;
    if(token){
    loginorlogout = <a className="btn btn-danger" href="" onClick={this.logout}>Logout</a>;
    }
    return loginorlogout;
  }

  logout(){
    localStorage.removeItem('token');
    this.history.push('/');
  }

  showRegisterOrPost(){
    let registerOrPost = <Link className="btn btn-info" to='/register'>Register</Link>;
    if(token){
      registerOrPost = <Link className="btn btn-info" to='/post'>User Posts</Link>;
    }
    return registerOrPost;
  }

  render() {
    return (
      
      <div>

        <div className="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-dark">
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav mr-auto container">
								<li className="nav-item active">								
                  {/* Link is equal with a href	 */}
									<Link className="btn btn-info" to='/'>Home</Link> 
								</li>
								<li className="nav-item">
									{this.showRegisterOrPost()}
								</li>								
                <li className="nav-item">
                  {this.ShowLogin()}									
								</li>								
							</ul>    
						</div>
					</nav>
        </div>

        {/* child layout is  right here, it only change, master and footer not change */}
        <div className="container">
       
          {/* lets start route in right here */}
         
          <Switch>
            <Route exact path="/" component={Home} />  {/* this route reference to domain/  */}
            <Route path="/register" component={Register} /> {/* this route reference to domain/register  */}
            <Route path="/login" component={Login} />
            <Route path="/post" component={AuthMiddleware(Post)} />
            <Route path="/create-post" component={AuthMiddleware(CreatePost)} />
            <Route path="/editPost/:id" component={AuthMiddleware(editPost)} />            
            <Route path="/post-detail/:id" component={PostDetail} />            
            <Route path="/hoctest" component={HocTest} />
          </Switch>
        </div>

        <div className="container">
          <br/><br/>
          <h6>Copyright © Hossam Sayed 2020.</h6>
        </div>

      </div>

    );
  }
}

export default App;
