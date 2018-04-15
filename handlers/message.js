// just return if there is nothing to do, graceful exit of handler
const config = require('../config');
const censored = require('./censorship');
const { getHomeChannelFromMessage } = require('../util');
const command = require('../command');

const messageHandler = message => {
    if (message.author.id === config.discord.id) return;
    if (message.channel.type !== 'text') return;
    if (censored(message)) return;
    if (message.content.startsWith(config.prefix)) getHomeChannelFromMessage(message).send(command(message.content.split(config.prefix)[1], message, message.client));
}

module.exports = messageHandler;