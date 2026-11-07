# Housebets — Sportsbook Prototype

A clickable front-end prototype for the Housebets Sportsbook Design Contest.
Vanilla HTML, CSS and JavaScript — no frameworks, no build step, sample data only.

**Live demo:** https://beginners17.github.io/housebets-sportsbook/

## Pages
- **Sports home** — live now, starting soon, top competitions, search
- **Live** — every in-play match, sport & competition filters, live clocks
- **Football** — Premier League, Champions League, LaLiga, Serie A, Bundesliga with 1X2 odds and follow stars
- **Match page** — Arsenal v Brighton (live): Popular, Goals, Halves, Handicaps, Goalscorers, Corners & Cards markets
- **Bet slip + My bets** — singles only, stakes in USDT, cash out

## States covered
Odds drift live and flash; a changed price must be accepted before betting;
suspended selections are flagged and block placement; insufficient balance
produces a clear bet-failed state; placed bets move to My Bets with working
cash out. On mobile the slip becomes a bottom bar that expands into a sheet.

## Run locally
Open `index.html` in any browser — everything runs client-side.

## Tools
Designed and hand-coded with Claude (AI assistant). Layout based on the
official contest wireframes.
