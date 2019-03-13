import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { giaoVienEntityEditScreen } from '../../../navigation/layouts'

import GiaoVienActions from './giao-vien.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './giao-vien-entity-detail-screen-style'

class GiaoVienEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      giaoVien: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getGiaoVien(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.giaoVien) {
      this.setState({ giaoVien: newProps.giaoVien })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllGiaoViens()
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
      'Delete GiaoVien?',
      'Are you sure you want to delete the GiaoVien?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteGiaoVien(this.props.data.entityId)
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
        <Text>ID: {this.state.giaoVien.id}</Text>
        <Text testID='cMND'>CMND: {this.state.giaoVien.cMND}</Text>
        <Text testID='hoTen'>HoTen: {this.state.giaoVien.hoTen}</Text>
        <Text testID='sDT'>SDT: {this.state.giaoVien.sDT}</Text>
        <Text testID='ngaySinh'>NgaySinh: {String(this.state.giaoVien.ngaySinh)}</Text>
        <Text testID='queQuan'>QueQuan: {this.state.giaoVien.queQuan}</Text>
        <Text testID='diaChi'>DiaChi: {this.state.giaoVien.diaChi}</Text>
        <Text testID='email'>Email: {this.state.giaoVien.email}</Text>
        <Text testID='matKhau'>MatKhau: {this.state.giaoVien.matKhau}</Text>
        <Text testID='dungLuongKho'>DungLuongKho: {this.state.giaoVien.dungLuongKho}</Text>
        <Text testID='daSuDung'>DaSuDung: {this.state.giaoVien.daSuDung}</Text>
        <Text testID='capBac'>CapBac: {this.state.giaoVien.capBac}</Text>
        <Text testID='status'>Status: {this.state.giaoVien.status}</Text>
        <RoundedButton text='Edit' onPress={giaoVienEntityEditScreen.bind(this, { entityId: this.state.giaoVien.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    giaoVien: state.giaoViens.giaoVien,
    deleting: state.giaoViens.deleting,
    errorDeleting: state.giaoViens.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGiaoVien: (id) => dispatch(GiaoVienActions.giaoVienRequest(id)),
    getAllGiaoViens: (options) => dispatch(GiaoVienActions.giaoVienAllRequest(options)),
    deleteGiaoVien: (id) => dispatch(GiaoVienActions.giaoVienDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiaoVienEntityDetailScreen)
