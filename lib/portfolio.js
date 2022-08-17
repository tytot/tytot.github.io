const entries = [
    {
        name: 'Attendance for Google Meet™',
        starred: true,
        description:
            'A Google Chrome extension that allows teachers to easily take attendance for their virtual classes. It automatically tracks when students join and leave and how long they are present. Teachers may view this data through the extension UI, or export it to a Google Spreadsheet via the Google Sheets API. Won Grand Prize at the 2020 HackDefy Hackathon.',
        links: {
            link: 'https://chrome.google.com/webstore/detail/attendance-for-google-mee/gioogehddfnceeihfoeencjbhggblkkd?hl=en',
            github: 'https://github.com/tytot/attendance-for-google-meet',
            dev: 'https://devpost.com/software/attendance-for-google-meet',
            youtube: 'https://www.youtube.com/watch?v=E-p3BQeVFFo',
        },
        tags: 'Chrome Extension, HTML, CSS, JavaScript, Google Sheets API, Material Design',
        image: 'attendance.png',
    },
    {
        name: 'The Puzzled Cube',
        starred: false,
        description:
            "A puzzle platformer game programmed in Java Swing. The Puzzled Cube includes 24 challenging levels featuring 3 unique powerups, seamless graphics, and immersive audio. It's a true brain-teaser!",
        links: {
            github: 'https://github.com/tytot/fbla-2021',
        },
        tags: 'Java, Java Swing, Theseus, gaming',
        image: 'tpc.png',
    },
    {
        name: 'Harmony',
        starred: false,
        description:
            'A web application that facilitates near-synchronous collaboration for musical education. Teachers can create rooms with specified tempos for students to record themselves singing or playing in. Audio is transferred instantaneously using peer-to-peer communication, allowing teachers to quickly identify issues and provide feedback.',
        links: {
            link: 'https://harmony-audio.netlify.app/',
            github: 'https://github.com/agoldstein03/Blueprint-2021-Project',
            dev: 'https://devpost.com/software/harmony-5z43q2',
            youtube: 'https://www.youtube.com/watch?v=OePcA8RWerU',
        },
        tags: 'Svelte, WebRTC, Web Audio API, peaks.js, HTML, Pug, SCSS, JavaScript, rollup',
        image: 'harmony.png',
    },
    {
        name: 'Minecraft Proximity Discord Chat',
        starred: false,
        description:
            'A system that enables customizable proximity voice chat in a Minecraft server. The framework consists of a Node.js data RESTful API, a Java Bukkit plugin that pushes proximity data from the server to the API, and an executeable Windows Presentation Foundation GUI made with C# that reads from the API.',
        links: {
            github: 'https://github.com/tytot/minecraft-proximity-discord-chat',
        },
        tags:
            'C#, Java, JavaScript, Node.js, Express.js, Heroku, Bukkit, WPF, Minecraft, Discord, gaming',
        image: 'proximity.png',
    },
    {
        name: 'Medical Record Blockchain',
        starred: true,
        description:
            'A proof-of-concept Hyperledger Fabric distributed ledger for medical records. Powered by a Java smart contract, the blockchain stores patient medication and immunization data and authenticates with certificate authorities. Users manage records through a Bootstrap web application that communicates with a custom Express.js API.',
        links: {
            github: 'https://github.com/tytot/medical-record-blockchain',
        },
        tags: 'Blockchain, Shell, HTML, SCSS, JavaScript, Java, Hyperledger Fabric, Bootstrap',
        image: 'blockchain-ehr.png',
    },
    {
        name: 'MedNet',
        starred: false,
        description:
            'An interoperable and scalable mobile-phone based communication system that connects hospital departments in need of equipment to hospitals with surplus via an interactive SMS bot and a dynamically updating web server. The system is backed by a Google Cloud MySQL database Express API and a Firestore Flask API.',
        links: {
            github: 'https://github.com/yuhwanlee1/Defhacks-2020',
            dev: 'https://devpost.com/software/mednet-12ryge',
            youtube: 'https://www.youtube.com/watch?v=583rX-v6OKk',
        },
        tags: 'Apache, Node.js, Express.js, Flask, MySQL, Firestore, Google Cloud',
        image: 'mednet.png',
    },
    {
        name: 'BrainFun',
        starred: false,
        description:
            "A learning platform created to teach children the concepts behind programming through Brainf*ck, an esoteric language. The website features 19 unique exercises, an intuitive UI with a custom console and tape visualizer, and Firebase authentication. Won honorable mention at the 2020 'Same Home, Different Hacks' hackathon.",
        links: {
            link: 'https://brainfun.tech/',
            github: 'https://github.com/agoldstein03/Brainfun',
            dev: 'https://devpost.com/software/brainfun-fqvu65',
            youtube: 'https://www.youtube.com/watch?v=OePcA8RWerU',
        },
        tags: 'Vue.js, HTML, CSS, JavaScript, Brainf*ck, Material Design, Firebase',
        image: 'brainfun.png',
    },
    {
        name: 'Bubble Fishing',
        starred: true,
        description:
            'An near-limitless arcade game made in Unity 3D for iOS. Players control a physics-defying bubble with the goal of sinking as deep in the ocean as possible. The game includes 15 different sea creatures, power-ups, achievements, and leaderboards. Scripted using C#.',
        links: {
            link: 'https://apps.apple.com/us/app/bubble-fishing/id1496553186?ls=1',
            github: 'https://github.com/tytot/bubble-fishing-src',
            youtube: 'https://www.youtube.com/watch?v=TYXJr6MEfYY',
            'pied-piper-pp': 'bubble-fishing/privacy-policy.html',
        },
        tags: 'C#, Unity, iOS, gaming, indie',
        image: 'bubble-fishing.png',
    },
    {
        name: 'Pool',
        starred: false,
        description:
            "A fully-functional pool simulation made in Java Swing. Game modes include 8-ball, 9-ball, and 10-ball. The game features score-keeping, accurate collision detection and physics, and aim guidance. Inspiration for certain aspects came from Game Pigeon's 8-ball.",
        links: {
            github: 'https://github.com/tytot/pool',
        },
        tags: 'Java, Java Swing, pool, physics, gaming',
        image: 'pool.png',
    },
    {
        name: 'Needle Exchange Program Mediator',
        starred: true,
        description:
            'My internship project for the Johns Hopkins Applied Physics Lab. It connects various health services, including OpenHIM, OpenInfoMan, and RapidPro together to track the status of a needle exchange program. A custom-made human resource information system (HRIS) serves as the main point of interaction. The project aims to promote interoperability and efficent workflow.',
        links: {
            github: 'https://github.com/tytot/needle-exchange',
        },
        tags: 'HTML, CSS, JavaScript, Bootstrap, async, interoperability, mediator',
        image: 'nes.png',
    },
    {
        name: 'tylerl.in',
        starred: false,
        description:
            "This website! Made to improve my website creation skills and because the url is litty, it features an 'about' section, a portfolio, and an 'extras' section. Portfolio entries are dynamically generated using a local JSON file. There are a couple of hidden easter eggs; can you find them?",
        links: {
            github: 'https://github.com/tytot/tytot.github.io',
        },
        tags: 'HTML, CSS, JavaScript, JQuery, web dev',
        image: 'website.png',
    },
    {
        name: 'Chinese Checkers',
        starred: false,
        description:
            'A faithful recreation of Chinese Checkers made from scratch in Java. Up to 6 players can play. The game features optional CPUs and variable screen sizes.',
        links: {
            github: 'https://github.com/tytot/chinese-checkers',
        },
        tags: 'Java, chinese checkers, gaming',
        image: 'chinese-checkers.png',
    },
    {
        name: 'Making a Monster',
        starred: true,
        description:
            "A website that depicts the events of Mary Shelley's <i>Frankenstein</i> through Chapters 11 and 12. The story is portrayed from Frankenstein's point of view using slideshow visuals and text. Won the 2017 Maryland Society of Educational Technology Award for Multimedia.",
        links: {
            link: 'http://www.makingamonster.us.to/',
        },
        tags: 'HTML, CSS, JavaScript',
        image: 'frankenstein.png',
    },
]
