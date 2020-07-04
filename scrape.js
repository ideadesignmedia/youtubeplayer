const express = require('express');
const router = express.Router();
const chrome = require('puppeteer')
globalList = []
const lists = ['PLoQ8_Hx6LYygB06XvNqzZElfzIXI5t4Kh', 'PLoQ8_Hx6LYyiUB4PCRtp4NEHc6fEnI07K', 'PLoQ8_Hx6LYyhltApPxbsMpe_iXMpQVxTZ', 'PLoQ8_Hx6LYyhudkXn1qyogup1AdXzZDUN', 'PLoQ8_Hx6LYyg4AcIH44FgJ0AjLuJ2ednJ', 'PLoQ8_Hx6LYyhxyhFcsGErQoJYyCEyESo0', '/channel/UCJ05uCucbcuCivAjqqBDTvw']
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
getPlaylistItem = function(item){
    return new Promise(async (res, rej) => {
        chrome.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']}).then(async browser =>{
            console.log('launched chrome')
            const page = await browser.newPage();
            await page.goto('https://www.youtube.com/playlist?list=' + item, {waitUntil: 'domcontentloaded'})
            let x = '//*[@id="contents"]'
            await page.waitForXPath(x)
            await delay(100)
            let em = await page.evaluate(()=>{
                return new Promise((res, rej) => {
                    window.scrollTo(2000, 2000)
                    console.log('evaluating page')
                    let anch = document.querySelector('ytd-playlist-sidebar-renderer')
                    let titlelink = anch.querySelector('.yt-simple-endpoint').href
                    let title = anch.querySelector('#title').querySelector('.yt-simple-endpoint').innerHTML
                    let videos = []
                    let them = Array.from(document.querySelector('#contents').querySelector('#contents').querySelectorAll('ytd-playlist-video-renderer'))
                    console.log('total videos found ' + them.length)
                    for (i = 0; i < them.length; i++) {
                        let it = them[i]
                        console.log(it)
                        let image = it.querySelector('img').src
                        if (!image) {
                            let title = it.querySelector('#video-title').title
                            if (title == '[Private video]') {
                                console.log('not suitable')
                            } else {
                                let link = it.querySelector('.yt-simple-endpoint').href
                                let creator = it.querySelector('#metadata').querySelector('.yt-simple-endpoint').innerHTML
                                let creatorlink = it.querySelector('#metadata').querySelector('.yt-simple-endpoint').href
                                if (!link) {
                                    link = '#'
                                }
                                if (!creator) {
                                    creator = 'UNKNOWN'
                                }
                                if (!creatorlink) {
                                    creatorlink = '#'
                                }
                                let video = {
                                    title: title,
                                    image: '',
                                    link: link,
                                    creator: creator,
                                    creatorlink: creatorlink
                                }
                                videos.push(video)                   
                            }
                        } else {
                            let title = it.querySelector('#video-title').title
                            if (title == '[Private video]') {
                                console.log('not suitable')
                            } else {
                                let link = it.querySelector('.yt-simple-endpoint').href
                                let creator = it.querySelector('#metadata').querySelector('.yt-simple-endpoint').innerHTML
                                let creatorlink = it.querySelector('#metadata').querySelector('.yt-simple-endpoint').href
                                if (!link) {
                                    link = '#'
                                }
                                if (!creator) {
                                    creator = 'UNKNOWN'
                                }
                                if (!creatorlink) {
                                    creatorlink = '#'
                                }
                                let video = {
                                    title: title,
                                    image: image,
                                    link: link,
                                    creator: creator,
                                    creatorlink: creatorlink
                                }
                                videos.push(video)                   
                            }
                        }
                    }
                    let data = {
                        title: title,
                        link: titlelink,
                        videos: videos
                    }
                    return res(data)
                })
            })
            await browser.close();
            return res(em)
        }).catch((e) => {
            return rej(e)
        })
    })
}
getChannelItem = function(item){
    return new Promise((res, rej) => {
        chrome.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']}).then(async browser =>{
            const page = await browser.newPage();
            await page.goto('https://youtube.com/' + item, {waitUntil: 'domcontentloaded'})
            let x = '//*[@id="tabsContent"]/paper-tab[2]/div'
            await page.waitForXPath(x)
            let em = await page.evaluate(()=>{
                let that = Array.from(document.getElementsByTagName('paper-tab'))[1]
                return that.click()
            })
            let l = '//*[@id="img"]'
            await page.waitForXPath(l)
            await delay(400)
            let info = await page.evaluate(() => {
                return new Promise((res, rej) => {
                    let arr = []
                    let videos = Array.from(document.querySelectorAll('ytd-grid-video-renderer'))
                    videos.forEach(video => {
                        let that = {
                            link: video.querySelector('#video-title').href,
                            image: video.querySelector('#thumbnail').querySelector('img').src,
                            title: video.querySelector('#video-title').innerHTML,
                            date: video.querySelector('#metadata-line').lastElementChild.previousElementSibling.innerHTML,
                            stats: video.querySelector('#metadata-line').firstElementChild.innerHTML
                        }
                        arr.push(that)
                    })
                    return res(arr)
                })
            })
            await browser.close();
            return res(info)
        }).catch((e) => {
            return rej(e)
        })
    })
}
getLists = function(list) {
    return new Promise(async (res, rej) => {
        for (i= 0; i < list.length; i++) {
            if (/channel/.test(list[i])) {
                await getChannelItem(list[i]).then(result => {
                    if (result) {
                        globalList.push({list: list[i], data: result})
                    } else {
                        globalList.push({list: list[i], data: null})
                    }
                }).catch(e => {
                    console.log(e)
                    globalList.push({list: list[i], data: null})
                })
            } else {
                await getPlaylistItem(list[i]).then(result => {
                    if (result) {
                        globalList.push({list: list[i], data: result})
                    } else {
                        globalList.push({list: list[i], data: null})
                    }
                }).catch(e => {
                    console.log(e)
                    globalList.push({list: list[i], data: null})
                })
            }
        }
        return res(globalList)
    })
}
getLists(lists).then(result => {
    setInterval(() => {
        globalList = []
        getLists(lists).catch(e => {
            console.log(e)
        })
    }, 1000*60*60*12)
}).catch(e => {
    console.log(e)
})
router.get('/', (req, res, next) => {
    res.status(200).json({message: 'START SCRAPING', lists: globalList})
});
router.post('/youtube/playlist', (req, res, next) => {
    let that = globalList.filter(items => {
        return items.list == req.body.page
    })
    if (that.length > 0) {
        if (that[0].data) {
            return res.status(200).json({
                error: false,
                info: that[0].data
            })
        } else {
            getPlaylistItem(req.body.page).then(result => {
                return res.status(200).json({
                    error: false,
                    info: result
                })
            })
        }
    } else {
        console.log('scraping youtube playlist ' + req.body.page)
        chrome.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']}).then(async browser =>{
            console.log('launched chrome')
            const page = await browser.newPage();
            await page.goto('https://www.youtube.com/playlist?list=' + req.body.page, {waitUntil: 'domcontentloaded'})
            let x = '//*[@id="contents"]'
            await page.waitForXPath(x)
            await delay(100)
            let em = await page.evaluate(()=>{
                return new Promise((res, rej) => {
                    window.scrollTo(2000, 2000)
                    console.log('evaluating page')
                    let anch = document.querySelector('ytd-playlist-sidebar-renderer')
                    let titlelink = anch.querySelector('.yt-simple-endpoint').href
                    let title = anch.querySelector('#title').querySelector('.yt-simple-endpoint').innerHTML
                    let videos = []
                    let them = Array.from(document.querySelector('#contents').querySelector('#contents').querySelectorAll('ytd-playlist-video-renderer'))
                    console.log('total videos found ' + them.length)
                    for (i = 0; i < them.length; i++) {
                        let it = them[i]
                        console.log(it)
                        let image = it.querySelector('img').src
                        if (!image) {
                            let title = it.querySelector('#video-title').title
                            if (title == '[Private video]') {
                                console.log('not suitable')
                            } else {
                                let link = it.querySelector('.yt-simple-endpoint').href
                                let creator = it.querySelector('#metadata').querySelector('.yt-simple-endpoint').innerHTML
                                let creatorlink = it.querySelector('#metadata').querySelector('.yt-simple-endpoint').href
                                if (!link) {
                                    link = '#'
                                }
                                if (!creator) {
                                    creator = 'UNKNOWN'
                                }
                                if (!creatorlink) {
                                    creatorlink = '#'
                                }
                                let video = {
                                    title: title,
                                    image: '',
                                    link: link,
                                    creator: creator,
                                    creatorlink: creatorlink
                                }
                                videos.push(video)                   
                            }
                        } else {
                            let title = it.querySelector('#video-title').title
                            if (title == '[Private video]') {
                                console.log('not suitable')
                            } else {
                                let link = it.querySelector('.yt-simple-endpoint').href
                                let creator = it.querySelector('#metadata').querySelector('.yt-simple-endpoint').innerHTML
                                let creatorlink = it.querySelector('#metadata').querySelector('.yt-simple-endpoint').href
                                if (!link) {
                                    link = '#'
                                }
                                if (!creator) {
                                    creator = 'UNKNOWN'
                                }
                                if (!creatorlink) {
                                    creatorlink = '#'
                                }
                                let video = {
                                    title: title,
                                    image: image,
                                    link: link,
                                    creator: creator,
                                    creatorlink: creatorlink
                                }
                                videos.push(video)                   
                            }
                        }
                    }
                    let data = {
                        title: title,
                        link: titlelink,
                        videos: videos
                    }
                    return res(data)
                })
            })
            res.status(200).json({
                error: false,
                info: em
            })
            return await browser.close();
        }).catch((e) => {
            console.log(e)
            return res.status(500).json({message: e, error: true})
        })
    }
})
router.post('/youtube/channel/', (req, res, next) => {
    let that = globalList.filter(items => {
        return items.list == req.body.page
    })
    if (that.length > 0) {
        if (that[0].data) {
            return res.status(200).json({
                error: false,
                info: that[0].data
            })
        } else {
            getChannelItem(req.body.page).then(result => {
                return res.status(200).json({
                    error: false,
                    info: result
                })
            })
        }
    } else {
        console.log('scraping youtube channel ' + req.body.page)
        chrome.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']}).then(async browser =>{
            const page = await browser.newPage();
            await page.goto('https://youtube.com/' + req.body.page, {waitUntil: 'domcontentloaded'})
            let x = '//*[@id="tabsContent"]/paper-tab[2]/div'
            await page.waitForXPath(x)
            let em = await page.evaluate(()=>{
                let that = Array.from(document.getElementsByTagName('paper-tab'))[1]
                return that.click()
            })
            let l = '//*[@id="img"]'
            await page.waitForXPath(l)
            await delay(400)
            let info = await page.evaluate(() => {
                return new Promise((res, rej) => {
                    let arr = []
                    let videos = Array.from(document.querySelectorAll('ytd-grid-video-renderer'))
                    videos.forEach(video => {
                        let that = {
                            link: video.querySelector('#video-title').href,
                            image: video.querySelector('#thumbnail').querySelector('img').src,
                            title: video.querySelector('#video-title').innerHTML,
                            date: video.querySelector('#metadata-line').lastElementChild.previousElementSibling.innerHTML,
                            stats: video.querySelector('#metadata-line').firstElementChild.innerHTML
                        }
                        arr.push(that)
                        
                    })
                    return res(arr)

                })
            })
            
            console.log(JSON.stringify(info))
            console.log(info.length)
            res.status(200).json({error: false, info: info})
            return await browser.close();
        }).catch((e) => {
            console.log(e)
            return res.status(500).json({message: e})
        })
    }
})
router.get('/todayswu', (req, res) => {
    let it = globalList.filter(lists => {
        if (lists.list == 'PLoQ8_Hx6LYyhltApPxbsMpe_iXMpQVxTZ') return lists
    })
    console.log(it)
    if (it.length > 0) {
        return res.status(200).json({video: it[0].data.videos[0]})
    } else {
        return res.status(500).json({error: true})
    }
})
module.exports = router