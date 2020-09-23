import discord
from discord.ext import commands
from twitchapi import is_live

bot = commands.Bot(command_prefix='')

streamers = list()
live = []

async def check_live():
    await client.wait_until_ready() # ensures cache is loaded
    while not client.is_closed():
        for strim_num in range(len(streamers)):
            strim = streamers[strim_num]
            strimer = strim[0]
            streaming = is_live(strimer)
            if streaming:
                if strimer not in live:
                    live.append(strimer)
                    msg = f"{strimer} is live!"
                    await strim[1].send(msg)
            elif strimer in live:
                live.remove(strimer)

        await asyncio.sleep(60)

@client.event
async def on_ready():
    print(f'Logged in as {} with id {}'%(client.user.name, str(client.user.id)))
    client.loop.create_task(check_live())

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    
    if len([member for member in message.mentions if member.name == 'Frogbot']) > 0:
        await message.channel.send('🐸')
    if 'frog' in message.content.lower():
        await message.add_reaction('🐸')

    if 'setStreamer' in message:
        if len(message.split()) == 2 and message.member.hasPermission("MUTE_MEMBERS"):
            streamers.append([message.split()[1], message.channel])
            print(streamers)

bot.run('token redacted')