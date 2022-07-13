module.exports = {
  type: "modal",
  callback_id: "modal-page-speed-test",
  title: {
    type: "plain_text",
    text: "Page Speed Test"
  },
  submit: {
    "type": "plain_text",
    "text": "Submit"
  },
  close: {
    type: "plain_text",
    text: "Close"
  },
  blocks: [
    {
      type: "input",
      block_id: 'page_url_input_block',
      element: {
        "type": "plain_text_input",
        "action_id": "page_url_input",
        "focus_on_load": true
      },
      "label": {
        "type": "plain_text",
        "text": "Type a valid URL",
        "emoji": false
      }
    }
  ]
}