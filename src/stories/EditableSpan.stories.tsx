import React from 'react';

import {EditableSpan} from "../EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  };

const changeCallback = action('Value changed')

export const EditableSpanExample = () => {
  return <EditableSpan value={'Start value'} onChange={changeCallback}/>
}


