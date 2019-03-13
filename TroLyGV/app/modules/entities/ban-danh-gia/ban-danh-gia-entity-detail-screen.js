import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { banDanhGiaEntityEditScreen } from '../../../navigation/layouts'

import BanDanhGiaActions from './ban-danh-gia.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './ban-danh-gia-entity-detail-screen-style'

class BanDanhGiaEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      banDanhGia: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getBanDanhGia(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.banDanhGia) {
      this.setState({ banDanhGia: newProps.banDanhGia })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllBanDanhGias()
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
      'Delete BanDanhGia?',
      'Are you sure you want to delete the BanDanhGia?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteBanDanhGia(this.props.data.entityId)
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
        <Text>ID: {this.state.banDanhGia.id}</Text>
        <Text testID='moTa'>MoTa: {this.state.banDanhGia.moTa}</Text>
        <RoundedButton text='Edit' onPress={banDanhGiaEntityEditScreen.bind(this, { entityId: this.state.banDanhGia.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    banDanhGia: state.banDanhGias.banDanhGia,
    deleting: state.banDanhGias.deleting,
    errorDeleting: state.banDanhGias.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBanDanhGia: (id) => dispatch(BanDanhGiaActions.banDanhGiaRequest(id)),
    getAllBanDanhGias: (options) => dispatch(BanDanhGiaActions.banDanhGiaAllRequest(options)),
    deleteBanDanhGia: (id) => dispatch(BanDanhGiaActions.banDanhGiaDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BanDanhGiaEntityDetailScreen)
