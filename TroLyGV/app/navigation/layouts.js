import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images } from '../shared/themes'
// import { StorybookUIRoot } from '../../storybook'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import GiaoVienEntityScreen from '../modules/entities/giao-vien/giao-vien-entity-screen'
import GiaoVienEntityDetailScreen from '../modules/entities/giao-vien/giao-vien-entity-detail-screen'
import GiaoVienEntityEditScreen from '../modules/entities/giao-vien/giao-vien-entity-edit-screen'
import TaiLieuEntityScreen from '../modules/entities/tai-lieu/tai-lieu-entity-screen'
import TaiLieuEntityDetailScreen from '../modules/entities/tai-lieu/tai-lieu-entity-detail-screen'
import TaiLieuEntityEditScreen from '../modules/entities/tai-lieu/tai-lieu-entity-edit-screen'
import BanDanhGiaEntityScreen from '../modules/entities/ban-danh-gia/ban-danh-gia-entity-screen'
import BanDanhGiaEntityDetailScreen from '../modules/entities/ban-danh-gia/ban-danh-gia-entity-detail-screen'
import BanDanhGiaEntityEditScreen from '../modules/entities/ban-danh-gia/ban-danh-gia-entity-edit-screen'
import CauTraLoiEntityScreen from '../modules/entities/cau-tra-loi/cau-tra-loi-entity-screen'
import CauTraLoiEntityDetailScreen from '../modules/entities/cau-tra-loi/cau-tra-loi-entity-detail-screen'
import CauTraLoiEntityEditScreen from '../modules/entities/cau-tra-loi/cau-tra-loi-entity-edit-screen'
import CoQuanBanHanhEntityScreen from '../modules/entities/co-quan-ban-hanh/co-quan-ban-hanh-entity-screen'
import CoQuanBanHanhEntityDetailScreen from '../modules/entities/co-quan-ban-hanh/co-quan-ban-hanh-entity-detail-screen'
import CoQuanBanHanhEntityEditScreen from '../modules/entities/co-quan-ban-hanh/co-quan-ban-hanh-entity-edit-screen'
import TheLoaiTaiLieuEntityScreen from '../modules/entities/the-loai-tai-lieu/the-loai-tai-lieu-entity-screen'
import TheLoaiTaiLieuEntityDetailScreen from '../modules/entities/the-loai-tai-lieu/the-loai-tai-lieu-entity-detail-screen'
import TheLoaiTaiLieuEntityEditScreen from '../modules/entities/the-loai-tai-lieu/the-loai-tai-lieu-entity-edit-screen'
import TheLoaiTieuChiEntityScreen from '../modules/entities/the-loai-tieu-chi/the-loai-tieu-chi-entity-screen'
import TheLoaiTieuChiEntityDetailScreen from '../modules/entities/the-loai-tieu-chi/the-loai-tieu-chi-entity-detail-screen'
import TheLoaiTieuChiEntityEditScreen from '../modules/entities/the-loai-tieu-chi/the-loai-tieu-chi-entity-edit-screen'
import TheLoaiVanBanEntityScreen from '../modules/entities/the-loai-van-ban/the-loai-van-ban-entity-screen'
import TheLoaiVanBanEntityDetailScreen from '../modules/entities/the-loai-van-ban/the-loai-van-ban-entity-detail-screen'
import TheLoaiVanBanEntityEditScreen from '../modules/entities/the-loai-van-ban/the-loai-van-ban-entity-edit-screen'
import TieuChiDanhGiaEntityScreen from '../modules/entities/tieu-chi-danh-gia/tieu-chi-danh-gia-entity-screen'
import TieuChiDanhGiaEntityDetailScreen from '../modules/entities/tieu-chi-danh-gia/tieu-chi-danh-gia-entity-detail-screen'
import TieuChiDanhGiaEntityEditScreen from '../modules/entities/tieu-chi-danh-gia/tieu-chi-danh-gia-entity-edit-screen'
import VanBanEntityScreen from '../modules/entities/van-ban/van-ban-entity-screen'
import VanBanEntityDetailScreen from '../modules/entities/van-ban/van-ban-entity-detail-screen'
import VanBanEntityEditScreen from '../modules/entities/van-ban/van-ban-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const GIAO_VIEN_ENTITY_SCREEN = 'Nav.GiaoVienEntityScreen'
export const GIAO_VIEN_ENTITY_DETAIL_SCREEN = 'Nav.GiaoVienEntityDetailScreen'
export const GIAO_VIEN_ENTITY_EDIT_SCREEN = 'Nav.GiaoVienEntityEditScreen'
export const TAI_LIEU_ENTITY_SCREEN = 'Nav.TaiLieuEntityScreen'
export const TAI_LIEU_ENTITY_DETAIL_SCREEN = 'Nav.TaiLieuEntityDetailScreen'
export const TAI_LIEU_ENTITY_EDIT_SCREEN = 'Nav.TaiLieuEntityEditScreen'
export const BAN_DANH_GIA_ENTITY_SCREEN = 'Nav.BanDanhGiaEntityScreen'
export const BAN_DANH_GIA_ENTITY_DETAIL_SCREEN = 'Nav.BanDanhGiaEntityDetailScreen'
export const BAN_DANH_GIA_ENTITY_EDIT_SCREEN = 'Nav.BanDanhGiaEntityEditScreen'
export const CAU_TRA_LOI_ENTITY_SCREEN = 'Nav.CauTraLoiEntityScreen'
export const CAU_TRA_LOI_ENTITY_DETAIL_SCREEN = 'Nav.CauTraLoiEntityDetailScreen'
export const CAU_TRA_LOI_ENTITY_EDIT_SCREEN = 'Nav.CauTraLoiEntityEditScreen'
export const CO_QUAN_BAN_HANH_ENTITY_SCREEN = 'Nav.CoQuanBanHanhEntityScreen'
export const CO_QUAN_BAN_HANH_ENTITY_DETAIL_SCREEN = 'Nav.CoQuanBanHanhEntityDetailScreen'
export const CO_QUAN_BAN_HANH_ENTITY_EDIT_SCREEN = 'Nav.CoQuanBanHanhEntityEditScreen'
export const THE_LOAI_TAI_LIEU_ENTITY_SCREEN = 'Nav.TheLoaiTaiLieuEntityScreen'
export const THE_LOAI_TAI_LIEU_ENTITY_DETAIL_SCREEN = 'Nav.TheLoaiTaiLieuEntityDetailScreen'
export const THE_LOAI_TAI_LIEU_ENTITY_EDIT_SCREEN = 'Nav.TheLoaiTaiLieuEntityEditScreen'
export const THE_LOAI_TIEU_CHI_ENTITY_SCREEN = 'Nav.TheLoaiTieuChiEntityScreen'
export const THE_LOAI_TIEU_CHI_ENTITY_DETAIL_SCREEN = 'Nav.TheLoaiTieuChiEntityDetailScreen'
export const THE_LOAI_TIEU_CHI_ENTITY_EDIT_SCREEN = 'Nav.TheLoaiTieuChiEntityEditScreen'
export const THE_LOAI_VAN_BAN_ENTITY_SCREEN = 'Nav.TheLoaiVanBanEntityScreen'
export const THE_LOAI_VAN_BAN_ENTITY_DETAIL_SCREEN = 'Nav.TheLoaiVanBanEntityDetailScreen'
export const THE_LOAI_VAN_BAN_ENTITY_EDIT_SCREEN = 'Nav.TheLoaiVanBanEntityEditScreen'
export const TIEU_CHI_DANH_GIA_ENTITY_SCREEN = 'Nav.TieuChiDanhGiaEntityScreen'
export const TIEU_CHI_DANH_GIA_ENTITY_DETAIL_SCREEN = 'Nav.TieuChiDanhGiaEntityDetailScreen'
export const TIEU_CHI_DANH_GIA_ENTITY_EDIT_SCREEN = 'Nav.TieuChiDanhGiaEntityEditScreen'
export const VAN_BAN_ENTITY_SCREEN = 'Nav.VanBanEntityScreen'
export const VAN_BAN_ENTITY_DETAIL_SCREEN = 'Nav.VanBanEntityDetailScreen'
export const VAN_BAN_ENTITY_EDIT_SCREEN = 'Nav.VanBanEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT
        }
      },
      center: {
        stack: {
          id: 'center',
          children: [{
            component: {
              name: LAUNCH_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Welcome!',
                    color: Colors.snow
                  },
                  leftButtons: [
                    {
                      id: 'menuButton',
                      icon: Images.menuIcon,
                      testID: 'menuButton'
                    }
                  ]
                }
              }
            }
          }]
        }
      }
    }
  }
}

let lastAppState = 'active'
function handleAppStateChange (nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount () {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL (event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/')             // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3)    // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log(`Sending to Register Page`)
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp () {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponentWithRedux(GIAO_VIEN_ENTITY_SCREEN, () => GiaoVienEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(GIAO_VIEN_ENTITY_DETAIL_SCREEN, () => GiaoVienEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(GIAO_VIEN_ENTITY_EDIT_SCREEN, () => GiaoVienEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(TAI_LIEU_ENTITY_SCREEN, () => TaiLieuEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(TAI_LIEU_ENTITY_DETAIL_SCREEN, () => TaiLieuEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(TAI_LIEU_ENTITY_EDIT_SCREEN, () => TaiLieuEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(BAN_DANH_GIA_ENTITY_SCREEN, () => BanDanhGiaEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(BAN_DANH_GIA_ENTITY_DETAIL_SCREEN, () => BanDanhGiaEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(BAN_DANH_GIA_ENTITY_EDIT_SCREEN, () => BanDanhGiaEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CAU_TRA_LOI_ENTITY_SCREEN, () => CauTraLoiEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CAU_TRA_LOI_ENTITY_DETAIL_SCREEN, () => CauTraLoiEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CAU_TRA_LOI_ENTITY_EDIT_SCREEN, () => CauTraLoiEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CO_QUAN_BAN_HANH_ENTITY_SCREEN, () => CoQuanBanHanhEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CO_QUAN_BAN_HANH_ENTITY_DETAIL_SCREEN, () => CoQuanBanHanhEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CO_QUAN_BAN_HANH_ENTITY_EDIT_SCREEN, () => CoQuanBanHanhEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(THE_LOAI_TAI_LIEU_ENTITY_SCREEN, () => TheLoaiTaiLieuEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(THE_LOAI_TAI_LIEU_ENTITY_DETAIL_SCREEN, () => TheLoaiTaiLieuEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(THE_LOAI_TAI_LIEU_ENTITY_EDIT_SCREEN, () => TheLoaiTaiLieuEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(THE_LOAI_TIEU_CHI_ENTITY_SCREEN, () => TheLoaiTieuChiEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(THE_LOAI_TIEU_CHI_ENTITY_DETAIL_SCREEN, () => TheLoaiTieuChiEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(THE_LOAI_TIEU_CHI_ENTITY_EDIT_SCREEN, () => TheLoaiTieuChiEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(THE_LOAI_VAN_BAN_ENTITY_SCREEN, () => TheLoaiVanBanEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(THE_LOAI_VAN_BAN_ENTITY_DETAIL_SCREEN, () => TheLoaiVanBanEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(THE_LOAI_VAN_BAN_ENTITY_EDIT_SCREEN, () => TheLoaiVanBanEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(TIEU_CHI_DANH_GIA_ENTITY_SCREEN, () => TieuChiDanhGiaEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(TIEU_CHI_DANH_GIA_ENTITY_DETAIL_SCREEN, () => TieuChiDanhGiaEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(TIEU_CHI_DANH_GIA_ENTITY_EDIT_SCREEN, () => TieuChiDanhGiaEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(VAN_BAN_ENTITY_SCREEN, () => VanBanEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(VAN_BAN_ENTITY_DETAIL_SCREEN, () => VanBanEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(VAN_BAN_ENTITY_EDIT_SCREEN, () => VanBanEntityEditScreen, Provider, store)
  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow
          }
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow
        },
        background: {
          color: Colors.background
        }
      },
      sideMenu: {
        left: {
          enabled: false
        }
      }
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: LOGIN_SCREEN,
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    }]
  }
})

export const registerScreen = () => Navigation.push('center', {
  component: {
    name: REGISTER_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Sign Up',
          color: Colors.snow
        }
      }
    }
  }
})

export const forgotPasswordScreen = () => Navigation.push('center', {
  component: {
    name: FORGOT_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Forgot Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const changePasswordScreen = () => Navigation.push('center', {
  component: {
    name: CHANGE_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Change Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const settingsScreen = () => Navigation.push('center', {
  component: {
    name: SETTINGS_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Settings',
          color: Colors.snow
        }
      }
    }
  }
})

export const entitiesScreen = () => Navigation.push('center', {
  component: {
    name: ENTITIES_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Entities',
          color: Colors.snow
        }
      }
    }
  }
})

export const giaoVienEntityScreen = () => Navigation.push('center', {
  component: {
    name: GIAO_VIEN_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'GiaoViens',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const giaoVienEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: GIAO_VIEN_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'GiaoViens',
          color: Colors.snow
        }
      }
    }
  }
})

export const giaoVienEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: GIAO_VIEN_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'GiaoViens',
          color: Colors.snow
        }
      }
    }
  }
})

export const taiLieuEntityScreen = () => Navigation.push('center', {
  component: {
    name: TAI_LIEU_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'TaiLieus',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const taiLieuEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: TAI_LIEU_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TaiLieus',
          color: Colors.snow
        }
      }
    }
  }
})

export const taiLieuEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: TAI_LIEU_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TaiLieus',
          color: Colors.snow
        }
      }
    }
  }
})

export const banDanhGiaEntityScreen = () => Navigation.push('center', {
  component: {
    name: BAN_DANH_GIA_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'BanDanhGias',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const banDanhGiaEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: BAN_DANH_GIA_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'BanDanhGias',
          color: Colors.snow
        }
      }
    }
  }
})

export const banDanhGiaEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: BAN_DANH_GIA_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'BanDanhGias',
          color: Colors.snow
        }
      }
    }
  }
})

export const cauTraLoiEntityScreen = () => Navigation.push('center', {
  component: {
    name: CAU_TRA_LOI_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'CauTraLois',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const cauTraLoiEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: CAU_TRA_LOI_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CauTraLois',
          color: Colors.snow
        }
      }
    }
  }
})

export const cauTraLoiEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: CAU_TRA_LOI_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CauTraLois',
          color: Colors.snow
        }
      }
    }
  }
})

export const coQuanBanHanhEntityScreen = () => Navigation.push('center', {
  component: {
    name: CO_QUAN_BAN_HANH_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'CoQuanBanHanhs',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const coQuanBanHanhEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: CO_QUAN_BAN_HANH_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CoQuanBanHanhs',
          color: Colors.snow
        }
      }
    }
  }
})

export const coQuanBanHanhEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: CO_QUAN_BAN_HANH_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CoQuanBanHanhs',
          color: Colors.snow
        }
      }
    }
  }
})

export const theLoaiTaiLieuEntityScreen = () => Navigation.push('center', {
  component: {
    name: THE_LOAI_TAI_LIEU_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'TheLoaiTaiLieus',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const theLoaiTaiLieuEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: THE_LOAI_TAI_LIEU_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TheLoaiTaiLieus',
          color: Colors.snow
        }
      }
    }
  }
})

export const theLoaiTaiLieuEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: THE_LOAI_TAI_LIEU_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TheLoaiTaiLieus',
          color: Colors.snow
        }
      }
    }
  }
})

export const theLoaiTieuChiEntityScreen = () => Navigation.push('center', {
  component: {
    name: THE_LOAI_TIEU_CHI_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'TheLoaiTieuChis',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const theLoaiTieuChiEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: THE_LOAI_TIEU_CHI_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TheLoaiTieuChis',
          color: Colors.snow
        }
      }
    }
  }
})

export const theLoaiTieuChiEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: THE_LOAI_TIEU_CHI_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TheLoaiTieuChis',
          color: Colors.snow
        }
      }
    }
  }
})

export const theLoaiVanBanEntityScreen = () => Navigation.push('center', {
  component: {
    name: THE_LOAI_VAN_BAN_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'TheLoaiVanBans',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const theLoaiVanBanEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: THE_LOAI_VAN_BAN_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TheLoaiVanBans',
          color: Colors.snow
        }
      }
    }
  }
})

export const theLoaiVanBanEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: THE_LOAI_VAN_BAN_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TheLoaiVanBans',
          color: Colors.snow
        }
      }
    }
  }
})

export const tieuChiDanhGiaEntityScreen = () => Navigation.push('center', {
  component: {
    name: TIEU_CHI_DANH_GIA_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'TieuChiDanhGias',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const tieuChiDanhGiaEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: TIEU_CHI_DANH_GIA_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TieuChiDanhGias',
          color: Colors.snow
        }
      }
    }
  }
})

export const tieuChiDanhGiaEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: TIEU_CHI_DANH_GIA_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TieuChiDanhGias',
          color: Colors.snow
        }
      }
    }
  }
})

export const vanBanEntityScreen = () => Navigation.push('center', {
  component: {
    name: VAN_BAN_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'VanBans',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const vanBanEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: VAN_BAN_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'VanBans',
          color: Colors.snow
        }
      }
    }
  }
})

export const vanBanEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: VAN_BAN_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'VanBans',
          color: Colors.snow
        }
      }
    }
  }
})
// ignite-jhipster-navigation-method-needle
