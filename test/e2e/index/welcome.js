module.exports = {
  "Shows welcome message": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("div")
      .assert.title("kudos")
      .assert.containsText("h2", "Log-in to your account")
      .end();
  },
};
