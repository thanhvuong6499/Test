import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { cauTraLoiEntityEditScreen } from '../../../navigation/layouts'

import CauTraLoiActions from './cau-tra-loi.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './cau-tra-loi-entity-detail-screen-style'

class CauTraLoiEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      cauTraLoi: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCauTraLoi(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.cauTraLoi) {
      this.setState({ cauTraLoi: newProps.cauTraLoi })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCauTraLois()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete CauTraLoi?',
      'Are you sure you want to delete the CauTraLoi?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCauTraLoi(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.cauTraLoi.id}</Text>
        <Text testID='thangDiem'>ThangDiem: {this.state.cauTraLoi.thangDiem}</Text>
        <RoundedButton text='Edit' onPress={cauTraLoiEntityEditScreen.bind(this, { entityId: this.state.cauTraLoi.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cauTraLoi: state.cauTraLois.cauTraLoi,
    deleting: state.cauTraLois.deleting,
    errorDeleting: state.cauTraLois.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCauTraLoi: (id) => dispatch(CauTraLoiActions.cauTraLoiRequest(id)),
    getAllCauTraLois: (options) => dispatch(CauTraLoiActions.cauTraLoiAllRequest(options)),
    deleteCauTraLoi: (id) => dispatch(CauTraLoiActions.cauTraLoiDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CauTraLoiEntityDetailScreen)
