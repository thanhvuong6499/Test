import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { theLoaiTieuChiEntityEditScreen } from '../../../navigation/layouts'

import TheLoaiTieuChiActions from './the-loai-tieu-chi.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './the-loai-tieu-chi-entity-detail-screen-style'

class TheLoaiTieuChiEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      theLoaiTieuChi: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getTheLoaiTieuChi(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.theLoaiTieuChi) {
      this.setState({ theLoaiTieuChi: newProps.theLoaiTieuChi })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllTheLoaiTieuChis()
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
      'Delete TheLoaiTieuChi?',
      'Are you sure you want to delete the TheLoaiTieuChi?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteTheLoaiTieuChi(this.props.data.entityId)
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
        <Text>ID: {this.state.theLoaiTieuChi.id}</Text>
        <Text testID='noiDung'>NoiDung: {this.state.theLoaiTieuChi.noiDung}</Text>
        <Text testID='level'>Level: {this.state.theLoaiTieuChi.level}</Text>
        <RoundedButton text='Edit' onPress={theLoaiTieuChiEntityEditScreen.bind(this, { entityId: this.state.theLoaiTieuChi.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theLoaiTieuChi: state.theLoaiTieuChis.theLoaiTieuChi,
    deleting: state.theLoaiTieuChis.deleting,
    errorDeleting: state.theLoaiTieuChis.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTheLoaiTieuChi: (id) => dispatch(TheLoaiTieuChiActions.theLoaiTieuChiRequest(id)),
    getAllTheLoaiTieuChis: (options) => dispatch(TheLoaiTieuChiActions.theLoaiTieuChiAllRequest(options)),
    deleteTheLoaiTieuChi: (id) => dispatch(TheLoaiTieuChiActions.theLoaiTieuChiDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiTieuChiEntityDetailScreen)
