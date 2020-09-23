import discord
from discord.ext import commands
from twitchapi import is_live, video_info
import asyncio

bot = commands.Bot(command_prefix='')

streamers = [
]
live = []

async def check_live():
    await bot.wait_until_ready() # ensures cache is loaded
    while not bot.is_closed:
        for strim_num in range(len(streamers)):
            strim = streamers[strim_num]
            strimer = strim[0]
            streaming = is_live(strimer)
            if streaming:
                if strimer not in live:
                    live.append(strimer)
                    info = video_info(strimer)
                    embed = discord.Embed(title=f"{strimer} is now live on Twitch!", description=info[0], url=info[1])
                    embed.set_image(url=info[2])
                    if strim_num == 0:
                        await bot.send_message(bot.get_channel(strim[1]), f"{strimer} is live! <@&758132900427726869>", embed=embed)
                    else:
                        await bot.send_message(bot.get_channel(strim[1]), f"{strimer} is live!", embed=embed)
            elif strimer in live:
                live.remove(strimer)

        await asyncio.sleep(60)

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name} with id {bot.user.id}')
    bot.loop.create_task(check_live())

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    
    if len([member for member in message.mentions if member.name == 'Frog210']) > 0:
        await message.channel.send('🐸')
    if 'frog' in message.content.lower():
        await bot.add_reaction(message, '🐸')

    if 'setStreamer' in message.content:
        if len(message.content.split()) == 2 and message.author.server_permissions.administrator:
            streamers.append([message.content.split()[1], message.channel.id])
            await bot.add_reaction(message, '🐸')
            print(streamers)

bot.run('redacted')