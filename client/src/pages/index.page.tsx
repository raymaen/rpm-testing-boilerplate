import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddRpmDialog from '../components/AddRpmDialog';
import { RpmState } from '../store/rpm/rpm.types';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { deleteRpm } from '../store/rpm/rpm.actions';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { selectRpm } from '../store/global-settings/global-settings.actions';
import sanitizeHtml from 'sanitize-html';

export const sanitize = (input: any) =>
  sanitizeHtml(input, { allowedTags: [] });

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '10px auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

interface Props extends RouteComponentProps {
  rpms: RpmState;
  deleteRpm: typeof deleteRpm;
  selectRpm: typeof selectRpm;
}

const IndexPage: React.FC<Props> = ({
  rpms,
  deleteRpm,
  history,
  selectRpm
}) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  selectRpm(null);

  return (
    <Fragment>
      {rpms.map(rpm => (
        <Card className={classes.card} style={{ background: rpm.color }}>
          <CardHeader
            action={
              <IconButton
                aria-label="settings"
                onClick={() => deleteRpm(rpm.id)}
              >
                <CloseIcon />
              </IconButton>
            }
            title={
              <Typography variant="h5" component="h2">
                {sanitize(rpm.title)}
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="body2" component="p">
              {sanitize(rpm.description)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => {
                selectRpm(rpm.id);
                history.push(`/rpm/${rpm.id}`);
              }}
            >
              View
            </Button>
          </CardActions>
        </Card>
      ))}
      <AddRpmDialog />
    </Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  rpms: state.rpm
});

export default connect(mapStateToProps, { deleteRpm, selectRpm })(
  withRouter(IndexPage)
);
