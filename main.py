import discord
from discord.ext import commands
from twitchapi import is_live

bot = commands.Bot(command_prefix='')

streamers = list()
live = []

async def check_live():
    await bot.wait_until_ready() # ensures cache is loaded
    while not bot.is_closed():
        for strim_num in range(len(streamers)):
            strim = streamers[strim_num]
            strimer = strim[0]
            streaming = is_live(strimer)
            if streaming:
                if strimer not in live:
                    live.append(strimer)
                    await strim[1].send(f"{strimer} is live!")
            elif strimer in live:
                live.remove(strimer)

        await asyncio.sleep(60)

@bot.event
async def on_ready():
    print(f'Logged in as {client.user.name} with id {client.user.id}')
    bot.loop.create_task(check_live())

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    
    if len([member for member in message.mentions if member.name == 'Frog210']) > 0:
        await message.channel.send('🐸')
    if 'frog' in message.content.lower():
        await message.add_reaction('🐸')

    if 'setStreamer' in message:
        if len(message.split()) == 2 and message.member.hasPermission("MUTE_MEMBERS"):
            streamers.append([message.split()[1], message.channel])
            print(streamers)

bot.run('token redacted')