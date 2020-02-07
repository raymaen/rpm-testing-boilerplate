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
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { editItems } from '../store/rpm/rpm.actions';
import { Rpm } from '../types';
import uuid from 'uuid';

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
  editItems: typeof editItems;
  rpm: Rpm;
}

const AddItemDialog: React.FC<Props> = ({ editItems, rpm }) => {
  const classes = useStyles({});
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const submit = () => {
    editItems(rpm.id, [...rpm.items, { title, done: false, id: uuid() }]);
    setOpen(false);
  };

  return (
    <div>
      <Tooltip
        title="Add New Action"
        aria-label="add"
        arrow
        className={classes.fixed}
        onClick={() => setOpen(true)}
      >
        <Fab color="primary">
          <AddIcon fontSize="small" />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Action</DialogTitle>
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

export default connect(null, { editItems })(AddItemDialog);
