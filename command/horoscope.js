const { RichEmbed } = require('discord.js');
const { emoji, shuffleArray } = require('../util');

const horoscope = message => {
    const e = shuffleArray(emoji);
    return new RichEmbed()
        .setDescription(`Let's take a look at what your future holds for you... Hmm...\n`)
        .addField('Outlook for Tomorrow', e[0], true)
        .addField('Love Life', e[1], true)
        .addField('Luck', e[2], true)
        .setFooter(`Emoji Horoscope for ${message.member.nickname ? message.member.nickname + ` (${message.author.username})` : message.author.username}`, message.author.avatarURL)
        .setTimestamp(new Date());
};

module.exports = horoscope;
