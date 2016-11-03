import React, { Component } from 'react';
import { View, ListView, Text, InteractionManager, RefreshControl } from 'react-native';
import { MKButton, MKSpinner } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

import ItemView from './ItemView';
import styles from '../../styles';
import colors from '../../colors';

// noinspection Eslint - Dimensions provided by react-native env.
import Dimensions from 'Dimensions';

export default class ListingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPlaceholderOnly: true,
      refreshing: false,
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderPlaceholderOnly: false });
    });
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.props.refresh()
      .then(() => {
        this.setState({ refreshing: false });
      });
  }

  render() {
    if (this.state.renderPlaceholderOnly) {
      return (
        <View style={styles.container} />
      );
    }

    const RefreshButton = MKButton.plainFab()
      .withStyle({
        borderRadius: 20,
        margin: 20,
      })
      .withOnPress(() => {
        this.props.refresh();
      })
      .build();

    if (this.props.listings.uninitialized) {
      return (
        <View style={styles.paddedCenterContainerClear}>
          <Text style={styles.friendlyText}>Searching for listings...</Text>
          <MKSpinner strokeColor={colors.primary} />
        </View>
      );
    }

    if (!this.props.listings || Object.keys(this.props.listings).length === 0) {
      const getRefreshButton = () => {
        if (this.props.refresh) {
          return (
            <RefreshButton>
              <Text><Icon name="refresh" size={16} /></Text>
            </RefreshButton>
          );
        }
        return undefined;
      };

      if (this.props.emptyView) {
        return (
          <View>
            {this.props.header}
            <View  style={styles.paddedCenterContainer}>
              <this.props.emptyView />
              {getRefreshButton()}
            </View>
          </View>
        );
      }

      return (
        <View>
          {this.props.header}
          <View style={styles.paddedCenterContainer}>
            <Text style={styles.friendlyText}>{this.props.emptyMessage}</Text>
            {getRefreshButton()}
          </View>
        </View>
      );
    }

    const { width } = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          removeClippedSubviews={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
            .cloneWithRows(this.props.listings)}
          renderRow={(data) =>
            <ItemView
              listing={data}
              openDetailScene={this.props.openDetailScene}
            />}
          renderHeader={() =>
            <View style={{ width }}>
              {this.props.header}
            </View>
          }
        />
      </View>
    );
  }
}

ListingsComponent.propTypes = {
  refresh: React.PropTypes.func,
  emptyView: React.PropTypes.func,
  emptyMessage: React.PropTypes.string,
  listings: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  openDetailScene: React.PropTypes.func,
  header: React.PropTypes.element,
};
