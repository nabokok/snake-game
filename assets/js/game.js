let snake, apple, squareSize, score, maxScore, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue,
    textStyle_Key, textStyle_Value;

const Game = {

    preload: function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
    },

    create: function () {

        snake = [];                     
        apple = {};                     
        squareSize = 15;                // Довжина сторони квадратів в пікселях
        maxScore = localStorage.getItem('maxScore') || 0;
        score = 0;                      
        speed = 0;                      
        updateDelay = 0;                // Змінна для контролю швидкості оновлення
        direction = 'right';            // Напрямок
        new_direction = null;           // Змінна для збереження нового напрямку
        addNew = false;                 // Змінна, яка використовується, коли яблуко з’їдено

        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#333';


        // Генерація початкової змії з 10 елементів
        // Початкові координати: x=150, y=150. Значення x змінюється при кожній ітерації
        for (let i = 0; i < 10; i++) {
            snake[i] = game.add.sprite(150 + i * squareSize, 150, 'snake'); 
        }

        // Генерація яблука
        this.generateApple();

        textStyle_Key = { font: "bold 14px Roboto Mono, monospace", fill: "#D3D3D3", align: "center" };
        textStyle_Value = { font: "bold 16px Roboto Mono, monospace", fill: "#D3D3D3", align: "center" };

        // Max Score
        game.add.text(30, 20, "MAX SCORE", textStyle_Key);
        scoreTextValue = game.add.text(120, 18, maxScore.toString(), textStyle_Value);
        // Score
        game.add.text(160, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(215, 18, score.toString(), textStyle_Value);
        // Speed
        game.add.text(500, 20, "SPEED", textStyle_Key);
        speedTextValue = game.add.text(553, 18, speed.toString(), textStyle_Value);

    },


    update: function () {

        if (cursors.right.isDown && direction != 'left') {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction != 'right') {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction != 'down') {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction != 'up') {
            new_direction = 'down';
        }

        // Розрахунок швидкості на основі рахунку. На кожні 5 балів рахунку швидкість збільшується на 1
        // Максимальна швидкість - 10
        speed = Math.min(10, Math.floor(score / 5));
        // Оновлення швидкості на екрані
        speedTextValue.text = '' + speed;


        updateDelay++;

        if (updateDelay % (10 - speed) == 0) {


            let firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            // Зміна напрямку змії при натисканні клавіш стрілок
            if (new_direction) {
                direction = new_direction;
                new_direction = null;
            }

            // Зміна координат останньої клітинки змії відповідно до нового напрямку

            if (direction == 'right') {

                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'left') {
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'up') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if (direction == 'down') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }


            snake.push(lastCell);
            firstCell = lastCell;

            if (addNew) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            // Перевірка зіткнення з яблуком
            this.appleCollision();

            // Перевірка зіткнення з самою собою
            this.selfCollision(firstCell);

            // Перевірка зіткнення зі стіною
            this.wallCollision(firstCell);

        }

    },

    appleCollision: function () {

        for (var i = 0; i < snake.length; i++) {
            if (snake[i].x == apple.x && snake[i].y == apple.y) {

                addNew = true;

                apple.destroy();

                this.generateApple();

                score++;

                scoreTextValue.text = score.toString();

            }
        }

    },

    selfCollision: function (head) {

        for (var i = 0; i < snake.length - 1; i++) {
            if (head.x == snake[i].x && head.y == snake[i].y) {

                game.state.start('Game_Over');
            }
        }

    },

    wallCollision: function (head) {

        if (head.x >= 600) {
            head.x = 0
            return;
        }

        if (head.x < 0) {
            head.x = 600
            return
        }

        if (head.y >= 450) {
            head.y = 0
            return;
        }

        if (head.y < 0) {
            head.y = 450
            return;
        }
      
    },

    generateApple: function () {

        const randomX = Math.floor(Math.random() * 40) * squareSize,
            randomY = Math.floor(Math.random() * 30) * squareSize;

        apple = game.add.sprite(randomX, randomY, 'apple');
    }

};