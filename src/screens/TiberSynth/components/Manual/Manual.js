import React from 'react';
import Modal from '../../../../components/Modal';
import Text from '../../../../components/Text';

export const NAME = 'MANUAL';

const Manual = props => (
  <Modal {...props}>
    <Text color="white">
      We should write a manual for TiberSynth here that describes how to play it
      and why.
    </Text>
  </Modal>
);

export default Manual;
