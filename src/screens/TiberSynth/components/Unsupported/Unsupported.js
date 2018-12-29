import React from 'react';
import Modal from '../../../../components/Modal';
import Text from '../../../../components/Text';
import { SPACING } from '../../../../lib/constants';

export const NAME = 'UNSUPPORTED';
const WIDTH = SPACING * 26;

const Unsupported = props => (
  <Modal {...props} type="error" width={WIDTH}>
    <Text color="white">
      It looks like your web browser doesn&#39;t support the Web Audio API.
      Please use a recent version of Chrome or Safari.
    </Text>
  </Modal>
);

export default Unsupported;
