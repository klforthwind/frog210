const Discord = require('discord.js');
const client = new Discord.Client({commandPrefix:''});
const INTERVAL = 1 * 60 * 1000;

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
let live = []

client.once('ready', () => {
	console.log('Ready!');
});

client.on('ready', () => {
	client.setInterval(() => {
		for (let s = 0; s < streamers.length; s++) {
			let stream_info = streamers[s];
			let streamer = stream_info[0];
			let streaming = true;
			if (streaming) {
				if (live.indexOf(streamer) === -1) {
					live.push(streamer);
					let info = "ADwdwad";
				}
			} else if (live.indexOf(streamer) != -1) {
				live.pop(live.indexOf(streamer));
			}
		}
	}, INTERVAL);
});

client.on('message', message => {
	if (message.author === client.user)
		return;
	
	console.log(message.mentions);
});

client.login('redacted');
