const Game_Over = {

    preload: function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('gameover', './assets/images/gameover.jpg');
    },

    create: function () {
        this.storeMaxScore();
        this.add.button(0, 0, 'gameover', this.startGame, this);

        game.add.text(235, 350, "LAST SCORE", { font: "bold 16px Roboto Mono, monospace", fill: "#fff", align: "center" });
        game.add.text(350, 348, score.toString(), { font: "bold 20px Roboto Mono, monospace", fill: "#fff", align: "center" });

    },

    startGame: function () {

        this.state.start('Game');

    },

    storeMaxScore: function () {
        let maxScore = localStorage.getItem('maxScore');
        if (maxScore || maxScore <= score) {
            localStorage.setItem('maxScore', score);
        }
        
    },

};