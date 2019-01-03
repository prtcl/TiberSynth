import React from 'react';
import Modal from '../../../../components/Modal';
import Text from '../../../../components/Text';
import { SPACING } from '../../../../lib/constants';

export const NAME = 'UNSUPPORTED';
const WIDTH = SPACING * 26;

const noWebAudioCopy
  = 'It looks like your web browser doesn\'t support the Web Audio API. Please use a recent version of Chrome or Safari.';

const mobileCopy
  = 'TiberSynth is not designed to work on mobile devices (yet). You can play using Chrome or Safari on desktop, laptop, or iPad.';

const Unsupported = props => (
  <Modal {...props} type="error" width={WIDTH}>
    <Text color="white">{props.isMobile ? mobileCopy : noWebAudioCopy}</Text>
  </Modal>
);

export default Unsupported;
