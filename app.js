//require('dotenv').config()
const { App } = require('@slack/bolt');
const mongoose = require('mongoose');
const appHome = require('./appHome.js');
const views = require('./views.js');

const { LogLevel } = require("@slack/logger");
const logLevel = LogLevel.DEBUG;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});



//Listens to incoming messages that contain "hello"
app.message('hello', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hi <@${message.user}>, I'm Slook :wave: I can help you create and manage a book club directly in Slack.\n>\`/slook new club\` to create a new book club`
        }
      }
    ]
  });
});


app.event('app_home_opened', async ({ event, context }) => {
  // Display App Home
  const homeView = await appHome.createHome(event.user);

  try {
    const result = await app.client.apiCall('views.publish', {
      token: process.env.SLACK_BOT_TOKEN,
      user_id: event.user,
      view: homeView
    });

  } catch(e) {
    app.error(e);
  }
});


app.action('click_new', async ({ body, ack, say }) => {
  ack();
  let num = Math.floor(Math.random() * 10000);

  let conversationObject = await app.client.conversations.create({
    token: process.env.SLACK_BOT_TOKEN,
    name: "slook" + num
  });

  await app.client.conversations.invite({
    token: process.env.SLACK_BOT_TOKEN,
    channel: conversationObject.channel.id,
    users: body.user.id
  });

  app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: conversationObject.channel.id,
    text: "Yoooo, welcome! Invite friends and when you are ready, type `/book-poll` to get started."
  });

});

app.command('/book-poll', async ({ command, ack, say }) => {
  // Acknowledge command request
  ack();
  //console.log(command);

  let result = await createPoll(command);
  //console.log(result);

  app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: command.channel_id,
    thread_ts: result.message.ts,
    text: "Use this thread to post and vote for books. For example...\n ps. you can delete me if you want."
  });

  function callback() {
    app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: command.channel_id,
      text: "The winner is ALTERED CARBON! @Admin use the /book-schedule command to set the book schedule."
    });
  }

  setTimeout(callback, 10000);

});

async function createPoll(cmdObj) {
  return app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: cmdObj.channel_id,
    blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*BOOK POLL THREAD*"
            }
          }
        ]
  });
}

app.command('/book-schedule', async ({ command, ack, say }) => {
  ack();
  //console.log(command);

  app.client.views.open({
    token: process.env.SLACK_BOT_TOKEN,
    trigger_id: command.trigger_id,
    view: views.viewA
  });
});

(async () => {
  // Start your bolt
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

module.exports = app;
