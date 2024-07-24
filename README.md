<div align=center>
  <h1>Skylight</h1>
  <p>A free, open source Discord bot that makes the moderation job much easier. </p>
</div>    

## Includes: 
- uhhh

## TODO/What's coming
- Logging of moderation action based on the setting
- Configure every setting 
- Button collectors (handling of button presses)
- Parse mute reason/duration
- Every moderation command (ban, kick, modlogs, etc)

### Prerequisites 
- [Node.js](https://nodejs.org/en)
- Developer mode enabled on Discord (Settings --> Advanced --> Toggle on Developer Mode)

# Setup
1. Verify you have [Node.js](https://nodejs.org/en) installed. You can test this by doing `node -v` in your terminal.
2. Create an app in [Discord's Developer Portal](https://discord.com/developers). Save the `APPLICATION ID`, you will need it for later.
3. Go to the side, and click on `Bot`. Configure the username, profile picture, and banner to your liking. Make sure you grab the token. You may have to reset it to see it.
4. Go back to the side, and click on `OAuth2`. Scroll down, and click the `bot` checkbox. Configure the permissions you want the bot to have, and click `Copy` next to the link box. Put the link in your browser to invite the bot to a server of yours.
5. Once the bot is invited to a server of yours, click on the server icon and click `Copy Server ID`, and save it. You will need it for later.
6. Download the bot's source. Navigate it to it in your terminal. Make sure you have `dotenv` installed from Prerequisities. Run `npm i` to grab the packages.
7. If your on Linux, run `cp .env.example src/.env` and `nano .env`. If you are on Windows, go to the folder physically in File Explorer and Copy and Paste the `.env.example` file. Rename that copy to `.env`. Input the `APPLICATION ID`, `Server ID`, and `TOKEN` you have saved earlier. (GUILD_ID is Server ID)
8. If your on Linux, run `cp src/settings.json.example src/settings.json` and configure your settigns. If you are on Windows, go to the folder physically in File Explorer and copy the file named `settings.json.example` and name it `settings.json` and configure your files in a text editor.
8. Run `npm start` in your terminal. Voila! Your bot is now ready.

# Contributing
Contributing is very welcome, as currently, I am the only contributor/maintainer of this project. Just shoot me a PR or message me on [Telegram](https://t.me/aloshTM) if you want to discuss any core changes.


