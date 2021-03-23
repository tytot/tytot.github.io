$(function () {
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
        const mQ = window.matchMedia && matchMedia('(pointer:coarse)')
        if (mQ && mQ.media === '(pointer:coarse)') {
            hasTouchScreen = !!mQ.matches
        } else if ('orientation' in window) {
            hasTouchScreen = true // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            const UA = navigator.userAgent
            hasTouchScreen =
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        }
    }

    // prevent auto-scroll in Chrome
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
    }

    const theWindow = $(window)
    const $wall = $('.wall')
    theWindow
        .resize(function () {
            if (theWindow.width() / theWindow.height() < $wall.width() / $wall.height()) {
                $wall.removeClass().addClass('bgheight')
            } else {
                $wall.removeClass().addClass('bgwidth')
            }
        })
        .trigger('resize')
    theWindow.scrollTop(($wall.height() - theWindow.height()) / 2)

    entries.forEach((entry, index) => {
        $('#faded').append(`<img ${index === 0 ? '' : 'hidden'} src=img/${entry.image}></img>`)

        let entryHTML = `<div class="entry" ${
            index === entries.length - 1 ? 'style="margin-bottom: 50px;"' : ''
        }>`
        const mark = entry.starred ? '<i class="fas fa-star"></i>' : ''
        entryHTML = entryHTML.concat(`
        <div class="content">
            <h2 style="text-decoration: underline;">${entry.name}${mark}</h2>
            <h3>Description</h3>
            <p>${entry.description}</p>
            <h3>Links</h3>
            <div class="social">`)
        for (const [key, value] of Object.entries(entry.links)) {
            const fa = key === 'link' ? 'fas' : 'fab'
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
            .replaceAll(/>\s+</g, '><')
            .trim()

        $('#generate').append(entryHTML)
    })

    $('.arrow').click(exitInfo)

    const entryHeight = parseInt($('.entry').css('height').slice(0, -2))
    const em = parseFloat(getComputedStyle(document.getElementById('generate')).fontSize)
    $('.container').scroll(function () {
        const scrollDist = $('.container').scrollTop()
        $('.gradient').css('top', scrollDist)
        if (imgState === 2) {
            const initEntry = entry
            entry = Math.floor((scrollDist + entryHeight / 2 - 2 * em) / entryHeight) + 1

            if (entry != initEntry) {
                const newPic = $('#faded img:nth-child(' + entry + ')')
                const oldPic = $('#faded img:nth-child(' + initEntry + ')')
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

            const body = $(document.body)
            if (imgState != 0) {
                body.css('cursor', 'pointer')
            } else if (body.css('cursor') === 'pointer') {
                body.css('cursor', 'move')
            }
            $wall.attr('src', 'img/home-' + imgState + '.jpg')
        }
    })

    $(document).click(function (event) {
        if (!exited) {
            const body = $(document.body)
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
                        window.previousScrollTop = theWindow.scrollTop()
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

    $(document).keyup(function (event) {
        if (info && $('.item' + imgState).is(':visible') && event.key === 'Escape') {
            exitInfo()
        }
    })

    function exitInfo() {
        if (!exited) {
            exited = true
            info = false
            $('.info').fadeOut(600)
            if (imgState === 2) {
                $('#background').fadeIn(600)
                theWindow.scrollTop(window.previousScrollTop)
            }

            setTimeout(() => {
                $('.container').hide()
                $('#background img#top').css('opacity', 1)
                if (hasTouchScreen) {
                    disableScrollLock()
                }
                const body = $(document.body)
                body.addClass('dragscroll')
                dragscroll.reset()
                body.css('cursor', 'move')
            }, 600)
            setTimeout(() => {
                exited = false
            }, 1600)
        }
    }

    function enableScrollLock() {
        const background = $('#background img')
        scrollPos = [window.pageXOffset, window.pageYOffset]
        background.css({
            position: 'fixed',
            left: `-${scrollPos[0]}px`,
            top: `-${scrollPos[1]}px`,
        })
    }

    function disableScrollLock() {
        const background = $('#background img')
        background.css({ position: 'absolute', left: '', top: '' })
        window.scrollTo(scrollPos[0], scrollPos[1])
    }
})
