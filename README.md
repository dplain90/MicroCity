Micro City
=====

Micro City is a media-rich adaptive programming game for students ages 10-13 built with React/Redux & EaselJS.


---------------
1. Clone or download repo and navigate to root directory.
2. Start Rack Server by running ``` ruby game.rb ``` in console.
3. Navigate to http://localhost:3000/ in your browser.
4. Have fun!

Implementation Details
---------------


Workstation
---------------
The workstation is the area of the canvas in which the user can manipulate which blocks of code they would like to run.

A palette of options is provided on the left which can be dragged and dropped into an editor panel.

Architecture
--------------
Ordering of the blocks positions in the editor is maintained by a doubly linked list which allows for blocks to be inserted easily to any location within the editor.

Additionally, each block is also a node in a n-ary tree, where the node's parent references the nearest closure (loop, conditional, or top-layer).





Each functional 'block' of code represents a

Back-End
---------------

 Candidate moves for each piece on the board are provided by iterating over predefined sets of x,y increments for each class of piece, and then recursively compiling applicable positions.

```ruby
 def moves
    self.directions
      .values
      .map{ |dir| candidates(position, dir) }
      .flatten(1)
  end
```  

Moves is responsible for iterating over each potential direction a piece can go and calling the candidates method.


```ruby
 def candidates(pos, dir, results = [])
    pos = calc_new_pos(pos, dir) if pos == position
    return results if off_board?(pos) || same_color?(pos)
    results << pos
    return results if board.color_of_position(pos) == enemy_color
    candidates(calc_new_pos(pos, dir), dir, results)
  end
```

  Candidates will collect positions that meet necessary criteria for a candidate move (space does not contain own color, is not out of bounds, etc.). This is a method on the parent class of Piece. Certain pieces have special requirements for determining candidate moves, such as the King, Pawn, & Knight. In these cases, the child class overrides this method with it's own criteria.

Front-End
----------

After the HTML is populated via Rack, events and AJAX calls are managed by two classes, Board & Space. Upon the initial render, a Board class is instantiated which conducts a nested loop to populate each DOM element with an instantiation of the Space class. The Space class sets up and handles the onClick events and holds it's designated DOM element as a prop.

When instantiated each Space is also given the Board object in it's constructor. This allows for the onClick callback to be handled by the Board class which waits until both a starting position and ending position have been collected before sending an AJAX request to the back-end to update the grid:

```javascript
updateMove(newPos){
        return (e) => {
          this.move.push(newPos);
          if(this.move.length > 1){
            this.sendMove();
          }
        }
      }
 ```

Once a response is received, the two Space objects that will change call their setValue function which updates their DOM element's textContent to it's new value. By pinpointing these two objects, re-rendering is minimized to the bare-minimum. If errors are sent back in the AJAX response, they are appended to the board's container.

```javascript
updateValue(pos, val) {
        let x = pos[0];
        let y = pos[1];
        this.grid[x][y].setValue(val);
      }

setValue(val){
        this.spaceEl.textContent = val;
      }
 ```


Todos
-----

* [ ] Square Colors
* [ ] Static Piece Images
* [ ] Castling, Pawn Graduations, etc.














## JS Project Proposal: MicroCity

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
