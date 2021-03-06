import {
  MIN_MOVEMENT_DELAY, MAX_MOVEMENT_DELAY, MIN_STEP_VALUE, MAX_STEP_VALUE,
} from '../constants';

const data = [{
  timestamp: Date.now(),
  coordinates: {
    latitude: 55.7537583,
    longitude: 37.6198118,
  },
}];

const genNewCoordinate = (key) => {
  const lastCoordinate = data[data.length - 1].coordinates[key];
  const getRandomOperation = () => (Math.floor(Math.random() * 2) === 0 ? '-' : '+');
  const getRandomStep = () => MIN_STEP_VALUE
  + (Math.random() * MAX_STEP_VALUE - MIN_STEP_VALUE);
  const newCoordinate = getRandomOperation() === '-'
    ? lastCoordinate - getRandomStep()
    : lastCoordinate + getRandomStep();
  return parseFloat(newCoordinate.toFixed(7));
};

const genRequestDelay = () => MIN_MOVEMENT_DELAY
      + (Math.random() * MAX_MOVEMENT_DELAY - MIN_MOVEMENT_DELAY);

const genData = (id) => {
  data.push({
    id,
    timestamp: Date.now(),
    coordinates: {
      latitude: genNewCoordinate('latitude'),
      longitude: genNewCoordinate('longitude'),
    },
  });
  return data.filter(({ id: itemId }) => itemId === id);
};

const createObjectsMock = (mock) => {
  mock
    .onGet(/\/api\/v1\/objects\/\d*\/movements/)
    .reply(({ url }) => new Promise((resolve) => {
      const id = url.match(/objects\/(\d*)\/movements/)[1];
      setTimeout(() => {
        resolve([200, genData(id)]);
      }, genRequestDelay());
    }));
};
export default createObjectsMock;

const dataForTests = [
  {
    timestamp: 1625483071276,
    coordinates: {
      latitude: 55.7537583,
      longitude: 37.6198118,
    },
  }, {
    timestamp: 1625485071456,
    coordinates: {
      latitude: 55.7537122,
      longitude: 37.6198234,
    },
  }, {
    timestamp: 1625453371124,
    coordinates: {
      latitude: 55.7537523,
      longitude: 37.6198345,
    },
  },
];

export { dataForTests };
