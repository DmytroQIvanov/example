import { useState } from 'react';

const useAnchorState = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const toggle = (event: any) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return { anchorEl, toggle, handleClose };
};

export default useAnchorState;
