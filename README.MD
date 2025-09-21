# ![favicon](documentation/images/favicon-20-20.svg) Zen Grid - Sudoku Online Website

About
Zen Grid is a modern Sudoku web application designed for focus and relaxation. The website's core philosophy is to provide a clean, minimalist, and distraction-free experience, allowing players to fully immerse themselves in the logic of the puzzle. With its elegant interface and intuitive design, Zen Grid offers a calm aesthetic for those who love a simple yet challenging puzzle game.

![Responsive Mockup](documentation/images/mockup.webp)

This website is **deployed using GitHub Pages** and can be accessed at: **[https://sasha-fedorov.github.io/zen-grid/](https://sasha-fedorov.github.io/zen-grid/)**


## User Experience (UX) & User Stories

The design of Zen Grid is guided by three core UX principles: Clarity, Intuitive Feedback, and a Streamlined Interface. Each ** Feature has been meticulously crafted to provide a user experience that is not only functional but also enjoyable and stress-free.

### User Stories and Features:
- **Feature: Dynamic Puzzle Generation**
  - As a player, I want to get a unique puzzle with a single solution every time so that each game is a fresh challenge.
- **Feature: Difficulty Selection**
  - As a player, I want to be able to choose between easy, medium, and hard difficulties so I can challenge myself and track my progress.
- **Feature: Errors Count**
  - As a player, I want to see a count of my mistakes so I can track my performance and aim for a flawless game.
- **Feature: Restart Button**
  - As a player, I want to have the option to restart a puzzle to try solving it without errors.
- **Feature: Help Button**
  - As a player, I want to have access to the game rules so I can remember them if I'm a new player or need a refresher.
- **Feature: Game State Persistence**
  - As a player, I want my game progress to be saved automatically so I can leave and come back to the puzzle at any time.
- **Feature: Placed Numbers Highlight**
  - As a player, I want immediate visual feedback on my moves, with incorrect numbers colored red and correct ones in a different color, to quickly identify and fix my mistakes.
- **Feature: Context Highlighting (Tile Selection)**
  - As a player, when I select a cell, I want its corresponding row, column, and 3x3 sector to be highlighted to help me focus on the relevant areas of the board.
- **Feature: Context Highlighting (Number Selection)**
  - As a player, when I select a number from the input panel, I want all instances of that number on the board to be highlighted to help me find and place them.
- **Feature: Variative Game Completion Messages**
  - As a player, I want to receive a personalized completion message based on my performance to make the experience more rewarding and motivating.

### User goals

#### New User Goals

A new user's primary goal is to quickly understand the game and begin playing. Zen Grid provides a welcoming and straightforward experience, enabling them to:

- **Start a game without friction:** Easily select a difficulty and get a unique puzzle immediately.
- **Learn the rules:** Access a clear and concise "How to play" guide via the help button.
- **Get comfortable with the interface:** Understand how to select tiles and input numbers with clear visual feedback.
- **Experience a distraction-free environment:** Focus on solving the puzzle without unnecessary visual clutter.

#### Returning User Goals
A returning player's goals are focused on challenge, continuity, and mastery. Zen Grid helps them:

- **Resume a previous game:** Continue a puzzle exactly where they left off thanks to game state persistence.
- **Track progress and improve:** Monitor their performance with the errors counter and try to achieve a flawless solve on any difficulty.
- **Challenge themselves:** Easily switch between different difficulty levels to increase the challenge as their skills grow.
- **Feel a sense of accomplishment:** Receive personalized completion messages that acknowledge their performance and motivate them to tackle a new challenge.


## Design

The design of Zen Grid is a key part of the user experience, focusing on a clean and minimalist aesthetic.

### Color Scheme

The website utilizes a "Zen Palette", a color scheme built on shades of Bootstrap's neutral grays. This palette, complemented by accent colors for highlights and errors, is designed to minimize visual load and create a calm, focused environment for solving puzzles.

<!-- TODO: an image of color scheme -->

### Typography

Zen Grid's typography is carefully selected for both readability and style. The body text and numbers use the **Quicksand** font, chosen for its good legibility. This is paired with **Goldman** for the main "Zen Grid" heading, which provides a distinctive, matching aesthetic. The combination of these fonts contributes to the site's modern and clean feel.

<!-- TODO: add an image of typography -->

### Imagery
The site's only custom image is a favicon, which also serves as a brand logo in the header. The icon is a simplified representation of a 3x3 Sudoku sector, with numbers placed to signify a correct, incorrect, and pre-filled cells. It is designed with bolder font weight and borders to ensure it remains recognizable even at a small size in a browser tab. This imagery connects the user's browser tab to the website and reinforces the brand's identity.

![Website Favicon](assets/images/favicon.svg)

<!-- TODO: make an image with favicon and the heading screenshot with it on a side -->

### Features (Design Aspect)
<!-- TODO: make a lot of screenshots -->

Zen Grid was designed with a modular, mobile-first approach. The layout uses CSS Flexbox and Grid to ensure the elements are well-proportioned across different screen sizes. The fluid font-size calculation and use of `rem` units ensure that all text scales gracefully, making the game playable on both mobile devices and larger screens.

- **Header**
  - The prominent heading reinforces the "Zen Grid" brand, accompanied by the favicon icon.

- **Controls Section**
  - This section houses the core game controls in an organized, responsive layout. It includes the mode selection buttons, the errors counter for tracking mistakes, and buttons for restarting the puzzle or accessing the game rules.

- **Board**
  - The central element of the page, the Sudoku board, is a grid designed to be easy to read and interact with on any device.

- **Number Inputs**
  - The number input section provides a simple and clear way for users to enter their answers. The numbers are dynamically removed as the player correctly places all instances of that number.

- **Copyright Footer**
  - A simple and unobtrusive footer provides a link to the developer's GitHub page and copyright information.

- **Highlights**
  - **Selected Input Number Highlight:** When a number on the input panel is selected, all instances of that number on the board are highlighted. This feature helps players to quickly locate numbers and plan their next moves.
  - **Selected Tile Highlight:** Selecting a tile on the board triggers a visual highlight of its corresponding row, column, and 3x3 sector. This provides clear visual guidance and helps players focus on the related cells.

- **Alerts and Confirmation Boxes**
  - **Game Rules:** A clear and concise modal that explains the rules of Sudoku to new players.
  - **New Game Confirmation:** A confirmation dialog appears when a player attempts to start a new game, preventing the accidental loss of a current game's progress.
  - **Restart Confirmation:** A simple confirmation box gives the player an opportunity to restart the current puzzle and aim for a better score.
  - **Puzzle Completion:** A personalized alert message congratulates the player on completing the puzzle, with messages that vary depending on the difficulty and number of errors.


## Technologies Used

### Languages and Frameworks

- HTML5
- CSS3
- JavaScript ES6
- Bootstrap 5

### Tools & Programs

- **[VS Code](https://code.visualstudio.com/)** – used as the main code editor for development
- **[Google Chrome](https://www.google.com/chrome/)** – utilized for Browse, testing, and verifying website functionality across various user experiences
- **[Chrome DevTools](https://developer.chrome.com/docs/devtools)** – used for debugging, testing website features and responsiveness
- **[Figma](https://www.figma.com/)** – used to create site favicon and documentation images
- **[WebP Converter](https://developers.google.com/speed/webp)** – used to resize and compress images for this documentation
- **[Fork](https://fork.dev/)** – used as a Git client for version control and managing project commits


### Services

- **[GitHub](https://github.com/)** – hosted the project repository for version control and collaboration
- **[GitHub Pages](https://pages.github.com/)** – deployed the static website for public access
- **[ChatGPT](https://chat.openai.com/)** – helped generate written content (but not code), as a seach engine, and a problem-solve-helper
- **[Gemini](https://gemini.google.com/)** – helped generate content for this README
- **[Am I Responsive](https://ui.dev/amiresponsive)** – used to create website mockup for this documentation

