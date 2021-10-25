const grid = document.querySelector('.grid')
let currentShooterIndex = 202
let width = 15
let direction = 1
let goingRight = true
let invadersId
let results = 0
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
        squares[alienInvaders[i]].classList.add('invader')
    }
}

// remove invader

function remove()
{
    for(let i = 0;i<alienInvaders.length;i++)
    {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

draw()


// shhoter

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
 
   squares[currentShooterIndex].classList.add('shooter')

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


    

}
invadersId = setInterval(moveInvaders,100)