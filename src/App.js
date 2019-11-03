import React from 'react';
import Post from './components/Post';
import axios from 'axios';
import  { connect } from 'react-redux';
import { Container, Segment, Header, Item, Dimmer, Loader} from 'semantic-ui-react';


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

    componentDidMount() {
        this.fetchPost();
    }

    regionText(reg){
        switch (reg) {
            case 'UK':
                return 'United Kingdom';
            case 'ROM':
                return 'Romania';
            case 'GER':
                return 'Germany';
        }
    }
  render(){
        const { posts } = this.props;
      return (
          <Container>
              <Header as='h2'>Region: { this.regionText(this.props.region.region) }</Header>
              <div>
                  <div className="ui buttons">
                      <button className="ui blue basic button" onClick={this.props.changeRegion.bind(this, 'UK')}>UK</button>
                      <button className="ui blue basic button" onClick={this.props.changeRegion.bind(this, 'ROM')}>Romania</button>
                      <button className="ui blue basic button" onClick={this.props.changeRegion.bind(this, 'GER')}>Germany</button>
                  </div>

              </div>
              <Item.Group divided>
                  {
                      !posts.items.length ? (
                          <Segment>
                              <Dimmer active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                          </Segment>
                      ) : posts.items.map((post, key) => {
                          return(
                              <Post
                                  key={key}
                                  {...post}
                              />
                          )
                      })
                  }
              </Item.Group>

          </Container>
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
