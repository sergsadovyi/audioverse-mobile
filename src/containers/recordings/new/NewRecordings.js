import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'

class NewRecordings extends PureComponent {

  componentDidMount() {
    this.props.actions.loadNewRecordings()
  }

  handleEndReached = () => {
    this.props.actions.loadNewRecordings(true, false)
  }

  handleRefresh = () => {
    this.props.actions.loadNewRecordings(false, true)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: item.artwork}}
        title={item.title}
        subtitle={item.artist + ' \u00B7 ' + item.duration}
        onPress={() => this.props.actions.resetAndPlayTrack([item])}
      />
    )
  }

  render() {
    const { items, pagination } = this.props

    return (
      <List renderItem={this.renderItem} items={items} {...pagination} onEndReached={this.handleEndReached} onRefresh={this.handleRefresh} />
    )
  }

}

NewRecordings.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadNewRecordings: PropTypes.func.isRequired,
    resetAndPlayTrack: PropTypes.func.isRequired
  })
}

export default NewRecordings
