import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar.js'
import YTSearch from 'youtube-api-search'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import _ from 'lodash';

const API_KEY = 'AIzaSyDBjeHOtWV2BrzB14p32UQIFZ9IJy2Dens'
// Create a new component. This component should produce some HTML

YTSearch({key:API_KEY, term: 'surfboards'}, function(data) {
    console.log(data);
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        }
        this.videoSearch('surfboards')
    }

    videoSearch(term) {
        YTSearch({key:API_KEY, term: term}, (videos) => {
        this.setState({
            videos: videos,
            selectedVideo: videos[0]
        }, () => {
            //console.log(this.state.videos)
        })
        });
    }

    

    
    render () {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},300)

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/> 
                <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos= {this.state.videos} /> 
            </div>
        )
    }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />,document.querySelector('.container'));