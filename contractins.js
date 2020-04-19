import web3 from './web3';
import Donations from './build/Donations.json';

const instance = new web3.eth.Contract(
    JSON.parse(Donations.interface),
    '0x60Ef682f284374CeA433df065d1B6eAFaf89d079'
);
export default instance;