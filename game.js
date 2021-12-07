const word_api = "http://api.quotable.io/random";
let quote = document.getElementById("quote");
let input = document.getElementById("input");
let counter = document.getElementById("counter");
let button = document.getElementById("button");
let cp = 0;


function eqaulStrings(ch1,ch2)
{
    return(ch1 === ch2);
}


function getRandomQuote()
{
    return fetch(word_api)
    .then(data => data.json())
    .then(words => words.content.toLowerCase());
}



button.addEventListener("click",changeCounter);

function changeCounter()
{
    if(cp == 0)
    {
        renderNewQuote();
        cp++;
    }

    if (input.value === quote.textContent)
    {
        renderNewQuote();
    }

    setTimeout(changeCounter , 1000);
}


input.addEventListener("input" , ()=>{
    let attempt = input.value.split("");
    let chars = quote.querySelectorAll("span");

    let quoteWords = quote.innerText.split(" ");
    let inputWords = input.value.split(" ");

    
    chars.forEach( (span , index )=>{

        if (attempt[index] == null){
            span.classList.remove("green");
            span.classList.remove("red");
        }
        else if (span.innerText === attempt[index])
        {
            span.classList.add("green");
            span.classList.remove("red");
        }
        else
        {
            span.classList.remove("green");
            span.classList.add("red");
        }
    })
})




async function renderNewQuote()
{
    let a = await getRandomQuote();
    quote.innerHTML = "";

    a.split("").forEach( (char , index)=>{
        let s = document.createElement("span");
        s.innerHTML = char;
        quote.appendChild(s); 
    })
    input.value = null;
}