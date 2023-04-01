

const time = document.querySelector('.time');
const formPost = document.querySelector('#formPost');
const formel = document.querySelector('.formel')
const input = document.querySelector('input')
const select = document.querySelector('select')
const text = document.querySelector('textarea')
const answearBtn = document.querySelector('.answearBtn')
const h3 = document.querySelector('h3')
const changeBtn = document.querySelector('.changeBtn')

changeBtn.style.display = 'none'

function countDownTo(dateString) {
    const targetDate = new Date(dateString).getTime()
    
    if(isNaN(targetDate)) {
        console.log('Invalid date');
        return;
    }
    
    const interval = setInterval(() => {
        const now = new Date().getTime()
        const timeLeft = targetDate - now;
        
        if(timeLeft < 0) {
            clearInterval(interval);
            console.log('Countdown finished')
            return;
        }
        let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        hoursLeft = hoursLeft < 10 ? "0" + hoursLeft : hoursLeft;
        minutesLeft = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
        secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
        
        let tickTack = `${daysLeft}:${hoursLeft}:${minutesLeft}:${secondsLeft}`
        //daysLeft + ':' + hoursLeft + ':' + minutesLeft + ':' + secondsLeft
        time.innerHTML = tickTack
        //console.log(`${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`)
    }, 1000)
}
countDownTo('2023-04-23T13:00:00')


//post to mongodb
answearBtn.addEventListener('click', postInfo)
async function postInfo (e) {

    changeBtn.style.display = 'block'
    e.preventDefault();
    
    
    const postKid =  await fetch ('https://viktoriainbjudan.herokuapp.com/api/kids',
    {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            name: input.value,
            content: text.value,
            isComing: select.value
        })
    })
    
    const kidsForm = {
        name: input.value,
        content: text.value,
        isComing: select.value
    }
    
    
    if(select.value == "true") {
        formPost.classList.add('answear')
        formPost.innerHTML = `Så roligt att ${input.value} vill komma på mitt kalas 😀`
        localStorage.setItem('name', `Så roligt att ${input.value} vill komma på mitt kalas 😀`);  
    }else{
        formPost.classList.add('answear')
        formPost.innerHTML = `Så tråkigt att ${input.value} inte kan komma på mitt kalas 😢`
        localStorage.setItem('name', `Så tråkigt att ${input.value} inte kan komma på mitt kalas 😢`);
    }
}
//Empty ls and refresh the page
changeBtn.addEventListener('click', () => {
    console.log('klick')
    localStorage.clear() 
    window.location.reload()    
    })

//check if ls is empty
if (!localStorage.getItem("name")) {
    console.log('inget i localstorage')
}else{
    console.log( 'i localstorage')
    changeBtn.style.display = 'block'
    
    formPost.innerHTML = localStorage.getItem('name')
    
    }
    