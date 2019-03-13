import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import TaiLieuActions from './tai-lieu.reducer'
import TheLoaiTaiLieuActions from '../the-loai-tai-lieu/the-loai-tai-lieu.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { taiLieuEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './tai-lieu-entity-edit-screen-style'

let Form = t.form.Form
const TrangThai = t.enums({
  TONTAI: 'TONTAI',
  DAXOA: 'DAXOA'
})

class TaiLieuEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        tenVanBan: t.maybe(t.String),
        tomTat: t.maybe(t.String),
        uRL: t.maybe(t.String),
        dungLuong: t.maybe(t.Number),
        tag: t.maybe(t.String),
        status: t.maybe(TrangThai),
        theloaitailieuses: t.list(this.getTheLoaiTaiLieus())
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          theLoaiTaiLieuId: {
            testID: 'theLoaiTaiLieuIdInput',
            label: 'Theloaitailieu'
          },
          tenVanBan: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('tomTat').refs.input.focus(),
            testID: 'tenVanBanInput'
          },
          tomTat: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('uRL').refs.input.focus(),
            testID: 'tomTatInput'
          },
          uRL: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('dungLuong').refs.input.focus(),
            testID: 'uRLInput'
          },
          dungLuong: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('tag').refs.input.focus(),
            testID: 'dungLuongInput'
          },
          tag: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('status').refs.input.focus(),
            testID: 'tagInput'
          },
          status: {
            testID: 'statusInput'
          }
        }
      },
      success: false,
      taiLieu: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getTaiLieu(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllTheLoaiTaiLieus()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.taiLieu && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.taiLieu)
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
        this.props.getAllTaiLieus({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.taiLieu.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: taiLieuEntityDetailScreen.bind(this, { entityId })
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
      tenVanBan: value.tenVanBan || null,
      tomTat: value.tomTat || null,
      uRL: value.uRL || null,
      dungLuong: value.dungLuong || null,
      tag: value.tag || null,
      status: value.status || null,
      theloaitailieus: [].concat(value.theloaitailieus.map((theloaitailieu) => { return theloaitailieu.id }))
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      tenVanBan: value.tenVanBan || null,
      tomTat: value.tomTat || null,
      uRL: value.uRL || null,
      dungLuong: value.dungLuong || null,
      tag: value.tag || null,
      status: value.status || null
    }
    entity.theloaitailieus = [].concat(value.theloaitailieus.map((theloaitailieu) => { return {id: theloaitailieu} }))
    return entity
  }

  getTheLoaiTaiLieus = () => {
    const theLoaiTaiLieus = {}
    this.props.theLoaiTaiLieus.forEach(theLoaiTaiLieu => {
      theLoaiTaiLieus[theLoaiTaiLieu.id] = theLoaiTaiLieu.id ? theLoaiTaiLieu.id.toString() : theLoaiTaiLieu.id.toString()
    })
    return t.maybe(t.enums(theLoaiTaiLieus))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const taiLieu = this.refs.form.getValue()
    if (taiLieu) { // if validation fails, value will be null
      this.props.updateTaiLieu(this.formValueToEntity(taiLieu))
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
    theLoaiTaiLieus: state.theLoaiTaiLieus.theLoaiTaiLieus || [],
    taiLieu: state.taiLieus.taiLieu,
    fetching: state.taiLieus.fetchingOne,
    updating: state.taiLieus.updating,
    error: state.taiLieus.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTheLoaiTaiLieus: (options) => dispatch(TheLoaiTaiLieuActions.theLoaiTaiLieuAllRequest(options)),
    getTaiLieu: (id) => dispatch(TaiLieuActions.taiLieuRequest(id)),
    getAllTaiLieus: (options) => dispatch(TaiLieuActions.taiLieuAllRequest(options)),
    updateTaiLieu: (taiLieu) => dispatch(TaiLieuActions.taiLieuUpdateRequest(taiLieu))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaiLieuEntityEditScreen)
