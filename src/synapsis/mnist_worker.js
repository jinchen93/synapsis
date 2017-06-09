import MNISTNeuralNetwork from './mnist_neural_network';
import ImportUtil from './import_util';

// BUNDLER:
// webpack src/synapsis/mnist_worker.js static/synapsis/bundle_neural_network.js -w

// Triggerred when another worker attempts to connect
self.addEventListener("connect", function (e) {
  // get port from connection
  var port = e.ports[0];

  // create function callback for when steps occur
  const post = (stats) => {
    port.postMessage(stats);
  };

  // // init network
  // let network = {};
  // // TEMPORARY: initialize network in a try-catch block so
  // // error messages don't die silently

  // listen in on the other thread for when messages are sent
  port.addEventListener("message", function (e) {
    try {
      const importUtil = new ImportUtil(e.data);
      const network = new MNISTNeuralNetwork(post, importUtil);
      network.run();
    } catch (e) {
      port.postMessage(e.stack);
    }

    // port.postMessage("MESSAGE RECEIVED");
    // // Start Network
    // if (e.data === "START") {
    //   network.isRunning = true;
    //   port.postMessage("WORKING");
    // }
    // // Pause Network
    // else if (e.data === "PAUSE") {
    //   network.isRunning = false;
    // }
    // // Reset & Start the network
    // else if (e.data === "RESET") {
    //   network = new MNISTNeuralNetwork(onUpdateStats);
    //   network.isRunning = true;
    // }
  }, false);

  // signal to the other thread that the connection has been made
  port.start();

  // Run the network's listeners in the background.
  // network.run();
}, false);