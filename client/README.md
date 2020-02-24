# Master-Detail Client

This project is a example to leart the implementation of a Master-Detail.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Configuration

To connect to the Backend Server you need configure a Inverse Proxy.

`/ACCOUNT_SERVER` -> To your server

Unfortunately, I can't do the same with the websockets, that backend server was hardcoded.

## Run

First, you need to install the dependecies. Run the next script in a termal (terminal in Linux or macOS, or powershel in Window).
```bash
npm run install
```

When ths instalation is finished the software is ready to run with the next script:
```bash
npm run start
```

If you change the server default values (`localhost:3000`) you need to change the `proxy.conf.json` file. And in the `app.module.ts` you need change the socket.io configuration url:

```typescript
const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
};
```

## DEPLOY
To deploy in a production client, you need install the dependences, as we see at [RUN](#run) section.

To deploy run the next script:
```bash
npm run build
```

When build finished, the client is located in `dist` folder.

To run the "compilated" client move to the `dist` folder and run the next script:

```bash
node run main.js
```

## UNIT TESTS
The unit tests are implemented in [Jasmine](https://jasmine.github.io/), who is the default testing suit of _Angular_.

To run the test use the next script:
```bash
npm run test
```
