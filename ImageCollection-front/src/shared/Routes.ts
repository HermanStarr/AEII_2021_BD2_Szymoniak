import DescriptionIcon from '@material-ui/icons/Description';
import Login from "../components/signInUp/Login";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Registration from "../components/signInUp/Registration";

export const HOME = '/home';
export const REGISTER = '/register';
export const LOGIN = '/login';

export const Routes = [
  {
    path: HOME,
    sidebarName: 'Images',
    icon: DescriptionIcon,
    component: "Images",
  },
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
];

export default Routes;