import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import VanBanActions from './van-ban.reducer'
import CoQuanBanHanhActions from '../co-quan-ban-hanh/co-quan-ban-hanh.reducer'
import TheLoaiVanBanActions from '../the-loai-van-ban/the-loai-van-ban.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { vanBanEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './van-ban-entity-edit-screen-style'

let Form = t.form.Form
const TrangThai = t.enums({
  TONTAI: 'TONTAI',
  DAXOA: 'DAXOA'
})

class VanBanEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        tenVanban: t.maybe(t.String),
        tomTat: t.maybe(t.String),
        uRL: t.maybe(t.String),
        status: t.maybe(TrangThai),
        coQuanBanHanhId: this.getCoQuanBanHanhs(),
        theLoaiVanBanId: this.getTheLoaiVanBans()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          coQuanBanHanhId: {
            testID: 'coQuanBanHanhIdInput',
            label: 'Coquanbanhanh'
          },
          theLoaiVanBanId: {
            testID: 'theLoaiVanBanIdInput',
            label: 'Theloaivanban'
          },
          tenVanban: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('tomTat').refs.input.focus(),
            testID: 'tenVanbanInput'
          },
          tomTat: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('uRL').refs.input.focus(),
            testID: 'tomTatInput'
          },
          uRL: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('status').refs.input.focus(),
            testID: 'uRLInput'
          },
          status: {
            testID: 'statusInput'
          }
        }
      },
      success: false,
      vanBan: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getVanBan(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllCoQuanBanHanhs()
    this.props.getAllTheLoaiVanBans()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.vanBan && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.vanBan)
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
        this.props.getAllVanBans({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.vanBan.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: vanBanEntityDetailScreen.bind(this, { entityId })
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
      tenVanban: value.tenVanban || null,
      tomTat: value.tomTat || null,
      uRL: value.uRL || null,
      status: value.status || null,
      coQuanBanHanhId: (value.coQuanBanHanh && value.coQuanBanHanh.id) ? value.coQuanBanHanh.id : null,
      theLoaiVanBanId: (value.theLoaiVanBan && value.theLoaiVanBan.id) ? value.theLoaiVanBan.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      tenVanban: value.tenVanban || null,
      tomTat: value.tomTat || null,
      uRL: value.uRL || null,
      status: value.status || null
    }
    if (value.coQuanBanHanhId) {
      entity.coQuanBanHanh = { id: value.coQuanBanHanhId }
    }
    if (value.theLoaiVanBanId) {
      entity.theLoaiVanBan = { id: value.theLoaiVanBanId }
    }
    return entity
  }

  getCoQuanBanHanhs = () => {
    const coQuanBanHanhs = {}
    this.props.coQuanBanHanhs.forEach(coQuanBanHanh => {
      coQuanBanHanhs[coQuanBanHanh.id] = coQuanBanHanh.id ? coQuanBanHanh.id.toString() : coQuanBanHanh.id.toString()
    })
    return t.maybe(t.enums(coQuanBanHanhs))
  }
  getTheLoaiVanBans = () => {
    const theLoaiVanBans = {}
    this.props.theLoaiVanBans.forEach(theLoaiVanBan => {
      theLoaiVanBans[theLoaiVanBan.id] = theLoaiVanBan.id ? theLoaiVanBan.id.toString() : theLoaiVanBan.id.toString()
    })
    return t.maybe(t.enums(theLoaiVanBans))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const vanBan = this.refs.form.getValue()
    if (vanBan) { // if validation fails, value will be null
      this.props.updateVanBan(this.formValueToEntity(vanBan))
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
    coQuanBanHanhs: state.coQuanBanHanhs.coQuanBanHanhs || [],
    theLoaiVanBans: state.theLoaiVanBans.theLoaiVanBans || [],
    vanBan: state.vanBans.vanBan,
    fetching: state.vanBans.fetchingOne,
    updating: state.vanBans.updating,
    error: state.vanBans.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCoQuanBanHanhs: (options) => dispatch(CoQuanBanHanhActions.coQuanBanHanhAllRequest(options)),
    getAllTheLoaiVanBans: (options) => dispatch(TheLoaiVanBanActions.theLoaiVanBanAllRequest(options)),
    getVanBan: (id) => dispatch(VanBanActions.vanBanRequest(id)),
    getAllVanBans: (options) => dispatch(VanBanActions.vanBanAllRequest(options)),
    updateVanBan: (vanBan) => dispatch(VanBanActions.vanBanUpdateRequest(vanBan))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VanBanEntityEditScreen)
