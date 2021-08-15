class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    this.handleElements();
    this.handleResetButton();
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-height*5, width, height*6);

      this.showFuelBar();
      this.showLife();
      this.showLeaderBoard();

      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        var x = allPlayers[plr].positionX;
        var y = height-allPlayers[plr].positionY;
        //use data form the database to display the cars in y direction
        
        cars[index-1].position.x = x;
        cars[index-1].position.y = y;
       // console.log(index, player.index)

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          this.handleFuel(index);
          this.handlePowerCoins(index);
          camera.position.y = cars[index-1].position.y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
if(this.playerMoving){
  player.positionY+=5
  player.update();

}

  this.handlePlayerControls();

  const finishLine = height*6-100

  if(player.positionY>finishLine){
    gameState = 2
    player.rank+=1
    Player.updateCarsAtEnd(player.rank)
    player.update();
    this.showRank();
  }
  drawSprites();
    }
  }

  handleResetButton(){
    this.handleResetButton.mousePressed(()=>{
      database.ref('/').set({
        playerCount:0,
        gameState:0,
        players:{},
        carsAtEnd:0
      })
      window.location.reload();
    })
  }
  showLife(){
    push();
    image(lifeImages, width/2-130, height-player.positionY-400,20,20)
    fill("white");
    rect(width/2-100, height-player.positionY-400,180,20)
    fill("-f50057");
    rect(width/2-100, height-player.positionY-400,player.life,20);
    noStroke();
    
  }

}
