import Tetris from "../Tetris.js";
import Score from "../Score.js";
import R from "../ramda.js";

const example_game = Tetris.new_game();
const field_string = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-S--------
SSS-------
SSSZ-IOOJJ
TSZZ-IOOJJ
TTZL-IOOJJ
TLLL-IOOJJ`;
example_game.field = field_string.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

describe("Score", function () {
    it(
        `A new tetris game
        * Starts on level one
        * With no lines cleared
        * With a score of zero`,
        function () {
            const new_game = Tetris.new_game();
            const score = new_game.score;
            if (Score.level(score) !== 1) {
                throw new Error("New games should start on level one");
            }
            if (score.lines_cleared !== 0) {
                throw new Error("New games should have no lines cleared");
            }
            if (score.score !== 0) {
                throw new Error("New games should have a zero score");
            }
        }
    );

    it(
        `The score tracks the lines that get cleared`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game = Tetris.hard_drop(game);

            if (game.score.lines_cleared !== 4) {
                throw new Error("Expecting 4 lines to clear");
            }
        }
    );

    it(
        `A single line clear scores 100 × level`,
        function () {
            let game = example_game;
            // Slot a T tetromino into the hole and drop.
            // This can only go one deep.
            game.current_tetromino = Tetris.T_tetromino;

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });
            console.log('Current score:', game.score.score);

            if (game.score.score !== 100) {
                throw new Error("A single row cleared should score 100");
            }
        }
    );

    it(
        `A double line clear scores 300 × level`,
        function () {
            let game = example_game;
            game.current_tetromino = Tetris.L_tetromino;
            game = Tetris.rotate_cw(game);
            // Slot a L tetromino rotated into the hole and drop.
            // This can only go two deep.
        
        R.range(0,22).forEach(function(){
            game = Tetris.next_turn(game);
        });
        if (game.score.score !== 300)
            throw new Error("A double line cleared should score 300");
        }
    );







    
    it(
        `A triple line clear scores 500 × level`,
        function () {

            const example_game2 = Tetris.new_game();
            const field_string2 = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-S--------
SSS-------
SSSZ--OOJJ
TSZZ-LOOJJ
TTZL-LOOJJ
TLLL-LOOJJ`;
            
            example_game2.field = field_string2.split("\n").map(
                (s) => s.replace(/-/g, " ").split("")
            );
            let game = example_game2;
           
            // Slot a I tetromino rotated into the hole and drop.
            // This can only go four deep
            //however the top of the I tetromino does not create a full cleared line in example_game2
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
        R.range(0,24).forEach(function(){
                game = Tetris.next_turn(game);
        });


        if (game.score.score !== 500) {
            throw new Error("A triple line cleared should score 500");
        }}
    );


    it(
        `A tetris scores 800 × level`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);

        R.range(0,22).forEach(function(){
            game = Tetris.next_turn(game);
        });
        if (game.score.score !== 800) {
            throw new Error("A tetris should score 800");
        }
    });

    it(
        `Back to back tetrises score 1200 × level`,
        function () {
            const example_game3 = Tetris.new_game();
            const field_string = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
TLLL-IOOJJ
TTZL-IOOJJ
TSZZ-IOOJJ
SSSZ-IOOJJ
SSSZ-IOOJJ
TSZZ-IOOJJ
TTZL-IOOJJ
TLLL-IOOJJ`;
            example_game3.field = field_string.split("\n").map(
                (s) => s.replace(/-/g, " ").split("")
            );

            let game = example_game3
            // Slot a I tetromino rotated into the hole and drop.
            // This can only go four deep
            //This is repeated twice
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game.score.Tetris = true
            R.range(0,22).forEach(function(){
                game = Tetris.next_turn(game);
            });
        if (game.score.score !== 1200) {
            throw new Error("Back to back tetrises should score 1200");
        }
    });

    it(
        `A soft drop score 1 point per cell descended`,
        function () {
            let game = example_game;
            // Slot a S tetromino into game
            // This does not go deep therefore
            // This cannot create a cleared line so score only goes up by one due to soft drop
            game.current_tetromino = Tetris.S_tetromino;
            game= Tetris.soft_drop(game);

        if (game.score.score !== 1) {
            throw new Error("soft drop score 1 point per cell descended");
        }
    });


    it(
        `A hard drop score 2 point per cell descended`,
        function () {
            const example_game4 = Tetris.new_game();
            const field_string4 = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------`;
            example_game4.field = field_string4.split("\n").map(
                (s) => s.replace(/-/g, " ").split("")
            );

            let game = example_game4;
            game.current_tetromino = Tetris.I_tetromino;
            game= Tetris.hard_drop(game);
            // This scores 2 points per cell(row) descended x 21 rows

        if (game.score.score !==42 ) {
            throw new Error("A hard drop score 2 point per cell descended");
        }
    });

    it(
        `Advancing the turn without manually dropping scores nothing.`,
        function () {
        
            let game = example_game;
            
            R.range(0, 3).forEach(function () {
                game = Tetris.next_turn(game);
            });

        
            // Implement this function.
            if (game.score.score !== 0) {
                throw new Error("Advancing the turn without manually dropping scores zero");
            }
        }
    );
});