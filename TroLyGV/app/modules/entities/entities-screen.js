import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/*eslint-disable */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  giaoVienEntityScreen,
  taiLieuEntityScreen,
  banDanhGiaEntityScreen,
  cauTraLoiEntityScreen,
  coQuanBanHanhEntityScreen,
  theLoaiTaiLieuEntityScreen,
  theLoaiTieuChiEntityScreen,
  theLoaiVanBanEntityScreen,
  tieuChiDanhGiaEntityScreen,
  vanBanEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/*eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        <RoundedButton text='GiaoVien' onPress={giaoVienEntityScreen} testID='giaoVienEntityScreenButton' />
        <RoundedButton text='TaiLieu' onPress={taiLieuEntityScreen} testID='taiLieuEntityScreenButton' />
        <RoundedButton text='BanDanhGia' onPress={banDanhGiaEntityScreen} testID='banDanhGiaEntityScreenButton' />
        <RoundedButton text='CauTraLoi' onPress={cauTraLoiEntityScreen} testID='cauTraLoiEntityScreenButton' />
        <RoundedButton text='CoQuanBanHanh' onPress={coQuanBanHanhEntityScreen} testID='coQuanBanHanhEntityScreenButton' />
        <RoundedButton text='TheLoaiTaiLieu' onPress={theLoaiTaiLieuEntityScreen} testID='theLoaiTaiLieuEntityScreenButton' />
        <RoundedButton text='TheLoaiTieuChi' onPress={theLoaiTieuChiEntityScreen} testID='theLoaiTieuChiEntityScreenButton' />
        <RoundedButton text='TheLoaiVanBan' onPress={theLoaiVanBanEntityScreen} testID='theLoaiVanBanEntityScreenButton' />
        <RoundedButton text='TieuChiDanhGia' onPress={tieuChiDanhGiaEntityScreen} testID='tieuChiDanhGiaEntityScreenButton' />
        <RoundedButton text='VanBan' onPress={vanBanEntityScreen} testID='vanBanEntityScreenButton' />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
