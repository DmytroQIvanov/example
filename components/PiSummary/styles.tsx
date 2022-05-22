import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  content: {
  },
  editInternal: {
    border: '2px solid black',
    padding: '0px',
    borderRadius: '6px',
    '& input': {
      fontSize: '14px'
    }
  },
  container : {
    padding: '0px 10px',
  },
  topSection: {
    paddingTop: '10px'
  },
  textContent: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '13px',
    fontWeight: '500',
    minHeight: '20px'
  },
  textTitle: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginBottom: '3px'
  },
  item: {
    padding: '5px',
    background: 'white',
    borderRadius: '3px'
  },
  itemPaddingWhite: {
    padding: '3px',
    background: 'white'
  },
  itemBtn: {
    display: 'flex',
    width: '100%',

    '& > button': {
      textTransform: 'initial',
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: 600
    }
  },
  icon: {
    color: '#3b3b3b',
    fontSize: '18px',
    cursor: 'pointer',
    position: 'absolute',
    right: '120px',

    '&:hover': {
      color: '#1b1b1b'
    }
  },
  bottomSection: {
    paddingBottom: '10px'
  },

  actionIcon: {
    marginRight: '5px',
  },
}));

export default useStyles;