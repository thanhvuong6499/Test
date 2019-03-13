import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import TheLoaiTaiLieuActions from './the-loai-tai-lieu.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { theLoaiTaiLieuEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './the-loai-tai-lieu-entity-edit-screen-style'

let Form = t.form.Form

class TheLoaiTaiLieuEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        noiDung: t.maybe(t.String)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          noiDung: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'noiDungInput'
          }
        }
      },
      success: false,
      theLoaiTaiLieu: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getTheLoaiTaiLieu(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.theLoaiTaiLieu && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.theLoaiTaiLieu)
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
        this.props.getAllTheLoaiTaiLieus({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.theLoaiTaiLieu.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: theLoaiTaiLieuEntityDetailScreen.bind(this, { entityId })
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
      noiDung: value.noiDung || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      noiDung: value.noiDung || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const theLoaiTaiLieu = this.refs.form.getValue()
    if (theLoaiTaiLieu) { // if validation fails, value will be null
      this.props.updateTheLoaiTaiLieu(this.formValueToEntity(theLoaiTaiLieu))
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
    theLoaiTaiLieu: state.theLoaiTaiLieus.theLoaiTaiLieu,
    fetching: state.theLoaiTaiLieus.fetchingOne,
    updating: state.theLoaiTaiLieus.updating,
    error: state.theLoaiTaiLieus.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTheLoaiTaiLieu: (id) => dispatch(TheLoaiTaiLieuActions.theLoaiTaiLieuRequest(id)),
    getAllTheLoaiTaiLieus: (options) => dispatch(TheLoaiTaiLieuActions.theLoaiTaiLieuAllRequest(options)),
    updateTheLoaiTaiLieu: (theLoaiTaiLieu) => dispatch(TheLoaiTaiLieuActions.theLoaiTaiLieuUpdateRequest(theLoaiTaiLieu))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiTaiLieuEntityEditScreen)
