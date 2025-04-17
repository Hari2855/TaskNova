import React from 'react';
import Mail from './Mail';
import Lock from './Lock';
import User from './User';
import Plus from './Plus';
import {theme} from '../../constants/theme';
import Edit from './Edit';
import ArrowLeft from './ArrowLeft';
import Comment from './Comment';
import Delete from './Delete';
import Logout from './logout';

const icons = {
  mail: Mail,
  lock: Lock,
  user: User,
  plus: Plus,
  edit: Edit,
  arrowLeft: ArrowLeft,
  comment: Comment,
  delete: Delete,
  logout: Logout,
};

const Icon = ({name, ...props}) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={theme.colors.textLight}
      {...props}
    />
  );
};

export default Icon;
