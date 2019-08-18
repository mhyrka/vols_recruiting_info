const puppeteer = require("puppeteer")
const fs = require("fs")
const fastcsv = require("fast-csv")

const years = [
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019"
]
// const years = ["2009"]

async function run(year) {
  const browser = await puppeteer.launch({
    args: ["--incognito"]
  })
  // const browser = await puppeteer.launch({ headless: false })
  try {
    const page = await browser.newPage()
    const url = `https://247sports.com/college/tennessee/Season/${year}-Football/Commits/`
    await page.goto(url, {
      waitUntil: "networkidle0"
    })

    await page.screenshot({
      path: `screenshots/vols-${year}-247.png`,
      fullPage: true
    })
    const CLOSE_POPUP = `div[id^="lightbox-"] > div`
    const PLAYER_SELECTOR = `#page-content > div.main-div.clearfix > section.ri-page > section > div > ul > li:nth-child(INDEX) > div.wrapper > div.recruit > a`
    const POSITION_SELECTOR = `#page-content > div.main-div.clearfix > section.ri-page > section > div > ul > li:nth-child(INDEX) > div.wrapper > div.position`
    const STAR_SELECTOR = `#page-content > div.main-div.clearfix > section.ri-page > section > div > ul > li:nth-child(INDEX) > div.wrapper > div.rating > div.ri-page__star-and-score`
    const METRICS_SELECTOR = `#page-content > div.main-div.clearfix > section.ri-page > section > div > ul > li:nth-child(INDEX) > div.wrapper > div.metrics`
    const COMPOSITE_SELECTOR = `#page-content > div.main-div.clearfix > section.ri-page > section > div > ul > li:nth-child(INDEX) > div.wrapper > div.rating > div.ri-page__star-and-score > span.score`

    const LENGTH_SELECTOR_CLASS = `ri-page__list-item`

    let popup = await page.evaluate(sel => {
      return new Promise(resolve => resolve(document.querySelector(sel)))
    }, CLOSE_POPUP)

    if (popup) {
      page.click(popup)
    }

    let listLength = await page.evaluate(sel => {
      return document.getElementsByClassName(sel).length
    }, LENGTH_SELECTOR_CLASS)

    let data = []

    for (let i = 2; i <= listLength; i++) {
      let playerSelector = PLAYER_SELECTOR.replace("INDEX", i)
      let positionSelector = POSITION_SELECTOR.replace("INDEX", i)
      let starSelector = STAR_SELECTOR.replace("INDEX", i)
      let metricsSelctor = METRICS_SELECTOR.replace("INDEX", i)
      let compositeSelector = COMPOSITE_SELECTOR.replace("INDEX", i)

      let player_name = await page.evaluate(sel => {
        let element = document.querySelector(sel)
        return element ? element.innerHTML : null
      }, playerSelector)

      let player_position = await page.evaluate(sel => {
        let element = document.querySelector(sel)
        return element ? element.innerHTML : null
      }, positionSelector)

      let player_starCount = await page.evaluate(sel => {
        let element = document.querySelector(sel)
        if (element) {
          element = element.children
          let array = Array.from(element)
          let stars = 0
          array.forEach(el => {
            if (el.className === "icon-starsolid yellow") {
              stars++
            }
            return stars
          })
          return stars
        } else {
          return "N/A"
        }
      }, starSelector)

      let player_metrics = await page.evaluate(sel => {
        let element = document.querySelector(sel)
        return element ? element.innerHTML : null
      }, metricsSelctor)

      let player_composite = await page.evaluate(sel => {
        let element = document.querySelector(sel)
        return element ? element.innerHTML : null
      }, compositeSelector)

      data.push({
        name: player_name,
        position: player_position,
        stars: player_starCount,
        metrics: player_metrics,
        composite: player_composite,
        recruiting_class: year
      })
    }

    return new Promise((resolve, reject) => {
      resolve(data)
    })
  } catch (err) {
    console.log("Error: " + err.message)
    console.trace()
  } finally {
    browser.close()
  }
}

const writeData = async arr => {
  for (const year of arr) {
    fastcsv
      .write(await new Promise(resolve => resolve(run(year))), {
        headers: true
      })
      .pipe(fs.createWriteStream(`./data/__${year}_player_data.csv`))
  }
  // fastcsv
  //   .write(await new Promise(resolve => resolve(run(year))), {
  //     headers: true
  //   })
  //   .pipe(fs.createWriteStream(`./data/2018_player_data.csv`))
}

const writeMasterCSV = async arr => {
  let data = []
  for (const year of arr) {
    data.push(await new Promise(resolve => resolve(run(year))))
  }
  fastcsv
    .write(await new Promise(resolve => resolve(data)), {
      headers: true
    })
    .pipe(fs.createWriteStream(`./data/master_recruiting_list.csv`))
}

// writeData(years)
writeMasterCSV(years)
// fastcsv.write(await data, { headers: true }).pipe(fs.createWriteStream(`./data/${item}_player_data.csv`))
