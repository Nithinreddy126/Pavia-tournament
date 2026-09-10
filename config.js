/* ============================================================
   ✏️  EASY EDIT ZONE — Change all tournament data here
   ============================================================ */

const CONFIG = {

  /* --- Tournament Info --- */
  tournamentName: "Pavia Cricket Tournament - 2nd Edition",
  year: "2026",
  date: "Sep 12, 2026",
  sport: "Cricket",

  /* --- Logo: paste a URL or a base64 data URI --- */
  logoSrc: "IMG_4607.jpeg",   // set to "" to hide logo (keep non-empty to show)

  /* --- Optional page poster background image (URL/base64) --- */
  backgroundSrc: "IMG_4607.jpeg",   // set to "" to disable (or provide your own image)

  /* --- Groups (used for group display panel) --- */
  Section1: [
    {
      name: "Group A",
      teams: ["Pavia Falcons", "Torino Thunders", "Underdogs"]
    },
    {
      name: "Group B",
      teams: ["MM Blasters", "Bologna", "Novi Ligure"]
    }
  ],

  /* --- Teams (used for filter dropdown) --- */
  Section2: [
    "Pavia Falcons",
    "NAM Team",
    "BCCI Bologna",
    "Milan Sforza",
    "Milan Hawks",
    "Milan Tridents"
  ],
  

  /* --- Group Stage Matches --- */
  Section3: [
    { time: "08:00",  period: "AM", num: "01", team1: "Pavia Falcons", team2: "Milan Sforza"    },
    { time: "09:15",  period: "AM", num: "02", team1: "NAM Team",      team2: "Milan Hawks"     },
    { time: "10:30",  period: "AM", num: "03", team1: "Milan Sforza",  team2: "BCCI Bologna"    },
    { time: "11:45",  period: "AM", num: "04", team1: "Pavia Falcons", team2: "Milan Tridents"  },
    { time: "01:00",  period: "PM", num: "05", team1: "BCCI Bologna",  team2: "Milan Hawks"     },
    { time: "02:15",  period: "PM", num: "06", team1: "NAM Team",      team2: "Milan Tridents"  }
  ],

  /* --- Knockout Stage Matches --- */
  Section4: [
    { time: "TBC", period: "PM", label: "Semi-Final 1",  matchup: "(1st vs 4th)",                    isFinal: false },
    { time: "TBC", period: "PM", label: "Semi-Final 2",  matchup: "(2nd vs 3rd)",                    isFinal: false },
    { time: "TBC", period: "PM", label: "⚡ Grand Final", matchup: "Winner SF1 vs Winner SF2",       isFinal: true  }
  ],

  /* --- Umpires per match (2 per match, index matches groupMatches) --- */
  /* Set to ["Yet to be confirmed", "Yet to be confirmed"] for all until known */
  Section5: [
    ["Yet to be confirmed", "Yet to be confirmed"],
    ["Yet to be confirmed", "Yet to be confirmed"],
    ["Yet to be confirmed", "Yet to be confirmed"],
    ["Yet to be confirmed", "Yet to be confirmed"],
    ["Yet to be confirmed", "Yet to be confirmed"],
    ["Yet to be confirmed", "Yet to be confirmed"],
    // knockouts:
    ["Yet to be confirmed", "Yet to be confirmed"],
    ["Yet to be confirmed", "Yet to be confirmed"],
    ["Yet to be confirmed", "Yet to be confirmed"]
  ],

  /* --- Notes shown at bottom of schedule --- */
  Section6: [
    "All teams must arrive at least 30 minutes before their scheduled match",
    "Strict timing is essential — delays will not be accommodated"
  ],

  /* --- Match Rules (shown in collapsible accordion) --- */
  Section7: [
    "Each match will consist of 8 overs per side, Only one bowler can bowl a maximum of 3 overs.",
    "Only two fielders are allowed outside the inner circle during the first over Powerplay.",
    "A free hit will be awarded for leg-no-balls and waist-height no-balls.",
    "Only one bouncer per over is permitted, A second bouncer in the same over will be called a wide.No head-height no-ball rule applies.",
    "No leg byes, no byes — only overthrows are allowed.",
    "Each team must submit a 10-player squad, and the playing 8 must be selected only from this squad.",
    "Once finalized, the playing 8 cannot be changed; no impact player rule applies, only injury-based substitutions are allowed.",
    "If the ball hits the electric line, pole, or its base, it will be declared a dead ball.",
    "In case of a major deflection (bounce or low ball), the umpire has the discretion to call it a dead ball.",
    "Any ground-specific rules will be communicated to captains before the match.",
    "If a batsman suspects chucking, batsman should step away and not attempt to play the delivery.",
    "The umpire’s decision is final and binding.",
    "Only Standard bats or allowed. Hallow bats and modified bats are not allowed"
    
  ],

  Sections: [
     {Section: "Section1",  Name: "groups", isEnabled: false},
     {Section: "Section2",  Name: "teams", isEnabled: true},
     {Section: "Section3",  Name: "LeagueMatches", isEnabled: true},
     {Section: "Section4",  Name: "knockoutMatches", isEnabled: true},
     {Section: "Section5",  Name: "umpires", isEnabled: false},
     {Section: "Section6",  Name: "notes", isEnabled: true},
     {Section: "Section7",  Name: "rules", isEnabled: true},
  ],

  /* --- Custom Sections (add new sections without touching code) --- */
  /* Set to [] to hide, or add objects like below to create new sections */
  customSections: [
    // Example:
    {
     title: "📍 Venue Information",
     items: [
       { label: "Location", value: "Parco della Vernavola" },
       { label: "Address", value: "Via Torretta, 27100 Pavia PV" },
       { label: "📌", value: "https://maps.app.goo.gl/RMq4KDGw6W8MtZUV7?g_st=ic" }
     ]
    },
    {
      title: "☏ Contact",
      collapsible: false,
      items: [
        { label: "Shreyas", value: "+393483118417" },
        { label: "📧", value: "pavia.cricket@gmail.com" },
      ]
     }
  ]
}
/* ============================================================
   End of Edit Zone
   ============================================================ */
