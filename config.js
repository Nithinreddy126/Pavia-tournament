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
  groups: [
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
  teams: [
    "Pavia Falcons",
    "NAM Team",
    "BCCI Bologna",
    "Milan Sforza",
    "Milan Hawks",
    "Milan Tridents"
  ],
  

  /* --- Group Stage Matches --- */
  LeagueMatches: [
    { time: "7:30", period: "AM", num: "01", team1: "TBC",           team2: "TBC"             },
    { time: "8:30", period: "AM", num: "02", team1: "TBC",           team2: "TBC"             },
    { time: "9:30", period: "AM", num: "03", team1: "TBC",           team2: "TBC"             },
    { time: "10:30",period: "AM", num: "04", team1: "TBC",           team2: "TBC"             },
    { time: "11:30",period: "AM", num: "05", team1: "TBC",           team2: "TBC"             },
    { time: "12:30",period: "PM", num: "06", team1: "TBC",           team2: "TBC"             }
  ],

  /* --- Knockout Stage Matches --- */
  knockoutMatches: [
    { time: "1:40", period: "PM", label: "Semi-Final 1",  matchup: "(1st vs 4th)",                    isFinal: false },
    { time: "2:40", period: "PM", label: "Semi-Final 2",  matchup: "(2nd vs 3rd)",                    isFinal: false },
    { time: "4:00", period: "PM", label: "⚡ Grand Final", matchup: "Winner SF1 vs Winner SF2",       isFinal: true  }
  ],

  /* --- Umpires per match (2 per match, index matches groupMatches) --- */
  /* Set to ["Yet to be confirmed", "Yet to be confirmed"] for all until known */
  umpires: [
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
  notes: [
    "All teams must arrive at least 30 minutes before their scheduled match",
    "Strict timing is essential — delays will not be accommodated"
  ],

  /* --- Match Rules (shown in collapsible accordion) --- */
  rules: [
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
    "The umpire’s decision is final and binding."
    "Only Standard bats or allowed. Hallow bats and modified bats are not allowed"
    
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
