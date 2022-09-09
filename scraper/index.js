const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var properties = []
  // One page contains 20 properties * 25 = 500 properties
  for(let i = 1; i <= 25; i++) {
    await page.goto(`https://www.sreality.cz/hledani/prodej/byty?strana=${i}`, { waitUntil: 'networkidle0' });
    properties.push(await page.evaluate(() => { 
      let pageProperties = document.getElementsByClassName("property");
      let temp = [];
      for(let i = 0; i < pageProperties.length; i++) {
        // Get all images from property
        let images = pageProperties[i].getElementsByTagName("img");
        let imagesSrc = [];
        // Get all images src expect camera.svg one which is in every property but not needed
        images.forEach(image => image.src !== 'https://www.sreality.cz/img/camera.svg' && imagesSrc.push(image.src));
        temp.push({
          name: pageProperties[i].getElementsByClassName("name")[0].innerText,
          images: imagesSrc,
        });
      }
      return temp;
    }))
  }

  // Flatten array
  properties = properties.flat();

  let propertiesStringify = JSON.stringify(properties);
  fs.writeFile('properties.json', propertiesStringify, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  
  await browser.close();
})();