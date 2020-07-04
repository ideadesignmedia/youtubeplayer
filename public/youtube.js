class YouTube2 extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:'open'})
        this.distance = 0
        this.distance2 = 0
    }
    connectedCallback(){
        this.style.maxWidth = '100%'
        this.shadow.innerHTML = `<style>
        .hidden {
            display: none!important;
        }
        #YTC {
            width: 100%;
            height: auto;
            position: relative;
            background-color: white;
            z-index: 1;
            max-width: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            top: 0px;
            left: 0px;
            display: grid;
            grid-template-columns: 1fr;
        }
        #YTC::-webkit-scrollbar {
            display: none;
        }
        #close {
            position: fixed;
            z-index: 250;
            top: 30px;
            right: 30px;
            background-color: #9abc48;
            color: white;
            text-shadow: 1px 2px 3px black;
            box-shadow: 2px 2px 3px #9abc4860;
            cursor: pointer;
            font-size: 1.8rem;
            padding: 10px;
            border-radius: 50px;
            transition: 400ms ease;
            display: none;
        }
        #close:hover {
            background-color: black;
            color: #9abc48;
            transition: 400ms ease;
            transform: scale(1.1,1.1);
        }
        #holdcircle {
            max-width: 100%;
            position: fixed;
            bottom: 50px;
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        #title {
            font-size: 1rem;
            color: black;
            text-align: center;
            height: 100px;
            max-height: 100px;
            margin: 0px;
            padding: 0px;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 100%;
        }
        #yt {
            max-width: 50%;
            width: 50%;
            padding: 7px;
            height: 70px;
            background-color: #ededed;
            border-radius: 150px;
            cursor: pointer;
        }
        .watch{
            text-decoration: none;
            color: #9abc48;
            background-color: black;
            border-radius: 50px;
            margin: 5px;
            font-size: 1.2rem;
            text-align: center;
            transition: 200ms ease;
            padding: 10px;
            cursor: pointer;
        }
        a {
            text-decoration: none;
        }
        #meta {
            font-size: .6rem;
        }
        .watch:hover {
            color: white;
            background-color: #9abc48;
            transition: background-color: 400ms ease;
        }
        #list {
            width: 100%;
            height: auto;
            max-height: 65vh;
            max-width: 100%;
            overflow-x: scroll;
            overflow-y: hidden;
            padding: 10px;
            margin: 0px;
            background-color: white;
            display: grid;
            grid-template-columns: 33% 33% 33% 33% 33% 33% 33% 33% 33%;
            grid-template-rows: 1fr 1fr 1fr;
            border-radius: 8px;
        }
        #recentList {
            width: 100%;
            height: auto;
            max-height: 65vh;
            max-width: 100%;
            overflow-x: scroll;
            overflow-y: hidden;
            padding: 10px;
            margin: 0px;
            background-color: white;
            display: grid;
            grid-template-columns: 33% 33% 33% 33% 33% 33% 33% 33% 33%;
            grid-template-rows: 1fr;
            border-radius: 8px;
        }
        #list::-webkit-scrollbar {
            display: none;
        }
        #recentList::-webkit-scrollbar {
            display: none;
        }
        img {
            border-radius: 8px;
            cursor: default;
            max-width: 100%;
        }

        .iHold {
            width: auto;
            max-width: 100%;
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            height: auto;
            overflow: hidden;
            margin: 5px 0px;
            padding: 10px;
        }
        .title {
            font-size: 1rem;
            text-transform: uppercase;
            padding: 10px;
            color: black;
            margin: 0px;
            margin-bottom: 5px;
            margin-left: 5px;
            border-radius: 8px;
            cursor: default;
            text-align: left;
        }
        .meta {
            text-align: left;
            font-size: .6rem;
            cursor: default;
        }

        @media screen and (max-width: 700px) {
            .iHold {
                max-height: 100%;
                text-align: center!important;
            }
            .title {
                font-size: .8rem;
                margin: 0px;
            }
            .meta {
                font-size: .5rem;
            }
            .watch {
                font-size: .7rem;
            }
            .creator {
                font-size: .7rem;
                cursor: pointer;
                display: none;
            }
            .creator:hover {
                color: #9abc48;
            }
        }
        #menu {
            width: 100%;
            max-width: 100%;
            position: fixed;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            max-height: 30%;
            border-radius: 8px;
        }
        #menu::-webkit-scrollbar {
            background-color: #9abc48;
        }
        .togb {
            width: 100%;
            height: 50px;
            text-align: center;
            align-items: center;
            margin: 0px;
            padding: 0px;
            color: white;
            font-size: 1rem;
            text-shadow: 1px 1px 3px black;
            cursor: pointer;
            transition: 300ms ease;
        }
        .togb:hover {
            background-color: black;
            color: #9abc48;
            transition: 300ms ease;
        }
        .i {
            background-color: #9abc48;
        }
        .a {
            background-color: black;
            color: #9abc48;
        }
        .lHold {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            max-width: 100%;
            padding: 0px;
            margin: 0px;
            overflow: hidden;
        }
        .hHold {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 100%;
            width: 100%;
            margin: 10px 0px;
        }
        .label {
            width: 90%;
            font-size: .9rem;
        }
        @media screen and (max-width: 650px) {
                vid-sect {
                    padding: 0px!important;
                }
            #menu {
                bottom: 0px;
                left: 0px;
                grid-template-rows: 1fr;
                overflow-y: hidden;
                overflow-x: scroll;
                max-width: 100%;
                width: 100%;
                max-height: 12%;
                grid-gap: 10px;
                background-color: black;
            }
            .togb {
                font-size:15px;
                align-items: center
                padding: 10px;
                margin: 10px;
                border-radius: 8px;
                box-shadow: 1px 2px 5px #9abc4860;
            }
            #close {
                padding: 8px;
                font-size: 18px;
                top: 5px;
                right: 5px;
            }
            #list {
                grid-template-columns: 100% 100% 100% 100% 100% 100% 100% 100% 100%;
            }
            #recentList {
                grid-template-columns: 100% 100% 100% 100% 100% 100% 100% 100% 100%;
            }
            #toggle1 {
                display: none!important;
            }
            #toggle2 {
                display: none!important;
            }
            #toggle3 {
                display: none!important;
            }
            #toggle4 {
                display: none!important;
            }
        }
        @media screen and (min-width: 650px){
            #menu {
                bottom: 0px;
                left: 0px;
                overflow-y: hidden;
                overflow-x: scroll;
            }
        }
        #toggle1 {
            position: relative;
            z-index: 100;
            cursor: pointer;
            background-color: #9abc48;
            color: white;
            text-shadow: 1px 1px 3px black;
            font-weight: 800;
            font-size: 1rem;
            box-shadow: 1px 1px 2px black;
            text-align: center;
            padding: 10px;
            border-radius: 100px;
            margin: 3px;
        }
        #toggle2 {
            position: relative;
            z-index: 100;
            cursor: pointer;
            background-color: #9abc48;
            color: white;
            text-shadow: 1px 1px 3px black;
            font-weight: 800;
            font-size: 1rem;
            box-shadow: 1px 1px 2px black;
            text-align: center;
            padding: 10px;
            border-radius: 100px;
            margin: 3px;
        }
        #toggle3 {
            position: relative;
            z-index: 100;
            cursor: pointer;
            background-color: #9abc48;
            color: white;
            text-shadow: 1px 1px 3px black;
            font-weight: 800;
            font-size: 1rem;
            box-shadow: 1px 1px 2px black;
            text-align: center;
            padding: 10px;
            border-radius: 100px;
            margin: 3px;
        }        
        #toggle4 {
            position: relative;
            z-index: 100;
            cursor: pointer;
            background-color: #9abc48;
            color: white;
            text-shadow: 1px 1px 3px black;
            font-weight: 800;
            font-size: 1rem;
            box-shadow: 1px 1px 2px black;
            text-align: center;
            padding: 10px;
            border-radius: 100px;
            margin: 3px;
        }
        </style>
        <div id="YTC">
            <div id="close">CLOSE</div>
            <div id="menu">
                <div class="togb i" id="jasonplaylist" link="PLoQ8_Hx6LYygB06XvNqzZElfzIXI5t4Kh">JASON</div>
                <div class="togb i" id="scotplaylist" link="PLoQ8_Hx6LYyiUB4PCRtp4NEHc6fEnI07K">SCOT</div>
                <div class="togb i" id="wakeupplaylist" link="PLoQ8_Hx6LYyhltApPxbsMpe_iXMpQVxTZ">WAKEUP</div>
                <div class="togb i" id="womensplaylist" link="PLoQ8_Hx6LYyhudkXn1qyogup1AdXzZDUN">WOMEN'S MINISTRY AM</div>
                <div class="togb i" id="womensplaylist2" link="PLoQ8_Hx6LYyg4AcIH44FgJ0AjLuJ2ednJ">WOMEN'S MINISTRY PM</div>
                <div class="togb i" id="childrensplaylist" link="PLoQ8_Hx6LYyhxyhFcsGErQoJYyCEyESo0">CHILDREN'S MINISTRY</div>
                <div class="togb a" id="lwchannel" link="/channel/UCJ05uCucbcuCivAjqqBDTvw">ALL VIDEOS</div>
            </div>
            <div id="title"><div id="yt"></div></div>
            <div id="errors"></div>
            <vid-sect image1="/static/gin/LWMain.jpg" image2="/static/gin/pgifmid.gif" sermonname1="Scot's Title" sermonlink1="xZ-IdAwSook" sermonname2="Jason's Title" sermonlink2="yz3HeHlX40Y"></vid-sect>
            <div class="hHold">
                <div class="label">Popular Sermons</div>
                <div class="lHold">
                    <div id="toggle3"><</div>
                    <div id="recentList"></div>
                    <div id="toggle4">></div>
                </div>
            </div>
            <div class="hHold">
                <div id="current" class="label">Current List</div>
                <div class="lHold">
                    <div id="toggle1"><</div>
                    <div id="list"></div>
                    <div id="toggle2">></div>
                </div>
            </div>
            <div id="holdcircle" style="margin-bottom: 100px;"></div>
        </div>`
        setTimeout(() => {
            this.fillPopular()
            this.checkClicks()
        }, 400)
        let yt = this.shadow.querySelector('#yt')
        var youtube = bodymovin.loadAnimation({
            container: yt,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            hideOnTransparent: false,
            path: '/static/gin/youtubelogo.json'
        })
        yt.addEventListener('click', () => {
            console.log('click')
            youtube.goToAndPlay(0)
            window.location = 'https://www.youtube.com/channel/UCJ05uCucbcuCivAjqqBDTvw'
        })
        let tog1 = this.shadow.querySelector('#toggle1')
        let tog2 = this.shadow.querySelector('#toggle2')
        let tog3 = this.shadow.querySelector('#toggle3')
        let tog4 = this.shadow.querySelector('#toggle4')
        tog1.addEventListener('click', (e) => {
            if (window.innerWidth < 650) {
                console.log('mini')
            } else {
                if (this.distance === 0) {
                    try {
                        this.shadow.querySelector('#eight').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                        this.distance = 9
                    } catch {
                        this.distance = 9
                    }
                } else if (this.distance === 3) {
                    this.shadow.querySelector('#zero').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance = 0
                } else if (this.distance === 6) {
                    this.shadow.querySelector('#two').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance = 3
                } else if (this.distance === 9) {
                    this.shadow.querySelector('#five').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance = 6
                }
            }
        })
        tog2.addEventListener('click', (e) => {
            if (window.innerWidth < 650) {
                console.log('mini')
            } else {
                if (this.distance === 0) {
                    this.shadow.querySelector('#three').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance = 3
                } else if (this.distance === 3) {
                    this.shadow.querySelector('#five').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance = 6
                } else if (this.distance === 6) {
                    try {
                        this.shadow.querySelector('#eight').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                        this.distance = 9
                    } catch {
                        this.distance = 9
                    }
                } else if (this.distance === 9) {
                    this.shadow.querySelector('#zero').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance = 0
                }
            }
        })
        tog3.addEventListener('click', () => {
            if (window.innerWidth < 650) {
                console.log('mini')
            } else {
                if (this.distance2 === 0) {
                    try {
                        this.shadow.querySelector('#p8').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                        this.distance2 = 9
                    } catch {
                        this.distance2 = 9
                    }
                } else if (this.distance2 === 3) {
                    this.shadow.querySelector('#p0').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance2 = 0
                } else if (this.distance2 === 6) {
                    this.shadow.querySelector('#p2').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance2 = 3
                } else if (this.distance2 === 9) {
                    this.shadow.querySelector('#p5').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance2 = 6
                }
            }
        })
        tog4.addEventListener('click', () => {
            if (window.innerWidth < 650) {
                console.log('mini')
            } else {
                if (this.distance2 === 0) {
                    this.shadow.querySelector('#p3').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance2 = 3
                } else if (this.distance2 === 3) {
                    this.shadow.querySelector('#p5').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance2 = 6
                } else if (this.distance2 === 6) {
                    try {
                        this.shadow.querySelector('#p8').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                        this.distance2 = 9
                    } catch {
                        this.distance2 = 9
                    }
                } else if (this.distance2 === 9) {
                    this.shadow.querySelector('#p0').scrollIntoView({block: 'nearest', inline: 'start', behavior: 'smooth'})
                    this.distance2 = 0
                }
            }
        })
        let those = Array.from(this.shadow.querySelectorAll('.togb'))
        those.forEach(that => {
            that.addEventListener('click', (e)=>{
                let circle = this.shadow.querySelector('#holdcircle')
                if (circle.classList.contains('hidden') === true) {
                    this.changeButs(e.target)
                    let a = e.target.getAttribute('link')
                    if (this.getAttribute(['page']) !== a) {
                        this.setAttribute('page', a)
                    }
                } else {
                    console.log('already loading');
                }
            })
        })
    }
    static get observedAttributes(){
        return ['page', 'webtype']
    }
    webtype(val) {
        if (!val) {
            return this.getAttribute('webtype')
        } else if (/channel/i.test(val)) {
            this.setAttribute('webtype', 'channel')
        } else {
            this.setAttribute('webtype', 'playlist')
        }
    }
    changeButs(targ){
        let it = Array.from(this.shadow.querySelectorAll('.togb'))
        it.forEach(but => {
            if (targ !== but) {
                but.classList.remove('a')
                if (!but.classList.contains('i')) {
                    but.classList.add('i')
                }
            } else {
                but.classList.remove('i')
                but.classList.add('a')
            }
        })
    }
    checkClicks(){
        let those = this.shadow.querySelectorAll('a')
        let these = Array.from(those)
        these.forEach(elem => {
            elem.addEventListener('click', (e)=>{
                e.preventDefault()
                e.stopPropagation()
                    console.log('try loading')
                    console.log(e.target.parentElement.href)
                    let mew = e.target.parentElement.href.split('=')
                    let qc = mew[1].split('&')
                    let link = qc[0]
                    let it = this.shadow.querySelector('youtube-player2')
                    if (!it) {
                        let that = document.createElement('youtube-player2')
                        this.shadow.append(that)
                        this.shadow.querySelector('youtube-player2').setAttribute('video', link)
                    } else {
                        it.setAttribute('video', link)
                    }
            })
        })
    }
    fillListPlaylist(){
        const that = this.shadow.querySelector('#list')
        that.innerHTML = ''
        this.shadow.querySelector('#holdcircle').classList.remove('hidden')
        let playlist = function(data){
            let image = data.image
            let id
            if (!image) {
                image = '/static/gin/youtubefallback.jpg'
            }
            if (data.id) {
                id = data.id
                return `<div class="iHold" id="${id}"><a href="${data.link}"><img src="${image}"></a><div class="info"><a href="${data.link}"><div class="title">${data.title}</div></a><div id="meta"></div>`
            } else {
                return `<div class="iHold"><a href="${data.link}"><img src="${image}"></a><div class="info"><a href="${data.link}"><div class="title">${data.title}</div></a><div id="meta"></div>`
            }
        }
        let cb = (data) => {
            if (data.error === false) {
                this.shadow.querySelector('#current').innerHTML = data.info.title
                let listing = data.info.videos.filter((video, index) => {
                    if (index == 0) {
                        video.id = 'zero'
                    }
                    if (index == 1) {
                        video.id = 'one'
                    }
                    if (index == 2) {
                        video.id = 'two'
                    }
                    if (index == 3) {
                        video.id = 'three'
                    }
                    if (index == 4) {
                        video.id = 'four'
                    }
                    if (index == 5) {
                        video.id = 'five'
                    }
                    if (index == 6) {
                        video.id = 'six'
                    }
                    if (index == 7) {
                        video.id = 'seven'
                    }
                    if (index == 8) {
                        video.id = 'eight'
                    }
                    if (index <= 26) {
                        return video
                    }
                })
                loadLiteral(that, listing, playlist)
                this.shadow.querySelector('#holdcircle').className = 'hidden'
                this.checkClicks()
            } else {
                this.shadow.querySelector('#holdcircle').className = 'hidden'
            }
        }
        if (sessionStorage.getItem(this.getAttribute(['page']))) {
            return cb(JSON.parse(sessionStorage.getItem(this.getAttribute(['page']))))
        }
        let mike = new XMLHttpRequest()
        mike.onerror = function(e){
            console.log(e)
            this.shadow.querySelector('#errors').innerHTML = `ERROR WITH LOADING THE PAGE: ${e}`
            this.shadow.querySelector('#holdcircle').className = 'hidden'
        }
        mike.onreadystatechange = () => {
            if (mike.readyState === 4) {
                let data = JSON.parse(mike.responseText)
                if (data.error === false){
                    sessionStorage.setItem(this.getAttribute(['page']), JSON.stringify(data))
                }
                cb(data)
            }
        }
        mike.open('POST', '/scrape/youtube/playlist', true)
        mike.setRequestHeader('Content-type', 'application/json')
        
        let info = {
            page: this.getAttribute(['page'])
        }
        mike.send(JSON.stringify(info))
    }
    fillListChannel(){
        const that = this.shadow.querySelector('#list')
        that.innerHTML = ''
        this.shadow.querySelector('#holdcircle').classList.remove('hidden')
        let channel = function(data){
            let image = data.image
            if (!image){
                image = '/static/gin/youtubefallback.jpg'
            }
            if (data.id) {
                return `<div class="iHold" id="${data.id}"><a href="${data.link}"><img src="${image}"></a><div class="info"><a href="${data.link}"><div class="title">${data.title}</div></a><div id="meta">${data.date} ${data.stats}</div></div>`
            } else {
                return `<div class="iHold"><a href="${data.link}"><img src="${image}"></a><div class="info"><a href="${data.link}"><div class="title">${data.title}</div></a><div id="meta">${data.date} ${data.stats}</div></div>`
            }
        }
        let cb = (data) => {
            if (data.error === false) {
                this.shadow.querySelector('#current').innerHTML = 'All Videos'
                let listing = data.info.filter((video, index) => {
                    if (index == 0) {
                        video.id = 'zero'
                    }
                    if (index == 1) {
                        video.id = 'one'
                    }
                    if (index == 2) {
                        video.id = 'two'
                    }
                    if (index == 3) {
                        video.id = 'three'
                    }
                    if (index == 4) {
                        video.id = 'four'
                    }
                    if (index == 5) {
                        video.id = 'five'
                    }
                    if (index == 6) {
                        video.id = 'six'
                    }
                    if (index == 7) {
                        video.id = 'seven'
                    }
                    if (index == 8) {
                        video.id = 'eight'
                    }
                    if (index <= 26) {
                        return video
                    }
                })
                loadLiteral(that, listing, channel)
                this.shadow.querySelector('#holdcircle').className = 'hidden'
                this.checkClicks()
            } else {
                this.shadow.querySelector('#holdcircle').className = 'hidden'
            }
        }
        if (sessionStorage.getItem(this.getAttribute(['page']))) {
            return cb(JSON.parse(sessionStorage.getItem(this.getAttribute(['page']))))
        }
        let mike = new XMLHttpRequest()
        mike.onerror = (e) => {
            this.shadow.querySelector('#errors').innerHTML = `ERROR WITH LOADING THE PAGE: ${e}`
            this.shadow.querySelector('#holdcircle').className = 'hidden'
        }
        mike.onreadystatechange = () => {
            if (mike.readyState === 4) {
                let data = JSON.parse(mike.responseText)
                if (data.error === false){
                    sessionStorage.setItem(this.getAttribute(['page']), JSON.stringify(data))
                }
                cb(data)
            }
        }
        mike.open('POST', '/scrape/youtube/channel', true)
        mike.setRequestHeader('Content-type', 'application/json')
        
        let info = {
            page: this.getAttribute(['page'])
        }
        mike.send(JSON.stringify(info))
    }
    fillPopular(){
        console.log('filling popular')
        let popular = this.shadow.querySelector('#recentList')
        let videos = JSON.parse(sessionStorage.getItem('/channel/UCJ05uCucbcuCivAjqqBDTvw'))
        let popularVideos = (data) => {
            let image = data.image
            if (!image){
                image = '/static/gin/youtubefallback.jpg'
            }
            if (data.id) {
                return `<div class="iHold" id="${data.id}"><a href="${data.link}"><img src="${image}"></a><div class="info"><a href="${data.link}"><div class="title">${data.title}</div></a><div id="meta">${data.date} ${data.stats}</div></div>`
            } else {
                return `<div class="iHold"><a href="${data.link}"><img src="${image}"></a><div class="info"><a href="${data.link}"><div class="title">${data.title}</div></a><div id="meta">${data.date} ${data.stats}</div></div>`
            }
        }
        let loadVideos = (videos) => {
            if (videos) {
                console.log(JSON.stringify(videos))
                let those = videos.info.filter((video) => { 
                    if (video.stats.split(' ')[0] > 600) return video
                });
                let these = those.filter((video, index) => {
                    if (index <= 8) {
                        video.id = `p${index}`
                        return video
                    }
                })
                loadLiteral(popular, these, popularVideos)
                console.log('LOADED POPULAR')
            }
        }
        if (videos) { loadVideos(videos) } else {
            let z = new XMLHttpRequest()
            z.onerror = (e) => {
                console.log('error')
                popular.parentElement.parentElement.remove()
            }
            z.onabort = (e) => {
                console.log('aborted')
                popular.parentElement.parentElement.remove()
            }
            z.onreadstatechange = () => {
                console.log(z.readyState)
                if (z.readyState === 1) {
                    console.log('reached 1')
                }
                if (z.readyState === 2) {
                    console.log('reached 2')
                }
                if (z.readyState === 3) {
                    console.log('reached 3')
                }
                if (z.readyState === 4) {
                    let data = JSON.parse(z.responseText)
                    console.log('received request for popular : ' + data.error)
                    if (data.error === false) {
                        sessionStorage.setItem('/channel/UCJ05uCucbcuCivAjqqBDTvw', JSON.stringify(data))
                        loadVideos(data)
                    } else {
                        popular.parentElement.parentElement.remove()
                    }
                }
            }
            z.open('POST', '/scrape/youtube/channel', true)
            z.setRequestHeader('Content-type', 'application/json')
            let info = {
                page: '/channel/UCJ05uCucbcuCivAjqqBDTvw'
            }
            z.send(JSON.stringify(info))
            console.log('sent request for popular')
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'page') {
            this.webtype(newValue)
            if (this.getAttribute(['webtype']) == 'playlist') {
                setTimeout(()=>{
                    this.fillListPlaylist()
                },200)
            } else {
                setTimeout(()=>{
                    this.fillListChannel()
                },200)
            }
        }
    }
    
}
window.customElements.define('you-tube2', YouTube2)
class PlayYou2 extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadow.innerHTML =`<style>
            #YTC {
                position: fixed;
                top: 0px;
                left: 0px;
                width: 100%;
                height: auto;
                min-height: 100vh;
                padding: 10px;
                margin: 0px;
                border-radius: 8px;
                background-color: black;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                z-index: 7;
            }
            #close {
                position: fixed;
                top: 20%;
                right: 5%;
                padding: 15px;
                background-color: #9abc48;
                color: white;
                text-shadow: 2px 2px 2px black;
                box-shadow: 3px 3px 6px black;
                z-index: 600;
                cursor: pointer;
                transition: 200ms ease;
            }
            #close:hover {
                transform: scale(1.1,1.1);
                background-color: black;
                transition: background-color 200ms ease;
            }
            iframe {
                width: 560px;
                height: 315px;
            }
            @media screen and (max-width: 650px) {
                iframe {
                    width: 336px;
                    height: 189px;
                }
            }
        </style>
        <div id="YTC">
            <iframe src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div><div id="close">X</div>`
        this.shadow.querySelector('#close').addEventListener('click', ()=>{this.remove()})
    }
    static get observedAttributes(){
        return ['video']
    }
    attributeChangedCallback(a, o, n){
        if (a === 'video') {
            this.shadow.querySelector('iframe').src = 'https://www.youtube.com/embed/' + n
        }
    }
}
customElements.define('youtube-player2', PlayYou2)
class vidSect extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:'open'})
    }
    static get observedAttributes(){
        return ['image1', 'image2', 'sermonname1', 'sermonlink1', 'sermonname2', 'sermonlink2']
    }
    render(){
        this.shadow.innerHTML = `<style>
        #mainhead {
            min-width: 95%;
            max-width: 100%;
            margin: 0px 10px;
            padding-top: 200px;
            padding-left: 10px;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            height: 350px;
            border-radius: 8px;
            background-position: center;
            background-size: cover;
            transition: 300ms 60ms ease-in;
            box-shadow: 2px 2px 8px black;
        }
        #wakeup {
            background-color: #9abc48;
            color: white;
            text-shadow: 1px 1px 3px black;
        }
        #content {
            display: inline-flex;
            align-items: flex-start;
            justify-content: flex-end;
            flex-direction: column;
            padding: 20px;
            max-width: 100%;
            margin-left: 10px;
            overflow: hidden;
            height: 100%;
            max-height: 100%;
        }
        .button {
            border-radius: 50px;
            padding: 10px;
            text-transform: uppercase;
            font-weight: 800;
            text-align: center;
            font-size: 1rem;
            box-shadow: 2px 3px 4px black;
            margin: 5px 10px;
            cursor: pointer;
            transition: 400ms ease;
            background-color: white;
            margin-left: 0px;
        }
        .button:hover {
            color: #9abc48!important;
            background-color: black!important;
            transform: scale(1.1,1.1);
            transition: 200ms ease-out;
        }
        #allsermonbut {
            background-color: black;
            color: white;
        }
        #sermonbuts {
            align-items: center;
            justify-content: space-between;
            display: inline-flex;
            padding: 5px;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
            height: auto;
        }
        #sermonheads {
            align-items: center;
            justify-content: space-between;
            display: inline-flex;
            padding: 0px;
            margin: 0px;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
            height: auto;
        }
        .headhold {
            max-width: 50%;
            width: 50%;
            overflow: hidden;
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-end;
        }
        h1 {
            font-size: 1rem;
            color: white;
            text-shadow: 2px 2px 4px black;
            width: 100%;
            max-width: 100%;
            margin: 0px;
            margin-top: 10px;
            cursor: default;
            text-align: center;
        }
        #mini {
            padding: 6px;
            font-size: .7rem;
            color: white;
            background-color: #9abc48;
            text-shadow: 1px 1px 1px black;
            box-shadow: 2px 2px 2px black;
            border-radius: 50px;
            text-align: center;
            cursor: default;
        }
        @media screen and (max-width: 800px) {
            #content {
                padding: 0px!important;
            }
        }    
        @media screen and (min-width: 1200px) {
            #mainhead {
                min-width: 100%;
            }
        }
        </style>
        <div id="mainhead">
            <div id="content">
                <div id="mini">Latest Sermons</div>
                <div id="sermonheads">
                    <div class="headhold">
                        <h1 id="sermonname"></h1>
                    </div>
                    <div class="headhold">
                        <h1 id="sermonname2"></h1>
                    </div>
                </div>
                <div id="sermonbuts">
                    <div id="sermonbut1" class="button">Pastor Scot Anderson</div>
                    <div id="sermonbut2" class="button">Pastor Jason Anderson</div>
                </div>
            </div>
        </div>`
        this.style.justifyContent = 'center'
        this.style.alignItems = 'center'
        this.style.display = 'inline-flex'
        this.style.padding = '25px 10%'
        this.style.maxWidth = '100%'
        let bg = this.shadow.querySelector('#mainhead')
        if (this.hasAttribute(['image1'])){
            bg.style.backgroundImage = `url('${this.getAttribute(['image1'])}')`
        }
        bg.addEventListener('mouseenter', (e) => {
            if (this.hasAttribute(['image2'])) {
                bg.style.backgroundImage = `url('${this.getAttribute(['image2'])}')`
            }
        })
        bg.addEventListener('mouseleave', (e)=>{
            if (this.hasAttribute(['image1'])){
                bg.style.backgroundImage = `url('${this.getAttribute(['image1'])}')`
            }
        })
        if (this.hasAttribute(['sermonname1'])) {
            this.shadow.querySelector('#sermonname').innerHTML = this.getAttribute(['sermonname1'])
        }
        if (this.hasAttribute(['sermonname2'])) {
            this.shadow.querySelector('#sermonname2').innerHTML = this.getAttribute(['sermonname2'])
        }
        if (this.hasAttribute(['sermonlink1'])) {
            this.shadow.querySelector('#sermonbut1').addEventListener('click', (e)=>{
                let that = document.querySelector('youtube-player2')
                if (!that) {
                    let it = document.createElement('youtube-player2')
                    document.querySelector('body').append(it)
                    it.setAttribute('video', this.getAttribute(['sermonlink1']))
                } else {
                    that.classList.remove('hidden')
                    that.setAttribute('video', this.getAttribute(['sermonlink1']))   
                }
            })
        }
        if (this.hasAttribute(['sermonlink2'])) {
            this.shadow.querySelector('#sermonbut2').addEventListener('click', (e)=>{
                let that = document.querySelector('youtube-player2')
                if (!that) {
                    let it = document.createElement('youtube-player2')
                    document.querySelector('body').append(it)
                    it.setAttribute('video', this.getAttribute(['sermonlink2']))
                } else {
                    that.classList.remove('hidden')
                    that.setAttribute('video', this.getAttribute(['sermonlink2']))   
                }
            })
        }
    }
    getRecent(){
        return new Promise(async (res, rej) => {
            let scot = JSON.parse(sessionStorage.getItem('PLoQ8_Hx6LYyiUB4PCRtp4NEHc6fEnI07K'))
            let jason = JSON.parse(sessionStorage.getItem('PLoQ8_Hx6LYygB06XvNqzZElfzIXI5t4Kh'))
            if (!scot || !jason){
                let getItem = (item) => {
                    return new Promise((success, fail) => {
                            let mike = new XMLHttpRequest()
                            mike.onerror = (e) => {
                                    return fail(e)
                            }
                            mike.onreadystatechange = () => {
                                if (mike.readyState === 4) {
                                    let data = JSON.parse(mike.responseText)
                                    if (data.error === false){
                                        sessionStorage.setItem(item, JSON.stringify(data))
                                    }                   
                                    return success(data.info.videos[0])
                                }
                            }
                            mike.open('POST', '/scrape/youtube/playlist', true)
                            mike.setRequestHeader('Content-type', 'application/json')
        
                            let info = {
                                page: item
                            }
                            mike.send(JSON.stringify(info))
                    })
                }
                if (!jason){
                    await getItem('PLoQ8_Hx6LYygB06XvNqzZElfzIXI5t4Kh').then(result => {
                        if (result) {
                            jason = result
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                } else {
                    jason = jason.info.videos[0]
                }
                if (!scot){
                    await getItem('PLoQ8_Hx6LYyiUB4PCRtp4NEHc6fEnI07K').then(result => {
                        if (result) {
                            scot = result
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                } else {
                    scot = scot.info.videos[0]
                }
            } else {
                jason = jason.info.videos[0]
                scot = scot.info.videos[0]
            }
            this.setAttribute('sermonname1', scot.title)
            this.setAttribute('sermonlink1', scot.link.split('v=')[1].split('&')[0])
            this.setAttribute('sermonname2', jason.title)
            this.setAttribute('sermonlink2', jason.link.split('v=')[1].split('&')[0])
            return res(true)
        })
    }
    connectedCallback(){
        this.getRecent().then(() => {
            this.render()
        }).catch(e => {
            console.log(e)
            this.render()
        })
    }
    attributeChangedCallback(a, o, n){
        console.log(`${a} changing from ${o}, ${n}`)
        if (a === 'image1' || a === 'image2') {
            this.render()
        }
    }
}
customElements.define('vid-sect', vidSect)