import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { theLoaiVanBanEntityEditScreen } from '../../../navigation/layouts'

import TheLoaiVanBanActions from './the-loai-van-ban.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './the-loai-van-ban-entity-detail-screen-style'

class TheLoaiVanBanEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      theLoaiVanBan: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getTheLoaiVanBan(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.theLoaiVanBan) {
      this.setState({ theLoaiVanBan: newProps.theLoaiVanBan })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllTheLoaiVanBans()
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
      'Delete TheLoaiVanBan?',
      'Are you sure you want to delete the TheLoaiVanBan?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteTheLoaiVanBan(this.props.data.entityId)
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
        <Text>ID: {this.state.theLoaiVanBan.id}</Text>
        <Text testID='noiDung'>NoiDung: {this.state.theLoaiVanBan.noiDung}</Text>
        <RoundedButton text='Edit' onPress={theLoaiVanBanEntityEditScreen.bind(this, { entityId: this.state.theLoaiVanBan.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theLoaiVanBan: state.theLoaiVanBans.theLoaiVanBan,
    deleting: state.theLoaiVanBans.deleting,
    errorDeleting: state.theLoaiVanBans.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTheLoaiVanBan: (id) => dispatch(TheLoaiVanBanActions.theLoaiVanBanRequest(id)),
    getAllTheLoaiVanBans: (options) => dispatch(TheLoaiVanBanActions.theLoaiVanBanAllRequest(options)),
    deleteTheLoaiVanBan: (id) => dispatch(TheLoaiVanBanActions.theLoaiVanBanDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiVanBanEntityDetailScreen)
