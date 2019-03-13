import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CoQuanBanHanhActions from './co-quan-ban-hanh.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { coQuanBanHanhEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './co-quan-ban-hanh-entity-edit-screen-style'

let Form = t.form.Form

class CoQuanBanHanhEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        tenCoQuan: t.maybe(t.String)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          tenCoQuan: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'tenCoQuanInput'
          }
        }
      },
      success: false,
      coQuanBanHanh: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCoQuanBanHanh(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.coQuanBanHanh && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.coQuanBanHanh)
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
        this.props.getAllCoQuanBanHanhs({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.coQuanBanHanh.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: coQuanBanHanhEntityDetailScreen.bind(this, { entityId })
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
      tenCoQuan: value.tenCoQuan || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      tenCoQuan: value.tenCoQuan || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const coQuanBanHanh = this.refs.form.getValue()
    if (coQuanBanHanh) { // if validation fails, value will be null
      this.props.updateCoQuanBanHanh(this.formValueToEntity(coQuanBanHanh))
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
    coQuanBanHanh: state.coQuanBanHanhs.coQuanBanHanh,
    fetching: state.coQuanBanHanhs.fetchingOne,
    updating: state.coQuanBanHanhs.updating,
    error: state.coQuanBanHanhs.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCoQuanBanHanh: (id) => dispatch(CoQuanBanHanhActions.coQuanBanHanhRequest(id)),
    getAllCoQuanBanHanhs: (options) => dispatch(CoQuanBanHanhActions.coQuanBanHanhAllRequest(options)),
    updateCoQuanBanHanh: (coQuanBanHanh) => dispatch(CoQuanBanHanhActions.coQuanBanHanhUpdateRequest(coQuanBanHanh))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoQuanBanHanhEntityEditScreen)
