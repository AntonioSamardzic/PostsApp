/** @format */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import '../src/styles/main.css';
import PostsList from './components/PostsList';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const defaultMessage = 'Hello from:';
  const componentName = 'App.js';

  useEffect(() => {
    axios.get(`http://jsonplaceholder.typicode.com/posts`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    console.log(`${defaultMessage} ${componentName}`);
  }, []);

  return (
    <div className='App'>
      <Router>
        <div>
          <nav>
            <ul className='nav-ul'>
              <li className='nav-ul-li'>
                <Link to='/'>Home</Link>
              </li>
              <li className='nav-ul-li'>
                <Link to='/posts'>Posts</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/posts'>
              <PostsList
                posts={posts}
                users={users}
                defaultMessage={defaultMessage}
              />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className='app-info'>
        <h1>Q Software task</h1>
        <h3>
          Navigate to POSTS trough navbar above to see all posts, then you can
          search them by TITLE of each post, click on "SEE POST" link to open
          the chosen post in new tab.
        </h3>
      </div>
    </div>
  );
}

export default App;
