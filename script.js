const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}


//passing joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'fec7d6aff782453f88d7259352867a84',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}

// Get Jokes from Joke API
async function getJokes(){
    let joke= '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Spooky,Christmas?blacklistFlags=nsfw,religious,racist,sexist,explicit'
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        //Text-To-speech
        tellMe(joke);
        //Disable button
        toggleButton();
    }catch(error){
        console.log("woops",error)
    }
}
// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton )



  
