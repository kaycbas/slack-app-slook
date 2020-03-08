// Pseudocode

app.action('app_installed', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  say(`Hey <@${body.user.id}>! I'm designed to facilitate awesome Slack book clubs. If this is your first time using Slook, I'd reccomend
  reading the brief overview of how I work below. The next step will be to find colleagues who will be interested in joining the book club.
  Click the 'Find Friends' button to do that. And finally you can Create a new book club with the third button.`);
});

app.action('button_click_1', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  // provide an overview of how the app works
  say('');
});

app.action('button_click_2', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  // provide guidance on how to introduce a book club to colleagues
  say('');
});

app.action('button_click_3', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  // asks for book club channel Name
  // creates new private channel with given Name
});

app.action('new_slook_channel created', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  // intro
  // tell users what the available slash commands are
});

app.action('create_a_poll_cmd', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  // Create and intro a poll thread
  // manage an anonymous book poll
});

app.action('schedule_cmd', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  // Check if Admin
  // present admin with control popup for setting schedule, milestone titles, etc.
  // This should be stored somewhere and be editable (either through another slash cmd or a tab or something else)
  // Once schedule is set, post to group
  // create milestone 1 thread
});


app.action('milestone_date_reached', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  // if milestone date reached, create new milestone channel
});
