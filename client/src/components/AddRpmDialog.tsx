import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import { connect } from 'react-redux';
import { addRpm } from '../store/rpm/rpm.actions';
import { getColor } from '../util';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(2)
    },
    fixed: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(3)
    }
  })
);

interface Props {
  addRpm: typeof addRpm;
}

const AddRpmDialog: React.FC<Props> = ({ addRpm }) => {
  const classes = useStyles({});
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = () => {
    addRpm({ title, description, items: [], color: getColor() });
    setOpen(false);
  };

  return (
    <div>
      <Tooltip
        title="Add New Rpm"
        aria-label="add"
        arrow
        className={classes.fixed}
        onClick={() => setOpen(true)}
      >
        <Fab color="primary">
          <FilterHdrIcon fontSize="small" />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Rpm</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Title"
            type="text"
            required
            fullWidth
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            multiline
            rows={3}
            type="text"
            fullWidth
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(null, { addRpm })(AddRpmDialog);
