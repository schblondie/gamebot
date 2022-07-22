/**
 * @file Context menu (type:type) interaction: User avatar * @since 1.0.0
*/

module.exports = {
  data: {
    name: 'User avatar',
    type: 2
    // 2 is for user context menus
    // 3 is for message context menus
  },
  /**
   * @description Executes when the context option with name "Tools" is clicked.
   * @param {Object} interaction The Interaction Object of the command.
   */
  async execute (interaction) {
    return null
  }
}
