require("dotenv").config({});
const { Client, Intents } = require('discord.js');
const getCryptoPrice = require('./ticker-prices.js');
const currency = require('./utils/formatters.js');
const sleep = require("./utils/sleep.js");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
});

client.once('ready', async () => {
    console.log('We on . . .');
    const guildId = process.env.GUILD_ID;
    const guild = client.guilds.cache.get(guildId);
    const botMember = guild.members.cache.get(client.user.id);

    while (true) {
        try {
            const cryptoTicker = await getCryptoPrice();
            if (!cryptoTicker) continue;

            const p24h = cryptoTicker.usd_24h_change.toFixed(2);

            if (botMember.permissions.has('CHANGE_NICKNAME')) {
                botMember.setNickname(`$${currency(cryptoTicker.usd)} (${p24h >= 0 ? "↗" : "↘"})`)
                    .catch(error => console.error(`Error changing nickname: ${error}`));
            };

            client.user.setActivity(`24h: ${p24h >= 0 ? "+" : ""}${p24h}%`, {
                type: 'WATCHING',
            });
        } catch (error) {
            console.log(`[ERROR]Change status: ${error}`);
        };

        await sleep(1000 * 30);
    };
});

client.login(process.env.BOT_TOKEN);