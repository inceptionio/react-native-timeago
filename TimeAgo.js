var React = require('react')
var ReactNative = require('react-native');
var moment = require('moment');
var TimerMixin = require('react-timer-mixin');

var { Text } = ReactNative;

import PropTypes from 'prop-types';

var TimeAgo = React.createClass({
  mixins: [TimerMixin],
  propTypes: {
    time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.instanceOf(Date)
    ]).isRequired,
    interval: PropTypes.number,
    hideAgo: PropTypes.bool
  },

  getDefaultProps() {
    return {
      hideAgo: false,
      interval: 60000
    }
  },

  componentDidMount() {
    var {interval} = this.props;
    this.setInterval(this.update, interval);
  },

  componentWillUnmount() {
    this.clearInterval(this.update);
  },

  // We're using this method because of a weird bug
  // where autobinding doesn't seem to work w/ straight this.forceUpdate
  update() {
    this.forceUpdate();
  },

  render() {
    return (
      <Text {...this.props}>{moment(this.props.time).fromNow(this.props.hideAgo)}</Text>
    );
  }
});

module.exports = TimeAgo;
