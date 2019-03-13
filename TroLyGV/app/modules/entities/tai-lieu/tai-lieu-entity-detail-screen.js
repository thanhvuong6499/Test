import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { taiLieuEntityEditScreen } from '../../../navigation/layouts'

import TaiLieuActions from './tai-lieu.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './tai-lieu-entity-detail-screen-style'

class TaiLieuEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      taiLieu: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getTaiLieu(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.taiLieu) {
      this.setState({ taiLieu: newProps.taiLieu })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllTaiLieus()
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
      'Delete TaiLieu?',
      'Are you sure you want to delete the TaiLieu?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteTaiLieu(this.props.data.entityId)
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
        <Text>ID: {this.state.taiLieu.id}</Text>
        <Text testID='tenVanBan'>TenVanBan: {this.state.taiLieu.tenVanBan}</Text>
        <Text testID='tomTat'>TomTat: {this.state.taiLieu.tomTat}</Text>
        <Text testID='uRL'>URL: {this.state.taiLieu.uRL}</Text>
        <Text testID='dungLuong'>DungLuong: {this.state.taiLieu.dungLuong}</Text>
        <Text testID='tag'>Tag: {this.state.taiLieu.tag}</Text>
        <Text testID='status'>Status: {this.state.taiLieu.status}</Text>
        <RoundedButton text='Edit' onPress={taiLieuEntityEditScreen.bind(this, { entityId: this.state.taiLieu.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    taiLieu: state.taiLieus.taiLieu,
    deleting: state.taiLieus.deleting,
    errorDeleting: state.taiLieus.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTaiLieu: (id) => dispatch(TaiLieuActions.taiLieuRequest(id)),
    getAllTaiLieus: (options) => dispatch(TaiLieuActions.taiLieuAllRequest(options)),
    deleteTaiLieu: (id) => dispatch(TaiLieuActions.taiLieuDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaiLieuEntityDetailScreen)
