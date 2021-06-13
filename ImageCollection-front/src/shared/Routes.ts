import Images from "../components/images/Images";
import {Backup} from "../components/Backup";
import {Profiles} from "../components/Profiles";
import ImageIcon from '@material-ui/icons/Image';
import BackupIcon from '@material-ui/icons/Backup';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {CategoryManager} from "../components/Category";

export const HOME = '/home';
export const REGISTER = '/register';
export const LOGIN = '/login';
export const BACKUP = '/backup';
export const PROFILES = '/profiles';
export const ACCOUNT = "/profiles/:nickname";
export const CATEGORIES = '/categories'

export const Routes = [
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
    path: BACKUP,
    sidebarName: 'Backup',
    icon: BackupIcon,
    component: Backup,
  },
  {
    admin: true,
    path: CATEGORIES,
    sidebarName: 'Categories',
    icon: BackupIcon,
    component: CategoryManager,
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