const puppeteer = require('puppeteer');
const filesystem = require('fs');
/*
# async => são funções assincronas
# await =>  é usado em funções async
*/
// (...  )() é uma função auto executavel.
(async () => {
    // abre o navegador
    const browser = await puppeteer.launch({
        // quando o headless está como false ele ira abrir o navegador de forma visual
        // quando está como true ira fazer todo o processo sem abir a interface grafica do navegador
        headless: false

    });

    //abre uma nova aba
    const page = await browser.newPage();

    await page.setViewport({
        width: 1366,
        height: 768,
        deviceScaleFactor: 1,
    });

    // passa o link para o navegador
    await page.goto('https://shopee.com.br/flash_sale?fromItem=5795868001&promotionId=105450022608896');
  /*
    // tira um print da tela
    # await page.screenshot({path: 'homeShopee.png'})
  */

    // waitForSelector espera que o elemento passado esteja disponivel
    await page.waitForSelector("#main > div > div:nth-child(4) > div > div > div > div.page-flash-sale__main > div:nth-child(2) > div.VUCDM7 > div");
    
    // evaluate espera uma função onde ela executa dentro da DOM do site
    const promotionList = await page.evaluate(() => {

        const nodeList = document.querySelectorAll(
            "#main > div > div:nth-child(4) > div > div > div > div.page-flash-sale__main > div:nth-child(2) > div.VUCDM7 > div"
        );

        const posts = [...nodeList];

        const promotionlist = posts.map(card => ({
            post: {
                title: card.innerText.split('\n')[0],
                priceOriginal: card.innerText.split('\n')[1],
                priceDiscount: card.innerText.split('\n')[2],
                discount: card.innerText.split('\n')[5]
            }
        }));

        return promotionlist
    })

    // filesystem
    filesystem.writeFile('shoppePromotion.json', JSON.stringify(promotionList, null, 2), erro => {
        if (erro) throw new Error('something went wrong')
        console.log('well done!')
    })
    //encerra a execusão do navegador
    await browser.close();

})();