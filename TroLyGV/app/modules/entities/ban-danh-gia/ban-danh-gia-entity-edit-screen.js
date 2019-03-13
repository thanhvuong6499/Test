import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import BanDanhGiaActions from './ban-danh-gia.reducer'
import GiaoVienActions from '../giao-vien/giao-vien.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { banDanhGiaEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './ban-danh-gia-entity-edit-screen-style'

let Form = t.form.Form

class BanDanhGiaEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        moTa: t.maybe(t.String),
        giaoVienId: this.getGiaoViens()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          giaoVienId: {
            testID: 'giaoVienIdInput',
            label: 'Giaovien'
          },
          moTa: {
            testID: 'moTaInput'
          }
        }
      },
      success: false,
      banDanhGia: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getBanDanhGia(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllGiaoViens()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.banDanhGia && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.banDanhGia)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.props.getAllBanDanhGias({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.banDanhGia.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: banDanhGiaEntityDetailScreen.bind(this, { entityId })
          })
        }
        this.setState({
          success: true,
          requesting: false,
          formValue: { id: null }
        })
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      moTa: value.moTa || null,
      giaoVienId: (value.giaoVien && value.giaoVien.id) ? value.giaoVien.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      moTa: value.moTa || null
    }
    if (value.giaoVienId) {
      entity.giaoVien = { id: value.giaoVienId }
    }
    return entity
  }

  getGiaoViens = () => {
    const giaoViens = {}
    this.props.giaoViens.forEach(giaoVien => {
      giaoViens[giaoVien.id] = giaoVien.id ? giaoVien.id.toString() : giaoVien.id.toString()
    })
    return t.maybe(t.enums(giaoViens))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const banDanhGia = this.refs.form.getValue()
    if (banDanhGia) { // if validation fails, value will be null
      this.props.updateBanDanhGia(this.formValueToEntity(banDanhGia))
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID='entityScrollView'>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4' testID='submitButton'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    giaoViens: state.giaoViens.giaoViens || [],
    banDanhGia: state.banDanhGias.banDanhGia,
    fetching: state.banDanhGias.fetchingOne,
    updating: state.banDanhGias.updating,
    error: state.banDanhGias.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGiaoViens: (options) => dispatch(GiaoVienActions.giaoVienAllRequest(options)),
    getBanDanhGia: (id) => dispatch(BanDanhGiaActions.banDanhGiaRequest(id)),
    getAllBanDanhGias: (options) => dispatch(BanDanhGiaActions.banDanhGiaAllRequest(options)),
    updateBanDanhGia: (banDanhGia) => dispatch(BanDanhGiaActions.banDanhGiaUpdateRequest(banDanhGia))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BanDanhGiaEntityEditScreen)
