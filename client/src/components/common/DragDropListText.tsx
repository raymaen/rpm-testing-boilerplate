import React from 'react';
import ContentEditable from 'react-contenteditable';
import { Item, Rpm } from '../../types';
import { editItems } from '../../store/rpm/rpm.actions';
import { connect } from 'react-redux';

interface Props {
  item: Item;
  editItems: typeof editItems;
  rpm: Rpm;
}
const DragDropListText: React.FC<Props> = ({ item, editItems, rpm }) => {
  const editTitle = (e: any) => {
    editItems(
      rpm.id,
      rpm.items.map(i =>
        i.id === item.id ? { ...i, title: e.target.value } : i
      )
    );
  };

  return (
    <div>
      <ContentEditable
        id="item"
        html={item.title} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={editTitle} // handle innerHTML change
      />
    </div>
  );
};

export default connect(null, { editItems })(DragDropListText);
