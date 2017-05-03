## Sample JS Project Proposal: MicroCity

### Background

MicroCity will be a media-rich adaptive programming envirorment for students age 10-13. Similar to applications such as Scratch, it will use block-programming visuals along with a 2D grid which will provide real-time feedback based upon the user submitted code. 

### Functionality & MVP  

Users will be able to:

- [ ] Drag and drop code blocks representing basic loops, methods, and object properties
- [ ] Start execution of user-chosen script with corresponding animation 
- [ ] Ability to toggle between code-blocks and text editing.

In addition, this project will include:

- [ ] A literature review README
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, panel of available code-blocks, and a workspace for creating code snippets. There will be a Start button on the upper right hand corner to begin execution of user-selected code.

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- `Easel JS` for rendering and animation. 
- `Browserify` to bundle js files.

### Implementation Timeline

**Day 1**: Setup node modules for the main sections of the game board, code-block panels, and workspace. Get workspace to toggle between text and code-block.

**Day 2**: Dedicate this day to learning the Easel JS.  First, build out the grid (game board) with static data, ensuring animations render and operate correctly. Then, setup logic for key, value pairs for code-blocks and get the code blocks to trigger the appropriate animation onClick for the Start button. 

**Day 3**: Work on how errors will be handled when user does not complete task. Ensure errors render properly and game will not hang due to specific combinations of blocks. 

**Day 4**: Install the text toggle feature and handle syntax errors for text. Work on finishing touches for styling, animation, and toggles.  
