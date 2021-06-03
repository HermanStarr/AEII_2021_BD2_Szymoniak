import Login from "../components/signInUp/Login";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Registration from "../components/signInUp/Registration";
import Images from "../components/images/Images";
import {Account} from "../components/Account";
import {Backup} from "../components/Backup";
import {Profiles} from "../components/Profiles";
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BackupIcon from '@material-ui/icons/Backup';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export const HOME = '/home';
export const REGISTER = '/register';
export const LOGIN = '/login';
export const BACKUP = '/backup';
export const PROFILES = '/profiles';
export const ACCOUNT = "/profiles/:nickname";

export const Routes = [
  {
    admin: true,
    notLoggedUser: true,
    path: LOGIN,
    sidebarName: 'Login',
    icon: LockOpenIcon,
    component: Login,
  },
  {
    admin: true,
    notLoggedUser: true,
    path: REGISTER,
    sidebarName: 'Register',
    icon: VpnKeyIcon,
    component: Registration,
  },
  {
    admin: true,
    loggedUser:true,
    path: HOME,
    sidebarName: 'Images',
    icon: ImageIcon,
    component: Images,
  },
  {
    admin: true,
    loggedUser:true,
    path: ACCOUNT,
    sidebarName: 'MyProfile',
    icon: AccountBoxIcon,
    component: Account,
  },
  {
    admin: true,
    path: BACKUP,
    sidebarName: 'Backup',
    icon: BackupIcon,
    component: Backup,
  },
  {
    admin: true,
    loggedUser:true,
    path: PROFILES,
    sidebarName: 'Profiles',
    icon: SupervisorAccountIcon,
    component: Profiles,
  },


];

export default Routes;