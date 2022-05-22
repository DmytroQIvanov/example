import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '@mui/material/Button';
import React from 'react';

import InteractionInputPanel from './InteractionInputPanel';
import ModalSearchPanel from './ModalSearchPanel';
import ModalTable from './ModalTable';

function ModalBody(props: { onClose: () => void }) {
  const { onClose } = props;
  return (
    <div className="h-full w-full overflow-auto rounded-md bg-white scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500">
      <CancelOutlinedIcon
        className="sticky top-3 left-3 z-10 h-8 w-8 cursor-pointer rounded-full hover:bg-teal-700 hover:text-white"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full flex-col gap-4 p-4">
        <InteractionInputPanel />
        <ModalSearchPanel />
        <ModalTable />
        <div className="flex w-full flex-row items-center justify-center py-8">
          <Button
            className="bg-green-600 font-bold text-white"
            variant="contained"
            disableRipple
          >
            Save Interaction
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ModalBody);
