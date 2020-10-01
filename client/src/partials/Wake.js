import BumbleBee from 'bumblebee-hotword';

const Edison_Wake = new BumbleBee();

Edison_Wake.setWorkersPath('./bumblebee-workers');
Edison_Wake.addHotword('hey_edison')
Edison_Wake.setHotword('hey_edison');
Edison_Wake.setSensitivity(0.5);

export default Edison_Wake;