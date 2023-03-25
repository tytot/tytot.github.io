import { faGlobe, faHeadset, faHospitalUser, faHouseMedicalFlag, faLaptopCode } from '@fortawesome/free-solid-svg-icons'

const projects = [
    {
        title: 'BrainFun',
        description: `A website made using Vue.js that teaches low-level programming concepts through Brainf*ck, an esoteric language. 
            Features 19 unique exercises, an Material Design user interface with a custom console and tape visualizer, and Firebase authentication.`,
        icon: faLaptopCode,
        links: {
            external: 'https://brainfun.tech/',
            github: 'https://github.com/agoldstein03/Brainfun',
            devpost: 'https://devpost.com/software/brainfun-fqvu65',
        },
        tags: ['Vue.js', 'JavaScript', 'HTML', 'SASS', 'Material Design', 'Firebase', 'Brainf*ck'],
    },
    {
        title: 'MedNet',
        description: `An interoperable and scalable SMS-based communication system that connects equipment-needy hospitals to donors. Consists of a Bootstrap user interface, a MySQL database, an Express API, a Firestore Flask API, and an OpenHIM mediator.`,
        icon: faHouseMedicalFlag,
        links: {
            github: 'https://github.com/yuhwanlee/MedNet',
            devpost: 'https://devpost.com/software/mednet-12ryge',
        },
        tags: ['MySQL', 'Firestore', 'Flask', 'Python', 'Twilio', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'Bootstrap'],
    },
    {
        title: 'Medical Record Blockchain',
        description: `A proof-of-concept Hyperledger Fabric distributed ledger for medical records using Java smart contracts. 
            Users manage patient medication and immunization history through a Bootstrap web client interface.`,
        icon: faHospitalUser,
        links: {
            github: 'https://github.com/tytot/medical-record-blockchain',
        },
        tags: [
            'Blockchain',
            'Shell',
            'Java',
            'Hyperledger Fabric',
            'JavaScript',
            'Node.js',
            'HTML',
            'SCSS',
            'Bootstrap',
        ],
    },
    {
        title: 'Minecraft Proximity Discord Chat',
        description: `A system that enables customizable proximity voice chat in a Minecraft server via Discord. 
            Consists of a Node.js REST API, a Java Bukkit plugin, and an executeable WPF .NET interface made using XAML and C#.`,
        icon: faHeadset,
        links: {
            github: 'https://github.com/tytot/medical-record-blockchain',
        },
        tags: ['Java', 'Maven', 'Node.js', 'WPF', 'C#', 'Discord GameSDK', 'XAML'],
    },
    {
        title: 'tylerl.in',
        description: `This website!`,
        icon: faGlobe,
        links: {
            external: 'https://tylerl.in/',
            github: 'https://github.com/tytot/tytot.github.io',
        },
        tags: ['Next.js', 'React', 'JavaScript', 'Node.js', 'Yarn', 'HTML', 'SCSS'],
    },
]

export default projects
