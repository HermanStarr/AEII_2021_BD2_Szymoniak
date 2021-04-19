import DescriptionIcon from '@material-ui/icons/Description';
import Login from "../components/signInUp/Login";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Registration from "../components/signInUp/Registration";
import Images from "../components/images/Images";
import {Account} from "../components/Account";
import {Backup} from "../components/Backup";
import {Profiles} from "../components/Profiles";


export const HOME = '/home';
export const REGISTER = '/register';
export const LOGIN = '/login';
export const ACCOUNT = '/account';
export const BACKUP = '/backup';
export const PROFILES = '/profiles';

export const Routes = [
  {
    path: LOGIN,
    sidebarName: 'Login',
    icon: LockOpenIcon,
    component: Login,
  },
  {
    path: REGISTER,
    sidebarName: 'Register',
    icon: VpnKeyIcon,
    component: Registration,
  },
  {
    path: HOME,
    sidebarName: 'Images',
    icon: DescriptionIcon,
    component: Images,
  },
  {
    path: ACCOUNT,
    sidebarName: 'MyProfile',
    icon: DescriptionIcon,
    component: Account,
  },
  {
    path: BACKUP,
    sidebarName: 'Backup',
    icon: DescriptionIcon,
    component: Backup,
  },
  {
    path: PROFILES,
    sidebarName: 'Profiles',
    icon: DescriptionIcon,
    component: Profiles,
  }
];

export default Routes;