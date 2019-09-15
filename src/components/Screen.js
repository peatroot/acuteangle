import React from 'react';
import { styled } from '@material-ui/styles';

const Screen = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: `calc(100vh - ${2 * theme.spacing(2)}px)`,
  maxHeight: '100%',
}));

export default Screen;
