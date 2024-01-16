const axios = require('axios');

const coingeckoQueryParams = {
    ids: [process.env.COIN_SLUG],
    vs_currencies: 'usd',
    include_24hr_change: true,
};

const url = 'https://api.coingecko.com/api/v3/simple/price?';

async function getCryptoPrice() {
    const queryParams = new URLSearchParams(coingeckoQueryParams);
    try {
        const { data } = await axios.get(url + queryParams);
        console.log("getCryptoPrice:", data);
        if (data[process.env.COIN_SLUG]) return data[process.env.COIN_SLUG];
    } catch (error) {
        console.log(`[ERROR]Get Price: ${error}`);
    }
}

module.exports = getCryptoPrice