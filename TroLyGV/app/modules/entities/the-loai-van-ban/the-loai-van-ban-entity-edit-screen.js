import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import TheLoaiVanBanActions from './the-loai-van-ban.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { theLoaiVanBanEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './the-loai-van-ban-entity-edit-screen-style'

let Form = t.form.Form

class TheLoaiVanBanEntityEditScreen extends React.Component {
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
      theLoaiVanBan: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getTheLoaiVanBan(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.theLoaiVanBan && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.theLoaiVanBan)
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
        this.props.getAllTheLoaiVanBans({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.theLoaiVanBan.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: theLoaiVanBanEntityDetailScreen.bind(this, { entityId })
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
    const theLoaiVanBan = this.refs.form.getValue()
    if (theLoaiVanBan) { // if validation fails, value will be null
      this.props.updateTheLoaiVanBan(this.formValueToEntity(theLoaiVanBan))
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
    theLoaiVanBan: state.theLoaiVanBans.theLoaiVanBan,
    fetching: state.theLoaiVanBans.fetchingOne,
    updating: state.theLoaiVanBans.updating,
    error: state.theLoaiVanBans.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTheLoaiVanBan: (id) => dispatch(TheLoaiVanBanActions.theLoaiVanBanRequest(id)),
    getAllTheLoaiVanBans: (options) => dispatch(TheLoaiVanBanActions.theLoaiVanBanAllRequest(options)),
    updateTheLoaiVanBan: (theLoaiVanBan) => dispatch(TheLoaiVanBanActions.theLoaiVanBanUpdateRequest(theLoaiVanBan))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiVanBanEntityEditScreen)
