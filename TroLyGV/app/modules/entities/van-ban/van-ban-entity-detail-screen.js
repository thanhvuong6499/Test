import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { vanBanEntityEditScreen } from '../../../navigation/layouts'

import VanBanActions from './van-ban.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './van-ban-entity-detail-screen-style'

class VanBanEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      vanBan: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getVanBan(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.vanBan) {
      this.setState({ vanBan: newProps.vanBan })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllVanBans()
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
      'Delete VanBan?',
      'Are you sure you want to delete the VanBan?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteVanBan(this.props.data.entityId)
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
        <Text>ID: {this.state.vanBan.id}</Text>
        <Text testID='tenVanban'>TenVanban: {this.state.vanBan.tenVanban}</Text>
        <Text testID='tomTat'>TomTat: {this.state.vanBan.tomTat}</Text>
        <Text testID='uRL'>URL: {this.state.vanBan.uRL}</Text>
        <Text testID='status'>Status: {this.state.vanBan.status}</Text>
        <RoundedButton text='Edit' onPress={vanBanEntityEditScreen.bind(this, { entityId: this.state.vanBan.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vanBan: state.vanBans.vanBan,
    deleting: state.vanBans.deleting,
    errorDeleting: state.vanBans.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVanBan: (id) => dispatch(VanBanActions.vanBanRequest(id)),
    getAllVanBans: (options) => dispatch(VanBanActions.vanBanAllRequest(options)),
    deleteVanBan: (id) => dispatch(VanBanActions.vanBanDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VanBanEntityDetailScreen)
