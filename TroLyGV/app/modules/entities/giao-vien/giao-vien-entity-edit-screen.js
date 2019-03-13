import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import GiaoVienActions from './giao-vien.reducer'
import TaiLieuActions from '../tai-lieu/tai-lieu.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { giaoVienEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './giao-vien-entity-edit-screen-style'

let Form = t.form.Form
const CapBacGV = t.enums({
  GIAOVIEN: 'GIAOVIEN',
  TRUONGKHOA: 'TRUONGKHOA',
  CANBOCAPCAO: 'CANBOCAPCAO'
})
const TrangThai = t.enums({
  TONTAI: 'TONTAI',
  DAXOA: 'DAXOA'
})

class GiaoVienEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        cMND: t.maybe(t.String),
        hoTen: t.maybe(t.String),
        sDT: t.maybe(t.String),
        ngaySinh: t.maybe(t.Date),
        queQuan: t.maybe(t.String),
        diaChi: t.maybe(t.String),
        email: t.maybe(t.String),
        matKhau: t.maybe(t.String),
        dungLuongKho: t.maybe(t.Number),
        daSuDung: t.maybe(t.Number),
        capBac: t.maybe(CapBacGV),
        status: t.maybe(TrangThai),
        tailieuses: t.list(this.getTaiLieus())
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          taiLieuId: {
            testID: 'taiLieuIdInput',
            label: 'Tailieu'
          },
          cMND: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('hoTen').refs.input.focus(),
            testID: 'cMNDInput'
          },
          hoTen: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('sDT').refs.input.focus(),
            testID: 'hoTenInput'
          },
          sDT: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('ngaySinh').refs.input.focus(),
            testID: 'sDTInput'
          },
          ngaySinh: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('queQuan').refs.input.focus(),
            testID: 'ngaySinhInput'
          },
          queQuan: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('diaChi').refs.input.focus(),
            testID: 'queQuanInput'
          },
          diaChi: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus(),
            testID: 'diaChiInput'
          },
          email: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('matKhau').refs.input.focus(),
            testID: 'emailInput'
          },
          matKhau: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('dungLuongKho').refs.input.focus(),
            testID: 'matKhauInput'
          },
          dungLuongKho: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('daSuDung').refs.input.focus(),
            testID: 'dungLuongKhoInput'
          },
          daSuDung: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('capBac').refs.input.focus(),
            testID: 'daSuDungInput'
          },
          capBac: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('status').refs.input.focus(),
            testID: 'capBacInput'
          },
          status: {
            testID: 'statusInput'
          }
        }
      },
      success: false,
      giaoVien: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getGiaoVien(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllTaiLieus()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.giaoVien && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.giaoVien)
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
        this.props.getAllGiaoViens({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.giaoVien.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: giaoVienEntityDetailScreen.bind(this, { entityId })
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
      cMND: value.cMND || null,
      hoTen: value.hoTen || null,
      sDT: value.sDT || null,
      ngaySinh: value.ngaySinh || null,
      queQuan: value.queQuan || null,
      diaChi: value.diaChi || null,
      email: value.email || null,
      matKhau: value.matKhau || null,
      dungLuongKho: value.dungLuongKho || null,
      daSuDung: value.daSuDung || null,
      capBac: value.capBac || null,
      status: value.status || null,
      tailieus: [].concat(value.tailieus.map((tailieu) => { return tailieu.id }))
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      cMND: value.cMND || null,
      hoTen: value.hoTen || null,
      sDT: value.sDT || null,
      ngaySinh: value.ngaySinh || null,
      queQuan: value.queQuan || null,
      diaChi: value.diaChi || null,
      email: value.email || null,
      matKhau: value.matKhau || null,
      dungLuongKho: value.dungLuongKho || null,
      daSuDung: value.daSuDung || null,
      capBac: value.capBac || null,
      status: value.status || null
    }
    entity.tailieus = [].concat(value.tailieus.map((tailieu) => { return {id: tailieu} }))
    return entity
  }

  getTaiLieus = () => {
    const taiLieus = {}
    this.props.taiLieus.forEach(taiLieu => {
      taiLieus[taiLieu.id] = taiLieu.id ? taiLieu.id.toString() : taiLieu.id.toString()
    })
    return t.maybe(t.enums(taiLieus))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const giaoVien = this.refs.form.getValue()
    if (giaoVien) { // if validation fails, value will be null
      this.props.updateGiaoVien(this.formValueToEntity(giaoVien))
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
    taiLieus: state.taiLieus.taiLieus || [],
    giaoVien: state.giaoViens.giaoVien,
    fetching: state.giaoViens.fetchingOne,
    updating: state.giaoViens.updating,
    error: state.giaoViens.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTaiLieus: (options) => dispatch(TaiLieuActions.taiLieuAllRequest(options)),
    getGiaoVien: (id) => dispatch(GiaoVienActions.giaoVienRequest(id)),
    getAllGiaoViens: (options) => dispatch(GiaoVienActions.giaoVienAllRequest(options)),
    updateGiaoVien: (giaoVien) => dispatch(GiaoVienActions.giaoVienUpdateRequest(giaoVien))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiaoVienEntityEditScreen)
