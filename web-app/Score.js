/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};
const Lines_cleared = {};
const Tetris = {};

/**
 * The score object contains information about the score of the game.
 * Currently it is implemented as a single number,
 * but could include other information such as the number of lines cleared.
 * @typedef {object} Score
 * @memberof Score
 */

/**
 * Returns a game state for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new game.
 */
Score.new_score = function () {
    return {
        "score": 0,
        "lines_cleared": 0,
        "Tetris": false
    };
};


/**
 * Level funtion returns an updates level based on every 10 lines cleared
 * @param {Score} score;
 * @returns {number}
 */

Score.level = function (score) {
    return Math.floor(1+ (score.lines_cleared/10));
};


/**
 * 
 * @param {number} numberoflines number of lines cleared
 * @param {*} Score_input the current score
 * @returns the new updated score with it * level
 */

Score.cleared_lines = function(numberoflines, Score_input){
    //update and add additional lines cleared to score.
    const level = Score.level(Score_input);

    Score_input.lines_cleared += numberoflines;
    if(numberoflines==1){
        Score_input.Tetris = false;
        Score_input.score += (100 * level);
    }
    else if(numberoflines==2){
        Score_input.Tetris = false;
        Score_input.score += (300 * level);
    }
    else if(numberoflines==3){
        Score_input.Tetris = false;
        Score_input.score += (500 * level);
    }
    else if(!Score_input.Tetris && numberoflines==4){
        Score_input.Tetris = true;
        Score_input.score += (800 * level);
    }
    else if(Score_input.Tetris && numberoflines ==4 ){
        Score_input.Tetris = true;
        Score_input.score += (1200 * level);
    }
        //return new score
    return  (Score_input)
};

/**
 * 
 * @param {number} Score_input the current score
 * @param {Score_input} points points that are to beadded
 * @returns  updated score
 */

Score.add_points = function(Score_input, points){
    Score_input.score + points;
    return Score_input;
};


export default Object.freeze(Score);
`1`

