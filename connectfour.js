var table = $('table tr')

function changeTurn(){
  if (turn === pOne) {
    $('h3').text(pOne+": it is your turn, please pick a column to drop your blue chip.")
  }
  else{
    $('h3').text(pTwo+": it is your turn, please pick a column to drop your red chip.")
  }
}

function colorCheck(row, col){
  var color = table.eq(row).find("td").eq(col).find("button").css("background-color")
  return color
}

function checkColBot(col){
  var space = colorCheck(5, col)
  for (var i = 5; i > -1; i--) {
    space = colorCheck(i,col)
    if (space === "rgb(128, 128, 128)") {
      return i
    }
  }
}

function changeColor(row, col, turn){
  if (turn === pOne) {
    table.eq(row).find("td").eq(col).find("button").css("background-color", "blue")
  }
  else {
    table.eq(row).find("td").eq(col).find("button").css("background-color", "red")
  }
}

function horzVic(){

  for (var r = 0; r < 6; r++) {
    var colorList = []
    for (var c = 0; c < 7; c++) {
      colorList.push(colorCheck(r,c))
    }
    //loop through colorlist to check for victory
    var count = 1
    var prevColor = "rgb(128, 128, 128)"
    for (var i = 0; i < colorList.length; i++) {
      if (colorList[i]==="rgb(128, 128, 128)") {
        count = 1
        prevColor = colorList[i]
        continue;
      }
      else if (colorList[i]===prevColor) {
        count++
        if (count === 4) {
          return true
        }
        prevColor = colorList[i]
      }
      else {
        count = 1
        prevColor = colorList[i]
      }
    }
  }
}
function vertVic(){

  for (var c = 0; c < 7; c++) {
    var colorList = []
    for (var r = 0; r < 6; r++) {
      colorList.push(colorCheck(r,c))
    }
    //loop through colorlist to check for victory
    var count = 1
    var prevColor = "rgb(128, 128, 128)"
    for (var i = 0; i < colorList.length; i++) {
      if (colorList[i]==="rgb(128, 128, 128)") {
        count = 1
        prevColor = colorList[i]
        continue;
      }
      else if (colorList[i]===prevColor) {
        count++
        if (count === 4) {
          return true
        }
        prevColor = colorList[i]
      }
      else {
        count = 1
        prevColor = colorList[i]
      }
    }
  }
}

function diagOne(){

  for (var c = 6; c > -1; c--) {
    for (var r = 5; r > -1; r--) {
      var colorList = []
      colorList.push(colorCheck(r,c))
      colorList.push(colorCheck(r-1,c-1))
      colorList.push(colorCheck(r-2,c-2))
      colorList.push(colorCheck(r-3,c-3))
      
      var count = 1
      var prevColor = "rgb(128, 128, 128)"
      for (var i = 0; i < colorList.length; i++) {
        if (colorList[i]==="rgb(128, 128, 128)") {
          count = 1
          prevColor = colorList[i]
          continue;
        }
        else if (colorList[i]===prevColor) {
          count++
          if (count === 4) {
            return true
          }
          prevColor = colorList[i]
        }
        else {
          count = 1
          prevColor = colorList[i]
        }
      }
    }
  }
}

function diagTwo(){

  for (var c = 0; c < 7; c++) {
    for (var r = 5; r > -1; r--) {
      var colorList = []
      colorList.push(colorCheck(r,c))
      colorList.push(colorCheck(r-1,c+1))
      colorList.push(colorCheck(r-2,c+2))
      colorList.push(colorCheck(r-3,c+3))

      var count = 1
      var prevColor = "rgb(128, 128, 128)"
      for (var i = 0; i < colorList.length; i++) {
        if (colorList[i]==="rgb(128, 128, 128)") {
          count = 1
          prevColor = colorList[i]
          continue;
        }
        else if (colorList[i]===prevColor) {
          count++
          if (count === 4) {
            return true
          }
          prevColor = colorList[i]
        }
        else {
          count = 1
          prevColor = colorList[i]
        }
      }
    }
  }
}

function victoryCheck(){
  var victory = false
  var horizontal = horzVic()
  var vertical = vertVic()
  var diagonalOne = diagOne()
  var diagonalTwo = diagTwo()

  if (horizontal||vertical||diagonalOne||diagonalTwo) {
    victory = true
  }

  if (victory) {
    $("#top").html("<h1>"+turn+" has won! Refresh your browser to play again!</h1>")
  }
}

changeTurn()



$(".board").on('click', 'button', function(){
    if (turn === pOne) {
      var col = $(this).closest('td').index()
      var row = $(this).closest('tr').index()
      spaceRow = checkColBot(col)
      changeColor(spaceRow, col, turn)
      victoryCheck()
      turn = pTwo
      changeTurn()
    }
    else {
      var col = $(this).closest('td').index()
      var row = $(this).closest('tr').index()
      spaceRow = checkColBot(col)
      changeColor(spaceRow, col, turn)
      victoryCheck()
      turn = pOne
      changeTurn()
    }
});
