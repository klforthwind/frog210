const Discord = require('discord.js')
const client = new Discord.Client({commandPrefix:''})
const INTERVAL = 1 * 60 * 1000
const api = require("./api")

let streamers = [
    ['jjdb210', '702181653958623398'], 
    ['beta64', '702181654688694336'], 
    ['Silverdown', '702181654688694336'], 
    ['MadSpyke_', '702181654688694336'], 
    ['Pixel_Wave', '702181654688694336'],
    ['NinjaWeaselPlays', '702181654688694336'],
    ['davidvkimball', '702181654688694336'],
    ['Penguinian', '702181654688694336'],
    ['CWAlasia', '702181654688694336'],
    ['klforthwind', '702181654688694336'],
    ['cheppy4444dude', '702181654688694336'],
    ['Madman10769', '702181654688694336'],
    ['Strawberry_Bunni', '702181654688694336'],
    ['TartChipmunk', '702181654688694336'],
]

client.once('ready', () => {
	console.log('Ready!');
});

client.on('ready', () => {
	console.log(`Logged in as Frog210 with id ${client.user.id}`)
	client.setInterval(() => {
		for (let s = 0; s < streamers.length; s++) {
			let stream_info = streamers[s]
			let streamer = stream_info[0]
			api.notif_if_live(streamer, client.channels.cache.get(stream_info[1]), s)
		}
	}, INTERVAL)
})

client.on('message', message => {
	if (message.author === client.user)
		return;
	
	if (message.mentions.has(client.user))
		message.channel.send('🐸')
	if (message.content.toLowerCase().includes('frog'))
		message.react('🐸')

	if (message.content.contains('setStreamer')) {
		if (message.content.split(" ").length == 2 && message.author.server_permissions.administrator) {
			streamers.append([message.content.split(" ")[1], message.channel.id])
            console.log(streamers)
            message.react('🐸')
		}
	}

})

client.login('redacted')
