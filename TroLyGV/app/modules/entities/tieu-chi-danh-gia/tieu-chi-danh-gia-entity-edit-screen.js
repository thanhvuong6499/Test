import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import TieuChiDanhGiaActions from './tieu-chi-danh-gia.reducer'
import TheLoaiTieuChiActions from '../the-loai-tieu-chi/the-loai-tieu-chi.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { tieuChiDanhGiaEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './tieu-chi-danh-gia-entity-edit-screen-style'

let Form = t.form.Form

class TieuChiDanhGiaEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        noiDung: t.maybe(t.String),
        level: t.maybe(t.Number),
        theLoaiTieuChiId: this.getTheLoaiTieuChis()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          theLoaiTieuChiId: {
            testID: 'theLoaiTieuChiIdInput',
            label: 'Theloaitieuchi'
          },
          noiDung: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('level').refs.input.focus(),
            testID: 'noiDungInput'
          },
          level: {
            testID: 'levelInput'
          }
        }
      },
      success: false,
      tieuChiDanhGia: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getTieuChiDanhGia(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllTheLoaiTieuChis()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.tieuChiDanhGia && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.tieuChiDanhGia)
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
        this.props.getAllTieuChiDanhGias({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.tieuChiDanhGia.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: tieuChiDanhGiaEntityDetailScreen.bind(this, { entityId })
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
      noiDung: value.noiDung || null,
      level: value.level || null,
      theLoaiTieuChiId: (value.theLoaiTieuChi && value.theLoaiTieuChi.id) ? value.theLoaiTieuChi.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      noiDung: value.noiDung || null,
      level: value.level || null
    }
    if (value.theLoaiTieuChiId) {
      entity.theLoaiTieuChi = { id: value.theLoaiTieuChiId }
    }
    return entity
  }

  getTheLoaiTieuChis = () => {
    const theLoaiTieuChis = {}
    this.props.theLoaiTieuChis.forEach(theLoaiTieuChi => {
      theLoaiTieuChis[theLoaiTieuChi.id] = theLoaiTieuChi.id ? theLoaiTieuChi.id.toString() : theLoaiTieuChi.id.toString()
    })
    return t.maybe(t.enums(theLoaiTieuChis))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const tieuChiDanhGia = this.refs.form.getValue()
    if (tieuChiDanhGia) { // if validation fails, value will be null
      this.props.updateTieuChiDanhGia(this.formValueToEntity(tieuChiDanhGia))
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
    theLoaiTieuChis: state.theLoaiTieuChis.theLoaiTieuChis || [],
    tieuChiDanhGia: state.tieuChiDanhGias.tieuChiDanhGia,
    fetching: state.tieuChiDanhGias.fetchingOne,
    updating: state.tieuChiDanhGias.updating,
    error: state.tieuChiDanhGias.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTheLoaiTieuChis: (options) => dispatch(TheLoaiTieuChiActions.theLoaiTieuChiAllRequest(options)),
    getTieuChiDanhGia: (id) => dispatch(TieuChiDanhGiaActions.tieuChiDanhGiaRequest(id)),
    getAllTieuChiDanhGias: (options) => dispatch(TieuChiDanhGiaActions.tieuChiDanhGiaAllRequest(options)),
    updateTieuChiDanhGia: (tieuChiDanhGia) => dispatch(TieuChiDanhGiaActions.tieuChiDanhGiaUpdateRequest(tieuChiDanhGia))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TieuChiDanhGiaEntityEditScreen)
