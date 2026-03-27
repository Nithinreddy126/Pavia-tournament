/* ============================================================
   ✏️  EASY EDIT ZONE — Change all tournament data here
   ============================================================ */

const CONFIG = {

  /* --- Tournament Info --- */
  tournamentName: "Pavia Cricket Tournament",
  year: "2026",
  date: "April 4, 2026",
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
      teams: ["MM Blasters", "Bologna", "Novie Luigi"]
    }
  ],

  /* --- Teams (used for filter dropdown) --- */
  teams: [
    "Pavia Falcons",
    "Underdogs",
    "MM Blasters",
    "Novie Luigi",
    "Torino Thunders",
    "Bologna"
  ],

  /* --- Group Stage Matches --- */
  groupMatches: [
    { time: "7:30", period: "AM", num: "01", team1: "Pavia Falcons",   team2: "Underdogs"       },
    { time: "8:30", period: "AM", num: "02", team1: "MM Blasters",     team2: "Novie Luigi"     },
    { time: "9:30", period: "AM", num: "03", team1: "Torino Thunders", team2: "Underdogs"       },
    { time: "10:30",period: "AM", num: "04", team1: "Bologna",         team2: "MM Blasters"     },
    { time: "11:30",period: "AM", num: "05", team1: "Pavia Falcons",   team2: "Torino Thunders" },
    { time: "12:30",period: "PM", num: "06", team1: "Bologna",         team2: "Novie Luigi"     }
  ],

  /* --- Knockout Stage Matches --- */
  knockoutMatches: [
    { time: "1:40", period: "PM", label: "Semi-Final 1",  matchup: "Group A (1st) vs Group B (2nd)", isFinal: false },
    { time: "2:40", period: "PM", label: "Semi-Final 2",  matchup: "Group B (1st) vs Group A (2nd)", isFinal: false },
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
    "Rules will not be changed during the match. Only a captain should speak for a team.",
    "8 overs per side. Only one bowler can bowl maximum of 3 overs rest can bowl only 2 overs.",
    "1st over is power play. During the power play, only two fielders are allowed outside the inner circle.",
    "1 run per wide, 1 run per no ball. Second bounce will be given as a dead ball — called only by the leg umpire.",
    "Free hit for all types of no balls. 1 run will be given.",
    "No leg byes, no byes — only overthrows are allowed.",
    "Boundaries will be explained on field with the captain.",
    "Umpire's decision is final. One player from each team must participate as umpire.",
    "Playing '8' (your playing XI) must be declared to the umpire and scorers before the game.",
    "The '8's cannot be changed during the match. If a team qualifies for the finals, the captain may change the '8's for the final only.",
    "If the ball hits the electric line, the whole pole, or its base — it is a dead ball.",
    "Overthrows are allowed. If the ball goes behind the wickets on an overthrow, extra runs plus the overthrow are added.",
    "If the ball touches the bat and goes behind the wickets, one run is declared.",
    "In case of a big deflection (bounce or low ball), it is at the umpire's discretion to call a dead ball."
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
       { label: "📌", value: "https://maps.app.goo.gl/1RXcw3dLd5ZSRfJr9" }
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