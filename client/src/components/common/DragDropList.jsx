import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
  withStyles
} from '@material-ui/core';

import RootRef from '@material-ui/core/RootRef';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CloseIcon from '@material-ui/icons/Close';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DragDropListText from './DragDropListText';
import Checkbox from '@material-ui/core/Checkbox';

import { editItems } from '../../store/rpm/rpm.actions';
import { connect } from 'react-redux';

const styles = theme => ({
  dragIcon: { width: 20, marginLeft: '-25px', marginRight: '-10px' },
  checkbox: { width: 20, marginLeft: '-10px', marginRight: '-20px' },
  closeIcon: { width: 20, marginRight: '-10px', marginLeft: 0 },
  text: { width: '100%' }
});

const DragDropList = ({ classes, rpm, editItems }) => {
  const { items, id } = rpm;

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    editItems(
      rpm.id,
      reorder(items, result.source.index, result.destination.index)
    );
  };

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: 'rgb(235,235,235)'
    })
  });

  const setChecked = itemId =>
    editItems(
      rpm.id,
      rpm.items.map(item =>
        item.id === itemId ? { ...item, done: !item.done } : item
      )
    );

  const setDeleteItem = itemId =>
    editItems(
      rpm.id,
      rpm.items.filter(item => item.id !== itemId)
    );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <List>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      fullWidth
                      ContainerComponent="div"
                      ContainerProps={{ ref: provided.innerRef }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <ListItemIcon className={classes.dragIcon}>
                        <DragIndicatorIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemIcon className={classes.checkbox}>
                        <Checkbox
                          size="small"
                          value="primary"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                          className={classes.checkbox}
                          onChange={() => setChecked(item.id)}
                          checked={item.done}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.text}
                        primary={<DragDropListText item={item} rpm={rpm} />}
                      />
                      <ListItemSecondaryAction className={classes.closeIcon}>
                        <IconButton onClick={() => setDeleteItem(item.id)}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default connect(null, { editItems })(withStyles(styles)(DragDropList));
