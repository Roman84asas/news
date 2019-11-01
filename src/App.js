import React from 'react';
import Post from './components/Post';

import posts from './post';



function App () {

  return (
      <div>
          {
              posts.map((post, key) => {
                  return(
                      <Post
                          key={key}
                          title={post.title}
                          description={post.description}
                          image={post.image}
                      />
                  )
              })
          }
      </div>
  );
}

export default App;
