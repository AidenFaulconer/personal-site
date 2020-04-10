// scripts to process this are in html file
const contentConfig = {
    meta: {
      charset: 'utf-8',
      XUACompatible: 'IE=edge',
      cacheControl: ['no-transform', 'no-siteapp'],
      author: 'Aiden Faulconer',
      copyright: '2019 Aiden Faulconer',
      robots: 'INDEX, FOLLOW',
      creationDate: '',
      viewport: ['width=device-width', 'initial-scale=1', 'shrink-to-fit=no'],
      description: 'Personal website for Aiden Faulconer',
      x5fullscreen: 'false',
      x5orientation: 'portrait',
      appleTouchIcon: {
        '57x57': 'https://i.imgur.com/IaVPGpn.png',
        '60x60': 'https://i.imgur.com/IaVPGpn.png',
        '72x72': 'https://i.imgur.com/IaVPGpn.png',
        '76x76': 'https://i.imgur.com/IaVPGpn.png',
        '114x114': 'https://i.imgur.com/IaVPGpn.png',
        '120x120': 'https://i.imgur.com/IaVPGpn.png',
        '144x144': 'https://i.imgur.com/IaVPGpn.png',
        '152x152': 'https://i.imgur.com/IaVPGpn.png',
        '180x180': 'https://i.imgur.com/IaVPGpn.png'
      },
      icon: {
        192: 'https://i.imgur.com/IaVPGpn.png',
        32: 'https://i.imgur.com/IaVPGpn.png',
        96: 'https://i.imgur.com/IaVPGpn.png',
        16: 'https://i.imgur.com/IaVPGpn.png'
      },
      msapplicationTileColor: '#000000',
      msapplicationTileImage: 'https://i.imgur.com/IaVPGpn.png',
      themeColor: '#000000',

      // <!-- Meta Social Sharing  -->
      // <!-- Twitter Card data -->
      twitter: {
        card: 'summary',
        site: '@account',
        title: 'Aiden Faulconer',
        description: "Aiden Faulconer's website",
        creator: '@AidenFaulconer',
        image: 'https://i.imgur.com/IaVPGpn.png'
      },

      // <!-- Open Graph (Fb, G+, Pin..) data -->
      openGraph: {
        title: 'Aiden Faulconer',
        type: 'article',
        url: '',
        image: 'https://i.imgur.com/IaVPGpn.png',
        description: "Aiden Faulconer's website'",
        sitename: 'Aiden Faulconer',
        fbAdmins: '0000000000'
      }
    },
    technical: {
      AOS: {
        animDuration: 1000
      },
      scrollCheck: {
        checkThreshold: 20,
        scrollOffset: 500
      }
    },
    projects: {
      card1: {
        model: false,
        title: 'Movement Recognition in VR',
        mediaUrl: 'https://i.imgur.com/t55NQ7m.mp4',
        catagory: 'VR Application',
        description: `Scores users movement against pre-recorded movement. Providing an
        extensible solution for training, used here in the context of Tai Chi`
      },
      card2: {
        model: false,
        title: 'On Closer Inspection',
        mediaUrl: 'https://i.imgur.com/2acj61h.mp4',
        catagory: 'Fullstack Application',
        description: `A project I was involved in during my time at the Australian War Memorial, a configurable VR
                experience for virtual exhibits`
      },
      card3: {
        model: false,
        title: 'OpenGL Game engine',
        mediaUrl: 'https://i.imgur.com/RO4eieT.mp4',
        catagory: 'Graphics Programming',
        description: `Minimal viable game engine coded in c++ on top of openGL`
      },
      card4: {
        model: false,
        title: 'Python apps',
        mediaUrl: 'https://i.imgur.com/jaP2kH5.mp4',
        catagory: 'Desktop Application',
        description: `simple console/GUI apps made in python`
      },
      card5: {
        model: true,
        title: '3d character',
        mediaUrl: 'https://sketchfab.com/models/64f06381ab2f47139c09875ec0c7b254/embed',
        catagory: '3d Model',
        description: `Rigged game charecter for an upcoming vfx show reel`
      },
      card6: {
        model: true,
        title: 'Mech Bust',
        mediaUrl: 'https://sketchfab.com/models/ea71b4a0e59443529d5cfb082953059b/embed',
        catagory: '3d Model',
        description: `3d mech bust made in z-brush`
      }
    },
    skills: {
      card1: {
        title: 'TEAMWORK',
        description: ` I love working in teams, coming from experience at the Australian War Memorial, being a
Manager in retail, and as a lead developer for Mentoras. I always orient myself towards the teams goals, instead of
just my own.`,
        summaryPoints: ['Empathetic', 'Communicative', 'Collaborative', 'Open-Minded']
      },
      card2: {
        title: 'LEARNING',
        description: `  Im passionite about technology, my actions speak for themselves. I have over <a
              href='https://www.linkedin.com/in/aiden-faulconer/'>20 online course
              certifications</a>
            in IT, fully competent in more than 3 programming languages, and perform daily acts to imporve my
            development & design skills. I also have
            multiple gold badges on <a href='https://www.hackerrank.com/aidenf091?hr_r=1'>Hackerrank</a>. Finally, i'm
            nearing my bachelors degree in software engineering proving my commitment to learning, and providing a
            strong university grade education in IT.`,
        summaryPoints: ['Comitted', 'Passionite about the work I do']
      },
      card3: {
        title: '3D',
        description: ` I love 3d, its the dimension we are built for and its also the new frontier for technology. I know the
            environment really well, from my experience building vr applications, 3d modelling, and designing for 3d
            experiences. All of which comes together to make me a well rounded individial for any 3d related work.
            `,
        summaryPoints: ['Good with Trigonomotry',
          'Understands Shaders',
          'Good at 3d Modelling',
          'Specialised through hobby & professional experience'
        ]
      },
      card4: {
        title: 'TECHNICAL',
        description: ` Being a developer is about being agile, and working with change not against it. Over my career ive learned a
            lot, I am competent in the following tech.`,
        summaryPoints: ['AWS', 'React, Vue, and Gatsby.js',
          'C#, Java, and C++',
          'Drupal, and Wordpress',
          'MongoDB, and MySQL',
          '.NET, ASP.NET, and any MVC framework'
        ]
      },
      card5: {
        title: 'DESIGN',
        description: `I'm a creative individual with attention to detail, I love typography, branding, and visually communicating
          ideas. This compliments my coding skills resulting in products that will speak to your audiences and
          make an aesthetically pleasing experience.`,
        summaryPoints: [
          'great with typography',
          'love UI design',
          'big on Color theory',
          'proficient in all Adobe products & Figma'
        ]
      },
      card6: {
        title: 'UI/UX',
        description: ` I make sure my work is empathetic, and iterates around both the users needs and
          organizations needs. I commit myself to user reasearch before developing products, then wireframe and
          prototype the results all around a clean and organized information architecture. All of this, to make sure
          users keep coming back for more!`,
        summaryPoints: [
          'Organized',
          'Committed to reasearch',
          'Always taking the users perspective'
        ]
      }
    },
    services: {
      card1: {
        title: '3D Graphics',
        description: ``
      },
      card2: {
        title: 'Design',
        description: ``
      },
      card3: {
        title: 'Full-Stack Development',
        description: ``
      }
    },
    about: {
      title: '',
      description: ``,
      mediaUrl: ''
    },
    contact: {
      phone: '+61 0475565709',
      email: 'aidenf09@yahoo.com'
    }
}
export default contentConfig