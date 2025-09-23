# Testing and Bugfixing

During development, I utilized **[Chrome DevTools](https://developer.chrome.com/docs/devtools)** extensively for testing and debugging, especially across various screen sizes and devices. This iterative process helped identify and resolve numerous bugs, layout issues, and visual inconsistencies.


## Testing User Goals

To ensure that Zen Grid meets the needs of both new and returning users, I tested each user goal from the README against the deployed site.

### New User Goals

- **Start a game without friction**
  - *Test:* Open site → select difficulty → puzzle generated immediately
  - *Result:* Works as intended

- **Learn the rules**
  - *Test:* Click **Help button** → rules modal appears with clear instructions
  - *Result:* Works as intended

- **Get comfortable with the interface**
  - *Test:* Interact with tiles and number input → visual highlights and feedback appear
  - *Result:* Works as intended

- **Experience a distraction-free environment**
  - *Test:* Observed UI during gameplay → minimalist design with no ads/clutter
  - *Result:* Works as intended

### Returning User Goals

- **Resume a previous game**
  - *Test:* Start a puzzle → refresh page → puzzle state persisted correctly
  - *Result:* Works as intended

- **Track progress and improve**
  - *Test:* Made mistakes → errors counter updated accordingly
  - *Result:* Works as intended

- **Challenge themselves with difficulty selection**
  - *Test:* Switched between **Easy**, **Medium**, and **Hard** → puzzles generated correctly
  - *Result:* Works as intended

- **Feel a sense of accomplishment**
  - *Test:* Completed puzzles with and without errors → received varied completion messages
  - *Result:* Works as intended


## Fixed Bugs and Issues

- Feature: Webpage Aspect Ratio Formula
  - **Bug:** On several screen sizes module sizes looked inconsistent, discovered during wireframe representation.
    - **Fix:** Replaced 30:42 ratio with actual 29:42.

- Feature: Custom Alert Boxes (new game, restart confirmation, game rules pop-up)
  - **Bug:** Alerts were not centered on screens with significant aspect ratio differences (e.g., 1:2) due to incorrect units.
    - **Fix:** Replaced width units from `vh` to `%` for alert class.

- Feature: Website SEO
  - **Issue:** No meta description tag provided.
    - **Fix:** Added meta description.

- Feature: Errors Counter
  - **Bug:** Errors counter value increased when the same incorrect number input was clicked multiple times.
    - **Fix:** Added condition to check if clicked incorrect number was already placed.

- Feature: JavaScript Validation
  - **Issue:** Multiple warnings about using modern JavaScript version.
    - **Fix:** Added `/* jshint esversion: 6 */` comment at the top of both JS files.

- Feature: Website Accessibility
  - **Issue:** ARIA labels were not provided for all main elements.
    - **Fix:** Added ARIA labels for all interactive elements.

- Feature: Number Inputs Intuitive Usage on PC
  - **Issue:** Since number inputs used `div` instead of `button`, no pointer cursor appeared on hover.
    - **Fix:** Added `cursor: pointer` style for number input elements.

- Feature: Responsive Design
  - **Issue:** Game board was not centered vertically on mobile devices and stayed at the top.
    - **Fix:** Set `height: 100vh; display: flex; flex-direction: column; justify-content: space-between;` for `body` tag. Due to modular design, no other fixes were needed.

- Feature: Disabling Input Numbers (when all 9 placed in puzzle)
  - **Bug:** Incorrectly placed numbers could disable number inputs.
    - **Fix:** Moved increment of correctly placed numbers after condition ensuring correct placement.

- Feature: Placed Numbers Highlight (clicking number input when no tile selected)
  - **Bug 1:** Previously highlighted tiles stayed highlighted on new selection.
    - **Fix:** Added call of `removeHighlightNumbers()` at the start of `highlightNumbers()`.
  - **Bug 2:** Null reference exception when checking length of `highlightedNumbers` variable.
    - **Fix:** Initialized variable with `[]` instead of `null`.

- Feature: Disabling Input Numbers on New Game
  - **Bug:** After starting a new game, inputs disabled in the previous game stayed disabled.
    - **Fix:** Reset placed numbers variable, removed input elements, and redrew new ones on new game/restart.

- Feature: Website Responsiveness on Various Screen Sizes
  - **Issue:** Original guide’s approach assumed static website with fixed sizes.
    - **Fix:** Used `rem` units instead of `px`. Final design defines aspect ratio and adjusts font size to viewport size using formula: `min(calc(100vw / 29), calc(100vh / 42))`

- Feature: Tile ID Calculation Formula
  - **Issue:** Overcomplicated `switch` statement for finding sector.
    - **Fix:** Replaced with formula: `sector = ((column - column % 3) / 3) + (row - row % 3) + 1`

#### Beyond these, numerous smaller improvements and additional fixes are thoroughly documented in the project’s commit history for detailed reference.


## Bugs to Fix

- Not found yet


## Accessibility

Accessibility was considered from the very beginning of the design process, with a focus on a minimalist aesthetic and user-friendly interaction. Because of this, no additional changes were required later to meet accessibility standards.

- **Lighthouse Audit:** Achieved a score of 100 for accessibility.
  [View result screnshoot]()

- **Accessibility Checker Audit:** Achieved a score of 95%.
  [View detailed report by link](https://www.accessibilitychecker.org/audit/?website=https%3A%2F%2Fsasha-fedorov.github.io%2Fzen-grid%2F&flag=us)


## Lighthouse

I ran multiple **Lighthouse** audits on the deployed version of the site to measure performance, accessibility, best practices, and SEO.

These results confirm that the website is optimized and accessible. Due to the initial focus on quality and minimalism during development, no major changes were required to reach these scores. The only adjustment made was **adding a meta description** to improve the SEO score.

![Lighthouse Report](documentation/images/lighthouse.png)


## Validation

To ensure clean, standards-compliant code, I regularly used the **[W3C Web Validator extension](https://marketplace.visualstudio.com/items?itemName=CelianRiboulet.webvalidator)** in Visual Studio Code throughout the development process.

After finishing the project’s JavaScript code, I validated it with **[JSHint](https://jshint.com/)**.  
The only required fix was adding the `/* jshint esversion: 6 */` comment at the top of the files, since the project uses modern JavaScript (ES6).

#### For full validation results (HTML, CSS, and JavaScript), see the **[Validation section in the main README](README.md#validation)**.
