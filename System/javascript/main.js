// Fonction pour mettre à jour l'heure dans le paragraphe avec la classe "digital-clock"
function setDate() {
	const textHour = document.querySelector('.digital-clock');
	const getTime = new Date();	
	const hours = getTime.getHours();
	const minutes = getTime.getMinutes();
	const seconds = getTime.getSeconds();

// Fonction pour ajouter un zéro devant les chiffres < 10
	function checkZeros(string) {
		return ('0'+string).slice(-2);
	}
	
	// Mise à jour du contenu du paragraphe avec l'heure formatée
	textHour.innerHTML = `
		<span>${checkZeros(hours)}</span>:<span>${checkZeros(minutes)}</span>:<span>${checkZeros(seconds)}</span>
	`;
	
	
}
// Appel de la fonction setDate toutes les secondes
setInterval(setDate, 1000);

// Récupération des éléments canvas et contextes
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const canvas2 = document.getElementById('canvas2')
const ctx2 = canvas2.getContext('2d')
const canvas3 = document.getElementById('canvas3')
const ctx3 = canvas3.getContext('2d')
const canvas4 = document.getElementById('canvas4')
const ctx4 = canvas4.getContext('2d')
const canvas5 = document.getElementById('canvas5')
const ctx5 = canvas5.getContext('2d')

// Définition de la police de caractères
const font = new FontFace(
    'BigShoulders', 
    'url(https://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdSY8FFkwSA.woff2)',
    )

// Fonction pour déterminer la taille de la police en fonction de la largeur du canvas4
const fontSize = () => {
    switch(true) {
        case canvas4.width > 1400 :
            return 250
        case canvas4.width > 1200 :
            return 200
            case canvas4.width > 1000 :
                return 175
                case canvas4.width > 600:
                    return 75
                case canvas4.width < 600:
                    return 40
    }
}

// Fonction pour rendre le texte sur canvas4
const renderText = () => {
    ctx4.font = `${fontSize()}px BigShoulders`
    ctx4.letterSpacing = '20px'
    ctx4.textAlign = 'center'
    ctx4.textBaseline = 'middle'
    ctx4.fillText('', canvas4.width/2+10, canvas4.height/2)
}

// Chargement de la police et rendu du texte sur canvas4
font.load().then((font) => {
    document.fonts.add(font);
    renderText()
})

// Variables et fonctions pour le rendu des points et lignes sur canvas1
let visibleDotCount = 3
const dotRadius = 2
const dotMargin = 40
const spaceForOneDot = 2 * dotMargin
const gridPadding = 20
const smallDotRadius = 1
const smallDotMargin = 10
const spaceForSmallDot = 2 * smallDotMargin

// Fonction pour redimensionner les canvas en fonction de la taille de la fenêtre
const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas3.width = window.innerWidth
    canvas3.height = window.innerHeight
    canvas4.width = window.innerWidth
    canvas4.height = window.innerHeight
    canvas5.width = window.innerWidth
    canvas5.height = window.innerHeight
    if(canvas.width < 600) {
        visibleDotCount = 2
    } else { 
        visibleDotCount = 3
    }
}

// Fonction pour dessiner un point sur le canvas destinationContext
const drawDot = (destinationContext,x,y) => {
    destinationContext.beginPath()
    destinationContext.arc(x,y,dotRadius,0,Math.PI*2, true)
    destinationContext.fill()
}
// Fonction pour dessiner un petit point sur le canvas destinationContext
const drawSmallDot = (destinationContext,x,y) => {
    destinationContext.beginPath()
    destinationContext.arc(x,y,smallDotRadius,0,Math.PI*2, true)
    destinationContext.fillStyle = 'rgba(0,0,0,0.3)'
    destinationContext.fill()
    destinationContext.fillStyle='black'
}
// Fonction pour dessiner des lignes sur le canvas destinationContext
const drawLines = (destinationContext,x,y) => {
    destinationContext.beginPath()
    destinationContext.moveTo(x,y)
    destinationContext.lineTo(x-dotMargin,y)
    destinationContext.moveTo(x,y)
    destinationContext.lineTo(x+dotMargin,y)
    destinationContext.moveTo(x,y)
    destinationContext.lineTo(x,y+dotMargin)
    destinationContext.moveTo(x,y)
    destinationContext.lineTo(x,y-dotMargin)
    destinationContext.stroke()
}
// Fonction pour calculer la distance entre deux points
const calculateDistance = (mouseX, mouseY, dotX, dotY) => {
    return Math.sqrt((mouseX-dotX)**2 + (mouseY-dotY)**2)
}
// Fonction pour dessiner la grille en fonction de la position de la souris
const drawGrid = (mouseX, mouseY) => {
    ctx.lineWidth = 0.2
    for (let i = 0; i < ((window.innerWidth-gridPadding) / spaceForOneDot) ; i++) {   
        for (let j = 0; j < ((window.innerHeight-gridPadding) / spaceForOneDot); j++) {
            const dotXPos = gridPadding + (i*spaceForOneDot) 
            const dotYPos =  gridPadding + (j * spaceForOneDot)
            const dist = calculateDistance(mouseX, mouseY, dotXPos, dotYPos) 
            if( dist < spaceForOneDot * visibleDotCount) {
                drawDot(ctx,dotXPos,dotYPos)
                drawLines(ctx,dotXPos,dotYPos)
            }
        }
    }
    for (let i = 0; i < ((window.innerWidth-gridPadding) / spaceForSmallDot) ; i++) {   
        for (let j = 0; j < ((window.innerHeight-gridPadding) / spaceForSmallDot); j++) {
            const dotXPos = gridPadding + (i*spaceForSmallDot) 
            const dotYPos =  gridPadding + (j * spaceForSmallDot)
            const dist = calculateDistance(mouseX, mouseY, dotXPos, dotYPos) 
            if( dist < spaceForOneDot * visibleDotCount) {
                drawSmallDot(ctx,dotXPos,dotYPos)
            }
        }
    }
    
}

// Événement pour détecter le mouvement de la souris et mettre à jour la grille
window.addEventListener('mousemove', e => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawGrid(e.clientX, e.clientY)
})

let rectSize = 0
let rectSizeIncrement = 0.05
let maxSize = 10
let theta = 0
let thetaIncreament = Math.PI / 180
ctx2.strokeStyle = 'rgba(255,84,0,0.7)'
ctx2.lineWidth = 2
// Lancement de l'animation de la croix sur canvas2
const drawCross = (x,y) => {
    ctx2.save()
    ctx2.translate(x,y)
    ctx2.rotate(theta)
    ctx2.beginPath()
    ctx2.strokeRect(-rectSize/2,-rectSize/2,rectSize,rectSize)
    ctx2.moveTo(rectSize/2,rectSize/2)
    ctx2.lineTo(-rectSize/2,-rectSize/2)
    ctx2.moveTo(rectSize/2,-rectSize/2)
    ctx2.lineTo(-rectSize/2,rectSize/2)
    ctx2.stroke()
    ctx2.restore()
}
// Lancement de l'animation de la croix sur canvas2
const drawArrow = () => {
    ctx2.clearRect(0,0,300,300)
    ctx2.save()
    ctx2.translate(150,150)
    drawCross(130,0)
    drawCross(-130,0)
    drawCross(0,30)
    drawCross(0,-30)
    drawCross(65,20)
    drawCross(65,-20)
    drawCross(-65,20)
    drawCross(-65,-20)
    drawCross(0,120)
    drawCross(-20,-120)
    drawCross(20,-120)
    ctx2.restore()

    if(rectSize+ rectSizeIncrement >= maxSize) {
        rectSizeIncrement = -0.05
   } else if (rectSize + rectSizeIncrement <= 0 )  {
       rectSizeIncrement = 0.05
   }
   theta += thetaIncreament
   rectSize += rectSizeIncrement
   window.requestAnimationFrame(() => {
    drawArrow()
   })
}

drawArrow()


// Fonction pour dessiner une matrice de petits points fixes sur canvas3
const draw5x5 = (x,y) => {
    ctx3.save()
    ctx3.translate(x,y)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            ctx3.save()
            ctx3.beginPath()
            ctx3.translate(i* 10,j*10)
            ctx3.arc(0,0,1,0,Math.PI*2,true)
            ctx3.fill()
            ctx3.closePath()
            ctx3.restore()
        }
    }
    ctx3.restore()
}
// Fonction pour dessiner toutes les matrices de petits points fixes sur canvas3
const drawAll5x5Dots = () => {
    draw5x5(canvas3.width/21,canvas3.height/6)
    draw5x5(canvas3.width/21,canvas3.height/2)
    draw5x5(canvas3.width/21,canvas3.height/1.2)
    
    if(canvas3.width > 500) {
        draw5x5(canvas3.width/1.2,canvas3.height/6)
        draw5x5(canvas3.width/1.2,canvas3.height/2)
        draw5x5(canvas3.width/1.2,canvas3.height/1.2)
    }
}


// Fonction pour dessiner un point libre sur canvas4
const drawFreeDot = (x,y) => {
    ctx4.lineWidth = 0.2
    drawDot(ctx4,gridPadding + (x*spaceForOneDot) ,gridPadding + (y*spaceForOneDot) )
    drawLines(ctx4,gridPadding + (x*spaceForOneDot) ,gridPadding + (y*spaceForOneDot) )

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            drawSmallDot(ctx4,gridPadding + (x*spaceForOneDot) + i*spaceForSmallDot ,gridPadding + (y*spaceForOneDot) + j*spaceForSmallDot )
        }
    }

}


let xPos = gridPadding
let xPosIncrement = 5
// Fonction pour animer la grille sur canvas5
const animateGrid = (x) => {
    ctx5.lineWidth = 0.15
    ctx5.clearRect(0,0,canvas5.width,canvas5.height)
        for (let j = 0; j < ((window.innerHeight-gridPadding) / spaceForOneDot); j++) {
            const yPos =  gridPadding + (j * spaceForOneDot)
            ctx5.beginPath()
            ctx5.moveTo(Math.min(x,canvas.width-gridPadding),yPos)
            ctx5.lineTo(Math.max(gridPadding,x-4*spaceForOneDot),yPos)
            ctx5.stroke()
        }

        for (let i = 0; i < ((window.innerWidth-gridPadding) / spaceForOneDot) ; i++) {   
            for (let j = 0; j < ((window.innerHeight-gridPadding) / spaceForOneDot); j++) {
                const dotXPos = gridPadding + (i*spaceForOneDot) 
                const dotYPos =  gridPadding + (j * spaceForOneDot)
                const dist = x - dotXPos 
                if( dist  > 0 && dist < spaceForOneDot * 4) {
                    drawDot(ctx5,dotXPos,dotYPos)
                }
            }
        }


    window.requestAnimationFrame(() => {
        // reset xPos it exceeds bounds and pause the animation for 1.5sec
        if(xPos +xPosIncrement - 4*spaceForOneDot > canvas.width -gridPadding) {
            xPos = gridPadding
            xPos += xPosIncrement
            setTimeout(() => {
                animateGrid(xPos)
            },1500)        
        } else {
            xPos += xPosIncrement
            animateGrid(xPos)
        }
        
    
    })

}
animateGrid(gridPadding)

// Appel de la fonction resizeCanvas au redimensionnement de la fenêtre
window.onresize = () => {
    resizeCanvas()
    drawGrid()
    drawAll5x5Dots()
    drawFreeDot(3,1)
    drawFreeDot(4,5)
    drawFreeDot(4,7)
    drawFreeDot(6,8)
    drawFreeDot(8,4)
    drawFreeDot(10,6)
    drawFreeDot(20,8)
    renderText()
}
// Initialisation des canvas et dessin des éléments
resizeCanvas()
drawGrid()
drawAll5x5Dots()
drawFreeDot(3,1)
drawFreeDot(4,5)
drawFreeDot(4,7)
drawFreeDot(6,8)
drawFreeDot(10,6)
drawFreeDot(8,4)
drawFreeDot(20,8)