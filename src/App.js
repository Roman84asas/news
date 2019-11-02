import React from 'react';
import Post from './components/Post';
import axios from 'axios';
import  { connect } from 'react-redux';


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    fetchPost() {
        const { setPosts } = this.props;
        axios.get('http://5dbdba0705a6f30014bcaf18.mockapi.io/posts')
             .then(({data}) => {
                 setPosts(data);
             })
    }

  render(){
        const { posts } = this.props;
      return (
          <div>
              <div>
                  <button onClick={this.fetchPost.bind(this)}>
                      Get posts
                  </button>

                  <h3>Region</h3>
                  <ul>
                      <li>
                          <button onClick={this.props.changeRegion.bind(this, 'ROM')}>
                              Romania
                          </button>
                      </li>

                      <li>
                          <button onClick={this.props.changeRegion.bind(this, 'UK')}>
                              UK
                          </button>
                      </li>

                      <li>
                          <button onClick={this.props.changeRegion.bind(this, 'GER')}>
                              Germany
                          </button>
                      </li>
                  </ul>
              </div>
              {
                  !posts.items.length ? (
                      <span>Loading...</span>
                  ) : posts.items.map((post, key) => {
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
}

const mapStateToProps = (props) => {
    return{
        ...props,
    };
};

const actions = (dispatch) => ({
    setPosts: data =>
        dispatch({
            type:    'SET_POSTS',
            payload: data
        }),
    changeRegion: name =>
        dispatch({
            type:    'CHANGE_REGIONS',
            payload: name
        })
});

export default connect(mapStateToProps, actions)(App);
