import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CauTraLoiActions from './cau-tra-loi.reducer'
import BanDanhGiaActions from '../ban-danh-gia/ban-danh-gia.reducer'
import TieuChiDanhGiaActions from '../tieu-chi-danh-gia/tieu-chi-danh-gia.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { cauTraLoiEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './cau-tra-loi-entity-edit-screen-style'

let Form = t.form.Form
const MucDiem = t.enums({
  CHUADAT: 'CHUADAT',
  DAT: 'DAT',
  KHA: 'KHA',
  TOT: 'TOT'
})

class CauTraLoiEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        thangDiem: t.maybe(MucDiem),
        banDanhGiaId: this.getBanDanhGias(),
        tieuChiDanhGiaId: this.getTieuChiDanhGias()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          banDanhGiaId: {
            testID: 'banDanhGiaIdInput',
            label: 'Bandanhgia'
          },
          tieuChiDanhGiaId: {
            testID: 'tieuChiDanhGiaIdInput',
            label: 'Tieuchidanhgia'
          },
          thangDiem: {
            testID: 'thangDiemInput'
          }
        }
      },
      success: false,
      cauTraLoi: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCauTraLoi(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllBanDanhGias()
    this.props.getAllTieuChiDanhGias()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.cauTraLoi && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.cauTraLoi)
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
        this.props.getAllCauTraLois({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.cauTraLoi.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: cauTraLoiEntityDetailScreen.bind(this, { entityId })
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
      thangDiem: value.thangDiem || null,
      banDanhGiaId: (value.banDanhGia && value.banDanhGia.id) ? value.banDanhGia.id : null,
      tieuChiDanhGiaId: (value.tieuChiDanhGia && value.tieuChiDanhGia.id) ? value.tieuChiDanhGia.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      thangDiem: value.thangDiem || null
    }
    if (value.banDanhGiaId) {
      entity.banDanhGia = { id: value.banDanhGiaId }
    }
    if (value.tieuChiDanhGiaId) {
      entity.tieuChiDanhGia = { id: value.tieuChiDanhGiaId }
    }
    return entity
  }

  getBanDanhGias = () => {
    const banDanhGias = {}
    this.props.banDanhGias.forEach(banDanhGia => {
      banDanhGias[banDanhGia.id] = banDanhGia.id ? banDanhGia.id.toString() : banDanhGia.id.toString()
    })
    return t.maybe(t.enums(banDanhGias))
  }
  getTieuChiDanhGias = () => {
    const tieuChiDanhGias = {}
    this.props.tieuChiDanhGias.forEach(tieuChiDanhGia => {
      tieuChiDanhGias[tieuChiDanhGia.id] = tieuChiDanhGia.id ? tieuChiDanhGia.id.toString() : tieuChiDanhGia.id.toString()
    })
    return t.maybe(t.enums(tieuChiDanhGias))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const cauTraLoi = this.refs.form.getValue()
    if (cauTraLoi) { // if validation fails, value will be null
      this.props.updateCauTraLoi(this.formValueToEntity(cauTraLoi))
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
    banDanhGias: state.banDanhGias.banDanhGias || [],
    tieuChiDanhGias: state.tieuChiDanhGias.tieuChiDanhGias || [],
    cauTraLoi: state.cauTraLois.cauTraLoi,
    fetching: state.cauTraLois.fetchingOne,
    updating: state.cauTraLois.updating,
    error: state.cauTraLois.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBanDanhGias: (options) => dispatch(BanDanhGiaActions.banDanhGiaAllRequest(options)),
    getAllTieuChiDanhGias: (options) => dispatch(TieuChiDanhGiaActions.tieuChiDanhGiaAllRequest(options)),
    getCauTraLoi: (id) => dispatch(CauTraLoiActions.cauTraLoiRequest(id)),
    getAllCauTraLois: (options) => dispatch(CauTraLoiActions.cauTraLoiAllRequest(options)),
    updateCauTraLoi: (cauTraLoi) => dispatch(CauTraLoiActions.cauTraLoiUpdateRequest(cauTraLoi))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CauTraLoiEntityEditScreen)
