import React from 'react';
import clsx from 'clsx';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRightOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FilterHdrIcon from '@material-ui/icons/FilterHdrOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import Notifications from './Notifications';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { useAuth0 } from '../auth/auth0-context';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      background: theme.palette.primary.main,
      color: '#fff',
      fontSize: 12
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      height: '100vh',
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  })
);

interface Props extends RouteComponentProps {
  children: JSX.Element;
  color: string;
  loading: boolean;
}

const MainLayout: React.FC<Props> = ({ children, history, color, loading }) => {
  const classes = useStyles({});
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuth0();

  const redirect = (url: string) => history.push(url);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            RPM
          </Typography>
        </Toolbar>
        <LinearProgress hidden={!loading} />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon color="secondary" fontSize="small" />
            )}
          </IconButton>
        </div>

        <List>
          <ListItem button onClick={() => redirect('/')}>
            <ListItemIcon>
              <FilterHdrIcon color="secondary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="RPM Planner" />
          </ListItem>

          <ListItem
            button
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <ListItemIcon>
              <ExitToAppIcon color="secondary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
      <main
        style={{ background: color }}
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
      <Notifications />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  color: state.globalSettings.selectedRpm
    ? state.rpm.filter(rpm => rpm.id === state.globalSettings.selectedRpm)[0]
        .color
    : '#fff',
  loading: state.globalSettings.loading
});

export default connect(mapStateToProps)(withRouter(MainLayout));
