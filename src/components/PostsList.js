/** @format */

import React, { useEffect, useState } from 'react';

function PostsList({ posts, users, defaultMessage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const componentName = 'PostsList.js';

  useEffect(() => {
    console.log(`${defaultMessage} ${componentName}`);
  }, []);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className='container'>
      <div className='searchBar_box'>
        <input
          className='searchBar_box-input'
          type='text'
          placeholder='Search for...'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='grid'>
        {posts
          .filter((filteredPost) => {
            if (searchTerm == '') {
              return filteredPost;
            } else if (
              filteredPost.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return filteredPost;
            }
          })
          .map((post, id) => {
            return (
              <article key={id} className='post__card'>
                {users
                  .filter((filteredUser) => {
                    if (searchTerm == '') {
                      return filteredUser;
                    } else if (
                      filteredUser.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return filteredUser;
                    }
                  })
                  .map((user, id) => {
                    return post.userId === user.id ? (
                      <h1 key={id}>{user.name}</h1>
                    ) : (
                      ''
                    );
                  })}

                <h4 className='post__card-title'>TITLE: {post.title}</h4>
                <p className='post__card-para'>{post.body}</p>
                <a
                  className='post__card-link'
                  href=''
                  onClick={() =>
                    openInNewTab(
                      `https://jsonplaceholder.typicode.com/posts/${post.id}`
                    )
                  }>
                  See Post
                </a>
              </article>
            );
          })}
      </div>
    </div>
  );
}

export default PostsList;
