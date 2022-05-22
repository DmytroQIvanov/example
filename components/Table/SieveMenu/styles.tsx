import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  menuItem: {
    fontSize: '12px',
  },
  filterMenuItem: {
    fontSize: '12px',
    padding: '4px 8px',

    '& p': {
      fontSize: '12px',
    },
  },
  icon: {
    fontSize: '10px',
  },
}));

export default useStyles;
