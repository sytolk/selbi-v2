import React from 'react';
import { connect } from 'react-redux';
import { InteractionManager, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import RoutableScene from '../../nav/RoutableScene';
import ListingsListComponent from '../../components/ListingsListComponent';

import styles from '../../../styles';
import colors from '../../../colors';

class MyListingsScene extends RoutableScene {
  constructor(props) {
    super(props);

    this.state = { renderPlaceholderOnly: true };
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: false,
      });
    });
  }

  renderWithNavBar() {
    if (this.state.renderPlaceholderOnly) {
      return (
        <View style={styles.container} />
      );
    }

    return (
      <ScrollableTabView
        tabBarBackgroundColor={colors.primary}
        tabBarUnderlineColor={colors.secondary}
        tabBarActiveTextColor={colors.secondary}
        style={styles.fullScreenContainer}
      >
        <View tabLabel="Public" style={styles.fullScreenContainer}>
          <ListingsListComponent
            listings={this.props.public}
            emptyMessage="You have no public listings."
            openDetailScene={() => this.goNext('details')}
          />
        </View>
        <View tabLabel="Private" style={styles.fullScreenContainer}>
          <ListingsListComponent
            listings={this.props.private}
            emptyMessage="You have no private listings."
            openDetailScene={() => this.goNext('details')}
          />
        </View>
        <View tabLabel="Sold" style={styles.fullScreenContainer}>
          <ListingsListComponent
            listings={this.props.sold}
            emptyMessage="You have not sold any listings."
            openDetailScene={() => this.goNext('details')}
          />
        </View>
      </ScrollableTabView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    public: state.myListings.public,
    private: state.myListings.private,
    sold: state.myListings.sold,
  };
};

export default connect(
  mapStateToProps,
  undefined
)(MyListingsScene);
