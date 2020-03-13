const app = require('./app.js');


const updateView = async (user) => {
      // Setup the block
      let blocks = [{
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Hi <@${user}>, I'm Slook :wave: I can help you create and manage a book club directly in Slack.`
			}
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: "Create a New Book Club",
						emoji: true
					},
					value: "click_new",
          action_id: "click_new"
				},
				{
					type: "button",
					text: {
						type: "plain_text",
						text: "Get Help",
						emoji: true
					},
					value: "click_help"
				}
			]
		}
  ];

  // The final view -
  let view = {
    type: 'home',
    callback_id: 'home_view',
    title: {
      type: 'plain_text',
      text: 'Keep notes!'
    },
    blocks: blocks
  };

  return JSON.stringify(view);
};


/* Display App Home */
const createHome = async(user, data) => {

  const userView = await updateView(user);

  return userView;
};

module.exports = { createHome };
