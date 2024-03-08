const featured = [
    {
        title: 'Attendance for Google Meet™',
        description: `A Google Chrome extension with over 25,000 users from over 100 countries that automates attendance tracking in Google Meet calls by enabling users to view and sort attendance, create and edit class rosters, and export organized logs to Google Sheets through a Material Design user interface. 
            Awarded a Featured badge by the Google Chrome Web Store team for meeting a high standard of user experience and technical design.`,
        links: {
            external:
                'https://chrome.google.com/webstore/detail/attendance-for-google-mee/gioogehddfnceeihfoeencjbhggblkkd?hl=en',
            github: 'https://github.com/tytot/attendance-for-google-meet',
        },
        tags: ['Google Chrome Extension', 'JavaScript', 'Google Sheets API', 'HTML', 'CSS', 'Material Design'],
        image: 'featured/a4gm.png',
    },
    {
        title: 'The Puzzled Cube',
        description: `A puzzle-platformer video game built from scratch using Java Swing that features 24 unique levels of increasing complexity, 3 unique power-ups, and custom graphics, animations, and audio. 
            Compete to solve the brain-teasers and earn a spot on the Node.js global leaderboard!`,
        links: {
            play: '/the-puzzled-cube',
            github: 'https://github.com/tytot/the-puzzled-cube',
        },
        tags: ['Java', 'Java Swing', 'JavaScript', 'Node.js', 'SQL'],
        image: 'featured/tpc.png',
    },
    {
        title: 'Harmony',
        description: `A Svelte web application that facilitates near-synchronous collaboration for musical education. 
            Teachers create rooms with specified tempos for students to record themselves singing or playing in. 
            Audio is transferred instantaneously using WebRTC peer-to-peer communication, allowing teachers to quickly identify issues and provide feedback.`,
        links: {
            external: 'https://harmony-audio.netlify.app/',
            github: 'https://github.com/agoldstein03/Blueprint-2021-Project',
            devpost: 'https://devpost.com/software/harmony-5z43q2',
        },
        tags: ['Svelte', 'JavaScript', 'WebRTC', 'HTML', 'Pug', 'Rollup', 'SCSS'],
        image: 'featured/harmony.png',
    },
]

export default featured
