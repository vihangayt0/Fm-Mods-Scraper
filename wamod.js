const axios = require('axios')
const cheerio = require('cheerio')

async function mods() {
	return new Promise((resolve, reject) => {
    const list = []
    axios.get("https://fmmods.com/download-center/mega.php").then(urlResponse => {
        const $ = cheerio.load(urlResponse.data)
        $('div.su-button-center').each((i,element)=> {
            const link = $(element).find("a").attr("href");
            list.push({
                name: link.split('/')[4].replace('.', '_').replace('_apk', '.apk'),
                link: link
            });
        })
        const result = {}
        result.com_whatsapp = list && list[0] ? list[0] : undefined
        result.com_fmwhatsapp = list && list[1] ? list[1] : undefined
        result.com_gbwhatsapp = list && list[2] ? list[2] : undefined
        result.com_yowhatsapp = list && list[3] ? list[3] : undefined
        
        
        resolve(result)})
    })
}

module.exports = { mods }
