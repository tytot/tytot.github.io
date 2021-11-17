$(function () {
    $.ajax({
        url: 'https://api.github.com/repos/tytot/resume/contents/Tyler_Lin_Resume.pdf',
        // headers: {
        //     Authorization: 'token ' + secrets.token,
        // },
        success: function (response) {
            $('#resume-download').attr('href', `data:application/pdf;base64,${response.content}`)
            const bytes = new Uint8Array(
                window
                    .atob(response.content)
                    .split('')
                    .map((char) => char.charCodeAt())
            )
            const file = new Blob([bytes], { type: 'application/pdf;base64' })
            const fileURL = URL.createObjectURL(file)
            $('#resume-open').click(function (event) {
                window.open(fileURL)
            })
        },
    })

    const state = {
        highlightedPage: 0,
        pageOpen: false,
        transitioning: false,
        focusedEntry: 1,
        scrollPos: [0, 0],
        mousePos: [0, 0],
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
                $wall.css('height', '100%')
                $wall.css('width', '')
            } else {
                $wall.css('height', '')
                $wall.css('width', '100%')
            }
        })
        .trigger('resize')
    theWindow.scrollTop(($wall.height() - theWindow.height()) / 2)
    theWindow.scrollLeft(($wall.width() - theWindow.width()) / 2)

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

    const entryHeight = parseInt($('.entry').css('height').slice(0, -2))
    const em = parseFloat(getComputedStyle(document.getElementById('generate')).fontSize)
    $('.container').scroll(function () {
        if (state.highlightedPage === 2) {
            const initEntry = state.focusedEntry
            state.focusedEntry =
                Math.floor(($('.container').scrollTop() + entryHeight / 2 - 2 * em) / entryHeight) +
                1

            if (state.focusedEntry != initEntry) {
                const newPic = $('#faded img:nth-child(' + state.focusedEntry + ')')
                const oldPic = $('#faded img:nth-child(' + initEntry + ')')
                newPic.fadeIn(600)
                oldPic.fadeOut(600)
            }
        }
    })

    $(document).on('mousemove', function (event) {
        const x = event.pageX,
            y = event.pageY
        state.mousePos[0] = x
        state.mousePos[1] = y
        if (!state.pageOpen && !state.transitioning) {
            highlightPage(x, y)
        }
    })

    $(document).click(function (event) {
        if (!state.pageOpen && state.highlightedPage !== 0 && !state.transitioning) {
            openPage(state.highlightedPage)
        }
        // $('#exclamation').css({
        //     top: event.pageY - 108,
        //     left: event.pageX - 16,
        // })
        // $('#exclamation').attr('src', 'img/!.gif')
    })
    $(document).on('mousedown', function (event) {
        const body = $(document.body)
        if (!state.pageOpen && !state.transitioning && body.css('cursor') === 'grab') {
            body.css('cursor', 'grabbing')
        }
    })
    $(document).on('mouseup', function (event) {
        const body = $(document.body)
        if (!state.pageOpen && !state.transitioning && body.css('cursor') === 'grabbing') {
            body.css('cursor', 'grab')
        }
    })

    $('#portfolio-link').click(() => {
        changePage(2)
    })
    $('#extras-link').click(() => {
        changePage(3)
    })

    $(document).keyup(function (event) {
        if (event.key === 'Escape' && state.pageOpen && !state.transitioning) {
            closePage()
        }
    })
    $('.arrow').click((event) => {
        if (state.pageOpen && !state.transitioning) {
            closePage()
        }
        event.stopPropagation()
    })

    function highlightPage(x, y) {
        const $wall = $('#top')
        const xRel = x / $wall.width(),
            yRel = y / $wall.height()

        let newPage = 0
        if (yRel > 6 / 21 && yRel < 15 / 21) {
            if (xRel > 0.081 && xRel < 0.336) {
                newPage = 1
            } else if (xRel > 0.372 && xRel < 0.627) {
                newPage = 2
            } else if (xRel > 0.663 && xRel < 0.919) {
                newPage = 3
            } else {
                newPage = 0
            }
        }
        if (state.highlightedPage !== newPage) {
            state.highlightedPage = newPage
            updateCursor()
            $wall.attr('src', 'img/home-' + state.highlightedPage + '.jpg')
        }
    }

    function updateCursor() {
        const body = $(document.body)
        if (state.highlightedPage !== 0) {
            body.css('cursor', 'pointer')
        } else {
            body.css('cursor', 'grab')
        }
    }

    function openPage(page) {
        state.transitioning = true
        const body = $(document.body)
        if (page === 2) {
            $('#faded img:nth-child(' + state.focusedEntry + ')').hide()
            $('#faded img:nth-child(1)').show()
            state.focusedEntry = 1
        }
        $('.container').show()
        $('#background img#top').css('opacity', 0)
        enableScrollLock()
        body.removeClass()
        body.css('cursor', 'default')
        dragscroll.reset()
        setTimeout(() => {
            $('.item' + page).fadeIn(600)
            if (page === 2) {
                $('#background').fadeOut(600)
            }
        }, 1000)
        setTimeout(() => {
            state.highlightedPage = page
            state.pageOpen = true
            state.transitioning = false
        }, 1600)
    }

    function changePage(newPage) {
        state.transitioning = true
        $('.item' + state.highlightedPage).fadeOut(600)
        $(document.body).css('cursor', 'default')
        setTimeout(() => {
            $('.item' + newPage).fadeIn(600)
            if (newPage === 2) {
                $('#faded img:nth-child(' + state.focusedEntry + ')').hide()
                $('#faded img:nth-child(1)').show()
                state.focusedEntry = 1
                $('#background').fadeOut(600)
            }
            state.highlightedPage = newPage
        }, 600)
        setTimeout(() => {
            state.transitioning = false
        }, 1200)
    }

    function closePage() {
        state.pageOpen = false
        state.transitioning = true
        $('.info').fadeOut(600)
        if (state.highlightedPage === 2) {
            $('#background').fadeIn(600)
        }
        disableScrollLock()
        setTimeout(() => {
            $('.container').hide()
            $('#background img#top').css('opacity', 1)
        }, 600)
        setTimeout(() => {
            const body = $(document.body)
            body.addClass('dragscroll')
            dragscroll.reset()
            state.transitioning = false
            highlightPage(state.mousePos[0], state.mousePos[1])
            updateCursor()
        }, 1600)
    }

    function enableScrollLock() {
        const background = $('#background img')
        state.scrollPos = [window.pageXOffset, window.pageYOffset]
        background.css({
            position: 'fixed',
            left: `-${state.scrollPos[0]}px`,
            top: `-${state.scrollPos[1]}px`,
        })
    }

    function disableScrollLock() {
        const background = $('#background img')
        background.css({ position: 'absolute', left: '', top: '' })
        window.scrollTo(state.scrollPos[0], state.scrollPos[1])
    }
})
