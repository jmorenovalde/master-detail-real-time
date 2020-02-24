# Master-Detail Server

A simple server to implements a simple API REST and a simle Websocket Service.

This server is implemented by [NestJS](https://nestjs.com/).

To show the information of the API REST (and test it) you can access to the [swagger page](http://localhost:3000/api).

Default Configuration:
* _Port_: __3000__
* _Swagger page_: `http://localhost:`__port__/__api__
* _API REST Path_: __api/v1__

## API RETS
The API REST it implements in the 'api/v1' path. For this example only have to GET services. For more information show the swagger documentation.

## WEBSOCKET
The socket sends the exchange rate of the bitcoin to the dollar every 15 seconds. When the socket client connects, the browser sends to de client a `new-rate` message.

The WebSocket server is implemented at `app.gateway.ts` file. To send the message every _15 seconds_, an interval (`@INTERVAL`) is implemented to do it. In this interval, a function is implemented to _simulate_ the changing of the value of the _exchange rate_. This function only returns only _three available values_, to increase the possibility to repeat the value exchange rate between intervals tick.

## RUN
First, you need to install the dependecies. Run the next script in a termal (terminal in Linux or macOS, or powershel in Window).
```bash
npm run install
```

When ths instalation is finished the software is ready to run with the next script:
```bash
npm run start
```

## DEPLOY
To deploy in a production server, you need install the dependences, as we see at [RUN](#run) section.

To deploy run the next script:
```bash
npm run build
```

When build finished, the server is located in `dist` folder.

To run the "compilated" server move to the `dist` folder and run the next script:

```bash
node run main.js
```

## UNIT TESTS
The unit tests are implemented in [JEST](https://jestjs.io/), who is the default testing suit of _NestJS_.

To run the test use the next script:
```bash
npm run test
```