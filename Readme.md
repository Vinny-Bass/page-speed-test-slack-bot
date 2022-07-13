## Slack Bot to verify a page speed insights 

This is a simple bot that takes a url, checks if it's valid, and then uses the [google api](https://developers.google.com/speed/docs/insights/v5/get-started) to get page speed insights associated with the url.

To trigger the bot, the user must first install the app in his workspace, once installed, he must use the shortcut ```/page-speed-test```, then the user will be asked to enter the url.

### How to run

If you are in development enviroment, you can use the sockets options as described [here](https://slack.dev/bolt-js/tutorial/getting-started)

Then just type on terminal
```
$ npm install
$ npm run dev
```