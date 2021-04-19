import React from 'react';
import { Dialog } from "@material-ui/core";

type Props = {
    imageId: number | null;
    dialogOpened: boolean;
    onClose: () => void;
}

export const ImageDialog = (props: Props) => {
    return (
      <Dialog open={props.dialogOpened} onClose={props.onClose}>
          PLACEHOLDER
      </Dialog>
    );
}