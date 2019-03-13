import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { tieuChiDanhGiaEntityEditScreen } from '../../../navigation/layouts'

import TieuChiDanhGiaActions from './tieu-chi-danh-gia.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './tieu-chi-danh-gia-entity-detail-screen-style'

class TieuChiDanhGiaEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      tieuChiDanhGia: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getTieuChiDanhGia(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.tieuChiDanhGia) {
      this.setState({ tieuChiDanhGia: newProps.tieuChiDanhGia })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllTieuChiDanhGias()
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
      'Delete TieuChiDanhGia?',
      'Are you sure you want to delete the TieuChiDanhGia?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteTieuChiDanhGia(this.props.data.entityId)
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
        <Text>ID: {this.state.tieuChiDanhGia.id}</Text>
        <Text testID='noiDung'>NoiDung: {this.state.tieuChiDanhGia.noiDung}</Text>
        <Text testID='level'>Level: {this.state.tieuChiDanhGia.level}</Text>
        <RoundedButton text='Edit' onPress={tieuChiDanhGiaEntityEditScreen.bind(this, { entityId: this.state.tieuChiDanhGia.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tieuChiDanhGia: state.tieuChiDanhGias.tieuChiDanhGia,
    deleting: state.tieuChiDanhGias.deleting,
    errorDeleting: state.tieuChiDanhGias.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTieuChiDanhGia: (id) => dispatch(TieuChiDanhGiaActions.tieuChiDanhGiaRequest(id)),
    getAllTieuChiDanhGias: (options) => dispatch(TieuChiDanhGiaActions.tieuChiDanhGiaAllRequest(options)),
    deleteTieuChiDanhGia: (id) => dispatch(TieuChiDanhGiaActions.tieuChiDanhGiaDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TieuChiDanhGiaEntityDetailScreen)
