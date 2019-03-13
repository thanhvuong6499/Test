import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { coQuanBanHanhEntityEditScreen } from '../../../navigation/layouts'

import CoQuanBanHanhActions from './co-quan-ban-hanh.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './co-quan-ban-hanh-entity-detail-screen-style'

class CoQuanBanHanhEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      coQuanBanHanh: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCoQuanBanHanh(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.coQuanBanHanh) {
      this.setState({ coQuanBanHanh: newProps.coQuanBanHanh })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCoQuanBanHanhs()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete CoQuanBanHanh?',
      'Are you sure you want to delete the CoQuanBanHanh?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCoQuanBanHanh(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.coQuanBanHanh.id}</Text>
        <Text testID='tenCoQuan'>TenCoQuan: {this.state.coQuanBanHanh.tenCoQuan}</Text>
        <RoundedButton text='Edit' onPress={coQuanBanHanhEntityEditScreen.bind(this, { entityId: this.state.coQuanBanHanh.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    coQuanBanHanh: state.coQuanBanHanhs.coQuanBanHanh,
    deleting: state.coQuanBanHanhs.deleting,
    errorDeleting: state.coQuanBanHanhs.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCoQuanBanHanh: (id) => dispatch(CoQuanBanHanhActions.coQuanBanHanhRequest(id)),
    getAllCoQuanBanHanhs: (options) => dispatch(CoQuanBanHanhActions.coQuanBanHanhAllRequest(options)),
    deleteCoQuanBanHanh: (id) => dispatch(CoQuanBanHanhActions.coQuanBanHanhDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoQuanBanHanhEntityDetailScreen)
