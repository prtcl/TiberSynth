import Hashids from 'hashids';

const hashids = new Hashids('tibersynth');
const generateId = () => hashids.encode(Date.now());

export default generateId;
