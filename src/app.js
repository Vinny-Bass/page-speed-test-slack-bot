const { App } = require('@slack/bolt');
const modal = require('./components/modal')
const PageSpeedHandler = require('./pageSpeedHandler')

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.shortcut('page-speed-test', async ({ shortcut, ack, client }) => {
  await ack()

  await client.views.open({
    trigger_id: shortcut.trigger_id,
    view: modal
  });
})

app.view('modal-page-speed-test', async ({ ack, payload, client, body }) => {
  await ack()

  let finalAnswer = ''
  const user = body['user']['id'];

  const pageUrl = payload['state']['values']['page_url_input_block']['page_url_input']['value']

  try {
    const pageSpeedHandler = new PageSpeedHandler()
    finalAnswer = await pageSpeedHandler.getFormatedPageSpeedInsights(pageUrl)
  } catch (err) {
    if (err.message.includes('Quota exceeded')) {
      finalAnswer = 'The consult limit has been reached, try again in a few minutes'
    } else {
      finalAnswer = err.message
    }
  }

  await client.chat.postMessage({
    channel: user,
    text: finalAnswer
  })
})

  ; (async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
  })();