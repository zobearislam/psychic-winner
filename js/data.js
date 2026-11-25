const DEPARTMENTS = [
  {
    id: "history",
    icon: "🏛️",
    name: "History",
    desc: "Explore events, people, empires and civilizations."
  },
  {
    id: "geography",
    icon: "🌍",
    name: "Geography",
    desc: "Understand countries, landscapes, rivers and borders."
  },
  {
    id: "civics",
    icon: "⚖️",
    name: "Government & Civics",
    desc: "Learn about constitutions, institutions and citizenship."
  },
  {
    id: "economics",
    icon: "📜",
    name: "Economics",
    desc: "Discover trade, resources, industry and development."
  },
  {
    id: "culture",
    icon: "🎭",
    name: "Society & Culture",
    desc: "Explore languages, traditions, literature and heritage."
  }
];

// Add courses here.
// Each question needs: q, options, correct and explanation.

const COURSES = [
  {
    id: "bangladesh-history-1",
    department: "history",
    title: "Introduction to Bangladesh's History",
    level: "Beginner",
    description: "A starting point for exploring the history of Bengal and Bangladesh.",
    lessons: [
      {
        id: "bdh1-l1",
        title: "The land of Bengal",
        note: "Bengal is a historical region shaped by rivers, agriculture, trade and cultural exchange.",
        questions: [
          {
            q: "Which river system has strongly shaped the Bengal delta?",
            options: [
              "Nile river system",
              "Ganges–Brahmaputra–Meghna system",
              "Amazon river system",
              "Danube river system"
            ],
            correct: 1,
            explanation: "The Ganges, Brahmaputra and Meghna river systems shape the Bengal delta."
          },
          {
            q: "What is a delta?",
            options: [
              "A desert plateau",
              "Land formed by river deposits near a river mouth",
              "A mountain glacier",
              "A deep ocean trench"
            ],
            correct: 1,
            explanation: "A delta forms as a river deposits sediment near its mouth."
          },
          {
            q: "Which activity has historically been important in Bengal's riverine communities?",
            options: [
              "Agriculture and fishing",
              "Arctic mining",
              "Alpine skiing",
              "Desert caravans only"
            ],
            correct: 0,
            explanation: "Fertile land and extensive waterways supported farming, fishing and trade."
          }
        ]
      },
      {
        id: "bdh1-l2",
        title: "Bengal through time",
        note: "Historical periods overlap and change over time. Look at evidence and context when studying them.",
        questions: [
          {
            q: "Which of these is an important source for studying the past?",
            options: [
              "Archaeological remains",
              "Only modern advertisements",
              "Weather forecasts alone",
              "Unverified rumours"
            ],
            correct: 0,
            explanation: "Artifacts, buildings, inscriptions and written records help historians investigate the past."
          },
          {
            q: "What does chronology help historians understand?",
            options: [
              "The order of events in time",
              "The colour of old objects",
              "The height of mountains",
              "The size of a modern city"
            ],
            correct: 0,
            explanation: "Chronology places events in their sequence in time."
          }
        ]
      }
    ]
  },

  {
    id: "geography-1",
    department: "geography",
    title: "Understanding Bangladesh's Geography",
    level: "Beginner",
    description: "Explore the rivers, delta and physical landscape of Bangladesh.",
    lessons: [
      {
        id: "geo-l1",
        title: "A river-shaped landscape",
        note: "Physical geography studies natural features and processes.",
        questions: [
          {
            q: "Bangladesh is located in which part of Asia?",
            options: [
              "Central Asia",
              "South Asia",
              "East Asia",
              "West Asia"
            ],
            correct: 1,
            explanation: "Bangladesh is a country in South Asia."
          },
          {
            q: "Which type of landscape is especially prominent in Bangladesh?",
            options: [
              "River delta and floodplain",
              "Polar ice sheet",
              "High volcanic plateau",
              "Vast inland desert"
            ],
            correct: 0,
            explanation: "Much of Bangladesh consists of low-lying deltaic plains and floodplains."
          }
        ]
      }
    ]
  },

  {
    id: "civics-1",
    department: "civics",
    title: "Introduction to Government",
    level: "Beginner",
    description: "Learn basic ideas about public institutions and civic life.",
    lessons: [
      {
        id: "civ-l1",
        title: "What is a constitution?",
        note: "Constitutions vary between countries. Always study the specific text and context.",
        questions: [
          {
            q: "What is a constitution generally?",
            options: [
              "A country's fundamental legal framework",
              "A list of tourist attractions",
              "A trade receipt",
              "A weather report"
            ],
            correct: 0,
            explanation: "A constitution establishes fundamental rules and structures for a state."
          },
          {
            q: "Which is a common role of a legislature?",
            options: [
              "Making laws",
              "Forecasting rainfall",
              "Operating every private shop",
              "Measuring earthquakes"
            ],
            correct: 0,
            explanation: "Legislatures debate and make laws, according to each country's system."
          }
        ]
      }
    ]
  },

  {
    id: "economics-1",
    department: "economics",
    title: "Economics in Everyday Life",
    level: "Beginner",
    description: "Start learning about needs, resources, choices and trade.",
    lessons: [
      {
        id: "eco-l1",
        title: "Scarcity and choice",
        note: "Economics studies how people and societies make choices with limited resources.",
        questions: [
          {
            q: "What does scarcity mean in economics?",
            options: [
              "Resources are limited relative to wants",
              "Everything is unlimited",
              "Prices never change",
              "Trade does not exist"
            ],
            correct: 0,
            explanation: "Scarcity means available resources are limited compared with people's wants."
          },
          {
            q: "What is an opportunity cost?",
            options: [
              "The next-best alternative given up",
              "A shop's opening time",
              "A country's population",
              "A type of currency"
            ],
            correct: 0,
            explanation: "Opportunity cost is the value of the next-best alternative forgone."
          }
        ]
      }
    ]
  },

  {
    id: "culture-1",
    department: "culture",
    title: "Culture and Heritage",
    level: "Beginner",
    description: "Explore how communities express identity and pass on traditions.",
    lessons: [
      {
        id: "cul-l1",
        title: "Understanding culture",
        note: "Cultures are diverse and dynamic; no single description represents every person in a community.",
        questions: [
          {
            q: "Which can be part of cultural heritage?",
            options: [
              "Language, music and historic places",
              "Only national borders",
              "Only modern machines",
              "Only weather patterns"
            ],
            correct: 0,
            explanation: "Cultural heritage can include language, arts, traditions, buildings and shared practices."
          },
          {
            q: "Is culture always unchanging?",
            options: [
              "Yes, it never changes",
              "No, culture can change over time",
              "Only ancient cultures change",
              "Culture changes only by law"
            ],
            correct: 1,
            explanation: "Culture is dynamic and can change through contact, innovation and generations."
          }
        ]
      }
    ]
  }
];
