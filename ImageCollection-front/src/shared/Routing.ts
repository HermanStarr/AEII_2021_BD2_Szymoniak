import DescriptionIcon from '@material-ui/icons/Description';
export const HOME = '/home';

export const Routes = [
  {
    path: HOME,
    sidebarName: 'Articles',
    icon: DescriptionIcon,
    component: "Articles",
  },

];

export default Routes;