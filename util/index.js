const { RichEmbed } = require('discord.js');
const moment = require('moment');
const config = require('../config');
const censorship = require('./censorship');
const emoji = require('./emoji');
const fp = require('./fp');

const notification = message => {
    return new RichEmbed()
        .setTitle('🚨 Funny Alert 🚨')
        .addField('User', message.author + `\n${message.author.username + '#' + message.author.discriminator}`, true)
        .addField('Channel', message.channel + `\n#${message.channel.name}`, true)
        .addField('Message', message.cleanContent)
        .setTimestamp(new Date());
}

const userInfo = (user, title) => new RichEmbed()
    .setTitle(`${title ? title : 'Info'}: @${user.user.username + '#' + user.user.discriminator}`)
    .setDescription(user, true)
    .addField('Created On', moment(user.user.createdAt).utc().format('MMMM Do YYYY, h:mm a'), true)
    .addField('Joined On', moment(user.joinedAt).utc().format('MMMM Do YYYY, h:mm a'), true)
    .addField('Roles', user.roles.array().join(' '))
    .setColor('#84c08b')
    .setTimestamp(new Date())
    .setThumbnail(user.user.displayAvatarURL)

const simpleEmbed = (user, message) => new RichEmbed()
    .setTitle(message)
    .addField('User', user.username + '#' + user.discriminator)
    .setThumbnail(user.displayAvatarURL);


// "True" shuffle of an array (Knuth-Fisher-Yates shuffle)
const shuffleArray = array => {
    let currentIndex = array.length;
    let temp;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
};

const field = (name, value, inline) => { return { name, value, inline }; };

const wordIn = (array, text) => array.some(word => text.includes(word));

const getHomeChannel = (client, guildBlock) => {
    if (!guildBlock) {
        return {
            send: () => {
                console.error('Error: Attempted to send a message to server with no home channel. Update your configs.');
            }
        }
    }
    const channel = client.channels.get(guildBlock.home);
    if (channel) return channel;

}
const getHomeChannelFromMessage = message => getHomeChannel(message.client, config.discord.guilds[message.guild.id]);
const getHomeChannelFromMember = member => getHomeChannel(member.client, config.discord.guilds[member.guild.id]);
const getHomeChannelFromGuild = guild => getHomeChannel(guild.client, config.discord.guilds[guild.id]);

module.exports = {
    censorship,
    field,
    emoji,
    getHomeChannelFromGuild,
    getHomeChannelFromMember,
    getHomeChannelFromMessage,
    fp,
    notification,
    userInfo,
    simpleEmbed,
    shuffleArray,
    wordIn
};
