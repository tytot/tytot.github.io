$(document).ready(function () {
    let imgState = 0
    let entry = 1
    let info = false
    let exited = false
    let scrollPos = [0, 0]
    let hasTouchScreen = false

    if ('maxTouchPoints' in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0
    } else if ('msMaxTouchPoints' in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0
    } else {
        let mQ = window.matchMedia && matchMedia('(pointer:coarse)')
        if (mQ && mQ.media === '(pointer:coarse)') {
            hasTouchScreen = !!mQ.matches
        } else if ('orientation' in window) {
            hasTouchScreen = true // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            let UA = navigator.userAgent
            hasTouchScreen =
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        }
    }

    let theWindow = $(window),
        $wall = $('.wall')

    theWindow
        .resize(function () {
            if (theWindow.width() / theWindow.height() < $wall.width() / $wall.height()) {
                $wall.removeClass().addClass('bgheight')
            } else {
                $wall.removeClass().addClass('bgwidth')
            }
        })
        .trigger('resize')

    entries.forEach((entry, index) => {
        if (index === 0) {
            $('#faded').append('<img src=img/' + entry.image + '></img>')
        } else {
            $('#faded').append('<img hidden src=img/' + entry.image + '></img>')
        }

        let entryHTML = ``
        if (index === entries.length - 1) {
            entryHTML = entryHTML.concat(`<div class="entry" style="margin-bottom: 50px;">`)
        } else {
            entryHTML = entryHTML.concat(`<div class="entry">`)
        }
        let mark = ''
        if (entry.starred) {
            mark = "<i class='fas fa-star'></i>"
        }
        entryHTML = entryHTML.concat(`
        <div class="content">
            <h2 style="text-decoration: underline;">${entry.name}${mark}</h2>
            <h3>Description</h3>
            <p>${entry.description}</p>
            <h3>Links</h3>
            <div class="social">`)
        for (let [key, value] of Object.entries(entry.links)) {
            let fa = 'fab'
            if (key === 'link') fa = 'fas'
            const link = `
                <a class="btn click link" href="${value}" target="_blank">
                    <i class="${fa} fa-${key}" aria-hidden="true"></i>
                </a>`
            entryHTML = entryHTML.concat(link)
        }
        const tagHTML = entry.tags
            .split(', ')
            .map((tag) => {
                if (tagIcons.has(tag)) {
                    return `<i class="${tagIcons.get(tag)}"></i> ${tag}`
                } else {
                    return tag
                }
            })
            .join(', ')
        entryHTML = entryHTML
            .concat(
                `</div>
                        <h3>Tags</h3>
                        <p class="tags">${tagHTML}</p>
                    </div>
                </div>`
            )
            .replace(/\>[\s]+\</g, '><')

        $('#generate').append(entryHTML)
    })

    $('.arrow').click(exitInfo)

    $('.container').scroll(function () {
        let scrollDist = $('.container').scrollTop()

        $('.gradient').css('top', scrollDist)

        if (imgState === 2) {
            const initEntry = entry
            entry = Math.floor((scrollDist + 260) / 690) + 1

            if (entry != initEntry) {
                let newPic = $('#faded img:nth-child(' + entry + ')')
                let oldPic = $('#faded img:nth-child(' + initEntry + ')')
                newPic.fadeIn(600)
                oldPic.fadeOut(600)
            }
        }
    })

    $(document).on('mousemove', function (event) {
        if (!info) {
            const $wall = $('#top')
            const x = event.pageX,
                y = event.pageY
            const xRel = x / $wall.width(),
                yRel = y / $wall.height()

            if (yRel > 6 / 21 && yRel < 15 / 21) {
                if (xRel > 0.081 && xRel < 0.336) {
                    if (imgState != 1) {
                        imgState = 1
                    }
                } else if (xRel > 0.372 && xRel < 0.627) {
                    if (imgState != 2) {
                        imgState = 2
                    }
                } else if (xRel > 0.663 && xRel < 0.919) {
                    if (imgState != 3) {
                        imgState = 3
                    }
                } else {
                    if (imgState != 0) {
                        imgState = 0
                    }
                }
            } else {
                if (imgState != 0) {
                    imgState = 0
                }
            }

            let body = $(document.body)
            if (imgState != 0) {
                body.css('cursor', 'pointer')
            } else if (body.css('cursor') === 'pointer') {
                body.css('cursor', 'grab')
            }
            $wall.attr('src', 'img/home-' + imgState + '.jpg')
        }
    })

    $(document).click(function (event) {
        if (!exited) {
            let body = $(document.body)
            if (!info && imgState != 0) {
                if (imgState === 2) {
                    $('#faded img:nth-child(' + entry + ')').hide()
                    $('#faded img:nth-child(1)').show()
                    entry = 1
                }
                $('.container').show()
                $('#background img#top').css('opacity', 0)
                info = true
                if (hasTouchScreen) {
                    enableScrollLock()
                }
                body.removeClass()
                dragscroll.reset()
                setTimeout(() => {
                    body.css('cursor', 'default')
                    $('.item' + imgState).fadeIn(600)
                    if (imgState === 2) {
                        $('#background').fadeOut(600)
                    }
                }, 1000)
            }
        }
        // $('#exclamation').css({
        //     top: event.pageY - 108,
        //     left: event.pageX - 16,
        // })
        // $('#exclamation').attr('src', 'img/!.gif')
    })

    $(document).mousedown(function () {
        if (!info && imgState === 0) {
            $(document.body).css('cursor', 'grabbing')
        }
    })

    $(document).mouseup(function () {
        if (!info && imgState == 0) {
            $(document.body).css('cursor', 'grab')
        }
    })

    function exitInfo() {
        if (!exited) {
            exited = true
            info = false
            $('.info').fadeOut(600)
            if (imgState === 2) {
                $('#background').fadeIn(600)
            }

            setTimeout(() => {
                $('.container').hide()
                $('#background img#top').css('opacity', 1)
                if (hasTouchScreen) {
                    disableScrollLock()
                }
                $(document.body).addClass('dragscroll')
                dragscroll.reset()
                $(document.body).css('cursor', 'grab')
            }, 600)
            setTimeout(() => {
                exited = false
            }, 1600)
        }
    }

    function enableScrollLock() {
        let background = $('#background img')
        scrollPos = [window.pageXOffset, window.pageYOffset]
        background.css({
            position: 'fixed',
            left: `-${scrollPos[0]}px`,
            top: `-${scrollPos[1]}px`,
        })
    }

    function disableScrollLock() {
        let background = $('#background img')
        background.css({ position: 'absolute', left: '', top: '' })
        window.scrollTo(scrollPos[0], scrollPos[1])
    }
})
