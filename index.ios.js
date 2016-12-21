/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  NativeModules,
  ScrollView,
  StyleSheet,
  View,
  requireNativeComponent,
} from 'react-native';

const {
  ScaleToFill,
  ScaleAspectFit,
  ScaleAspectFill
} = NativeModules.RNFLAnimatedImageManager;

const MODES = {
  'stretch': ScaleToFill,
  'contain': ScaleAspectFit,
  'cover': ScaleAspectFill
}

class Gif extends Component {
  render() {
    const contentMode = MODES[this.props.resizeMode] || MODES.stretch;
    return (
      <RNFLAnimatedImage 
        contentMode={contentMode}
        {...this.props}
      />
    );
  }
};

Gif.propTypes = {
  contentMode: PropTypes.number,
  src: PropTypes.string,
  resizeMode: PropTypes.string,
  onFrameChange: PropTypes.func,
};

const RNFLAnimatedImage = requireNativeComponent('RNFLAnimatedImage', Gif);


export default class RNGifExample extends Component {
  constructor(props) {
    super(props);

    // Create a ListView.DataSource for the <ListView />
    // https://facebook.github.io/react-native/docs/listviewdatasource.html
    const imageDs = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });

    // Holds the list view for analytics
    this._listView = null;

    // Set state
    this.state = {
      apiKey: 'dc6zaTOxFJmzC',
      dataSource: imageDs.cloneWithRows([]),
      images: [],
      limit: 20,
      totalCount: 0,
      offset: 0,
      term: 'adventure+time',
    };
  }

  componentWillMount() {
    this.fetchFromApi();
  }

  componentWillUpdate() {
    if (this._listView) {
      console.log(this._listView.getMetrics());
    }
  }

  fetchFromApi() {
    const { apiKey, limit, offset, term, totalCount } = this.state;
    console.log('Fetching from API', limit, offset, totalCount);

    if (totalCount === 0 || offset < totalCount) {
      const baseUrl = 'https://api.giphy.com/v1/gifs/search'
      const url = `${baseUrl}?q=${term}&api_key=${apiKey}&offset=${offset}&limit=${limit}`

      // Fetch images from Giphy
      fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then((response) => {
          const { pagination } = response;
          // Concat the new results with the existing data
          const images = this.state.images.concat(response.data);
          // Set the new images, update the offsets
          this.setState({
            images,
            dataSource: this.state.dataSource.cloneWithRows(images),
            totalCount: pagination.total_count,
            offset: pagination.offset + pagination.count,
          });
        })
        .catch((error) => {
          // properly handle error
          console.error(error);
        })
    } else {
      // End of results reached don't do anything else
      console.log('End of results');
    }
  }

  _renderImage(row) {
    const image = row.images.fixed_width;
    console.log(image.url)
    return (
      <View 
        key={`giphy-${row.id}`}
      >
        <Gif
          src={image.url}
          resizeMode='contain'
          style={{
            margin: 5,
            height: ~~image.height,
            width: ~~image.width,
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView 
          ref={ref => this._listView = ref}
          contentContainerStyle={styles.list}
          initialListSize={this.state.limit}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderImage}
          onEndReached={() => this.fetchFromApi()}
          pageSize={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flex: 1,
  },
  list: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});

AppRegistry.registerComponent('RNGifExample', () => RNGifExample);
