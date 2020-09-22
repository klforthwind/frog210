import discord
from discord.ext import commands

bot = commands.Bot(command_prefix='')

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    
    if len([member for member in message.mentions if member.name == 'Frogbot']) > 0:
        await message.channel.send('🐸')
    if 'frog' in message.content.lower():
        await message.add_reaction('🐸')

bot.run('token redacted')