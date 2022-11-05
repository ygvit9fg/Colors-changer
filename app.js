const cols = document.querySelectorAll('.col')


document.addEventListener('keydown', event =>{
    event.preventDefault()
    if (event.code.toLowerCase() === 'space'){
        randomColors()
    }
})

document.addEventListener('click', event =>{
    const type = event.target.dataset.type

    if (type === 'lock'){
        const node = event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if(type === 'copy'){
        copyToClickBoard(event.target.textContent)
    }
})


function generateRandomColor(){
}

function copyToClickBoard(text){
    return navigator.clipboard.writeText(text)
}

function generateRandomColor(){
    const hexCods ='0123456789ABCDEF';

    let color = ''
    for(let i = 0; i < 6; i++){
        color +=hexCods[Math.floor(Math.random() * hexCods.length)]
    }
    return '#' + color
}


function as() {alert("Код Скопирован!" );}

function randomColors(){
    const colors = []
    cols.forEach((col) =>{
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        const color = generateRandomColor(); //  or   chroma.random()получается, что функция выше будет не нужна
        
        if(isLocked){
            colors.push(text.textContent)
            return
        }


        colors.push(color)

        col.style.background = color;

        text.textContent = color;


        setTextColor(text,color);
        setTextColor(button,color);
    })

    updateLocationHash(colors)
}
function setTextColor(text, color){
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}




function updateLocationHash(colors = []){
    document.location.hash = colors
    .map((col) => {
        return col.toString().substring(1)
    })
    -join('-')
}



function getColorsFromHash(){
    if(document.location.hash.length > 1){}
    document.location.hash.split('-')
}

randomColors ()