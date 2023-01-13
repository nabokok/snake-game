const Menu = {

    preload: function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('menu', './assets/images/menu.jpg');
    },

    create: function () {
        this.add.button(0, 0, 'menu', this.startGame, this);

    },

    startGame: function () {
        this.state.start('Game');

    }

};