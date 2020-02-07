import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import DragDropList from '../components/common/DragDropList';
import { Divider } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Rpm } from '../types';
import {
  editItems,
  editDescription,
  editTitle
} from '../store/rpm/rpm.actions';
import { AppState } from '../store';
import { connect } from 'react-redux';
import AddItemDialog from '../components/AddItemDialog';

export const sanitizeTitle = (input: any) =>
  sanitizeHtml(input, { allowedTags: ['div', 'br'] });

interface Props extends RouteComponentProps<{ id: any }> {
  rpm: Rpm;
  editItems: typeof editItems;
  editTitle: typeof editTitle;
  editDescription: typeof editDescription;
}

const Index: React.FC<Props> = ({
  rpm,
  editItems,
  editTitle,
  editDescription,
  history
}) => {
  if (!rpm) {
    history.push('/');
  }

  const { title, color, description, id } = rpm;
  return (
    <div style={{ background: color, padding: '20px 10px', width: '100%' }}>
      <ContentEditable
        html={`<b>${title}</b>`} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={e => editTitle(id, sanitizeTitle(e.target.value))} // handle innerHTML change
        style={{
          fontSize: 28
        }}
      />

      <Divider
        style={{
          margin: '20px 0'
        }}
      />
      <ContentEditable
        html={`${description}`} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={e => editDescription(id, e.target.value)} // handle innerHTML change
        style={{
          fontSize: 20
        }}
      />
      <Divider
        style={{
          margin: '20px 0'
        }}
      />
      <DragDropList rpm={rpm} />
      <AddItemDialog rpm={rpm} />
    </div>
  );
};
const mapStateToProps = (state: AppState, ownProps: Props) => ({
  rpm: state.rpm.filter(rpm => rpm.id === ownProps.match.params.id)[0]
});

export default connect(mapStateToProps, {
  editTitle,
  editDescription,
  editItems
})(withRouter(Index));
