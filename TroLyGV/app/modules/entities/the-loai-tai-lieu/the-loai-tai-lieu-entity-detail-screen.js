import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { theLoaiTaiLieuEntityEditScreen } from '../../../navigation/layouts'

import TheLoaiTaiLieuActions from './the-loai-tai-lieu.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './the-loai-tai-lieu-entity-detail-screen-style'

class TheLoaiTaiLieuEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      theLoaiTaiLieu: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getTheLoaiTaiLieu(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.theLoaiTaiLieu) {
      this.setState({ theLoaiTaiLieu: newProps.theLoaiTaiLieu })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllTheLoaiTaiLieus()
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
      'Delete TheLoaiTaiLieu?',
      'Are you sure you want to delete the TheLoaiTaiLieu?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteTheLoaiTaiLieu(this.props.data.entityId)
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
        <Text>ID: {this.state.theLoaiTaiLieu.id}</Text>
        <Text testID='noiDung'>NoiDung: {this.state.theLoaiTaiLieu.noiDung}</Text>
        <RoundedButton text='Edit' onPress={theLoaiTaiLieuEntityEditScreen.bind(this, { entityId: this.state.theLoaiTaiLieu.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theLoaiTaiLieu: state.theLoaiTaiLieus.theLoaiTaiLieu,
    deleting: state.theLoaiTaiLieus.deleting,
    errorDeleting: state.theLoaiTaiLieus.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTheLoaiTaiLieu: (id) => dispatch(TheLoaiTaiLieuActions.theLoaiTaiLieuRequest(id)),
    getAllTheLoaiTaiLieus: (options) => dispatch(TheLoaiTaiLieuActions.theLoaiTaiLieuAllRequest(options)),
    deleteTheLoaiTaiLieu: (id) => dispatch(TheLoaiTaiLieuActions.theLoaiTaiLieuDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiTaiLieuEntityDetailScreen)
