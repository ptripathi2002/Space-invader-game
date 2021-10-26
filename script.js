const grid = document.querySelector('.grid')
let currentShooterIndex = 202
let width = 15
let direction = 1
let goingRight = true
let invadersId
let results = 0
let aliensRemoved = []
const resultsDisplay = document.querySelector('.results')

for(let i =0;i<225;i++)
{
    const square = document.createElement('div');
    grid.appendChild(square);
}
const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39

]

// put all the squares in the box

function draw()
{
    for(let i = 0;i<alienInvaders.length;i++)
    {
        if(!aliensRemoved.includes(i)){
            
        squares[alienInvaders[i]].classList.add('invader')
        }
    }
    
    
}

draw()

// remove invader

function remove()
{
    for(let i = 0;i<alienInvaders.length;i++)
    {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}



// shooter

squares[currentShooterIndex].classList.add('shooter')

// moving the shhoter

function moveShooter(e)
{
   squares[currentShooterIndex].classList.remove('shooter')
   switch(e.key)
   {
       case 'ArrowLeft':
           if(currentShooterIndex % width !==0) currentShooterIndex -=1
           break
        case 'ArrowRight':
          if(currentShooterIndex % width < width-1) currentShooterIndex +=1
          break

   }
 
//    squares[currentShooterIndex].classList.add('shooter')

}

document.addEventListener('keydown',moveShooter)

// move the invaders

function moveInvaders()
{
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width-1
    remove()
    
    if(rightEdge && goingRight)
    for(let i =0;i<alienInvaders.length;i++)
    {
        alienInvaders[i] += width+1
        direction = -1
        goingRight = false
    }


    if(leftEdge && !goingRight)
    {
        for(let i = 0;i<alienInvaders.length;i++)
        {
            alienInvaders[i] += width-1
            direction = 1
            goingRight  = true;
        }
    }

    for(let i =0;i<alienInvaders.length ; i++)
    {
        alienInvaders[i] += direction
    }

    draw()

    if(squares[currentShooterIndex].classList.contains('invader','shooter'))
    {
        resultsDisplay.innerHTML = 'GAME OVER'
        classInterval(invadersId)
    }
//Making the game more Dynamic and adding shooter to the game(Prashant Tripathi)
    
    for(let i=0; i<alienInvaders.lngth; i++)
    {
        if(alienInvaders[i] > (squares.length + width)){
            
            resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersId)
        }
    }
    
if(aliensRemoved.length == alienInvaders.length){
    resultsDisplay.innerHTML = "YOU WIN"
    clearInterval(invadersId)
}
invadersId = setInterval(moveInvaders,100)



function shoot(e)
{
    let laserId
    let currentLaserIndex = currentShooterIndex
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('Laser')
        currentLaserIndex-=innerWidths
        squares[currentLaserIndex].classList.add('laser')

        if(squares[currentLaserIndex].classList.contains('inavader')){
            squares[currentLaserIndex].classList.remove('Laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            const alienRemoval = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultsDisplay.innerHTML = results

            console.log(aliensRemoved)

        }
    }
}

        switch(e.key){
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
    }
}


document.addEventListener('keydown', shoot)
