import { createMuiTheme } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[500],
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Inter", "serif"',
    fontSize: 10,
  },
});

export default theme;
