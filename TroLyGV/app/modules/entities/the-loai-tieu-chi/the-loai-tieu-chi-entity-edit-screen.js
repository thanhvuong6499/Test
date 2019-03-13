import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import TheLoaiTieuChiActions from './the-loai-tieu-chi.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { theLoaiTieuChiEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './the-loai-tieu-chi-entity-edit-screen-style'

let Form = t.form.Form

class TheLoaiTieuChiEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        noiDung: t.maybe(t.String),
        level: t.maybe(t.Number)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          noiDung: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('level').refs.input.focus(),
            testID: 'noiDungInput'
          },
          level: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'levelInput'
          }
        }
      },
      success: false,
      theLoaiTieuChi: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getTheLoaiTieuChi(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.theLoaiTieuChi && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.theLoaiTieuChi)
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
        this.props.getAllTheLoaiTieuChis({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.theLoaiTieuChi.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: theLoaiTieuChiEntityDetailScreen.bind(this, { entityId })
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
      level: value.level || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      noiDung: value.noiDung || null,
      level: value.level || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const theLoaiTieuChi = this.refs.form.getValue()
    if (theLoaiTieuChi) { // if validation fails, value will be null
      this.props.updateTheLoaiTieuChi(this.formValueToEntity(theLoaiTieuChi))
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
    theLoaiTieuChi: state.theLoaiTieuChis.theLoaiTieuChi,
    fetching: state.theLoaiTieuChis.fetchingOne,
    updating: state.theLoaiTieuChis.updating,
    error: state.theLoaiTieuChis.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTheLoaiTieuChi: (id) => dispatch(TheLoaiTieuChiActions.theLoaiTieuChiRequest(id)),
    getAllTheLoaiTieuChis: (options) => dispatch(TheLoaiTieuChiActions.theLoaiTieuChiAllRequest(options)),
    updateTheLoaiTieuChi: (theLoaiTieuChi) => dispatch(TheLoaiTieuChiActions.theLoaiTieuChiUpdateRequest(theLoaiTieuChi))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiTieuChiEntityEditScreen)
