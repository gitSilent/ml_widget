const input = document.querySelector('input');
const hintsDiv = document.querySelector('.hintsDiv');
const indicator = document.getElementById('indicator')
const statusSpan = document.querySelector('.status')
const h2 = document.querySelector('h2')

let countryStatuses = [];

input.addEventListener('input', (e)=>{
    console.log(e.target.value);
    const value = e.target.value;
    let countriesToRender = [];
    countryStatuses.forEach((el,index)=>{
        console.log(el);
        if(el['country'].toLowerCase().includes(value.toLowerCase()) ){
            countriesToRender.push({"countryInfo": el, "initIndex": index})
        }
    }) 
    console.log(countriesToRender);

   renderHintsDiv(value, countriesToRender)
})

function renderHintsDiv(inputValue, countriesToRender){
    if (inputValue !== ""){
        hintsDiv.innerHTML = ``
        countriesToRender.forEach((el,index)=>{
            renderHint(el['countryInfo']['country'], el['initIndex'])
        })
    } else{
        hintsDiv.innerHTML = ``
    }
}

function renderHint(name,index){
    console.log(name);
    const hint = document.createElement('div')
    hint.id = index;
    hint.addEventListener('click',(e)=>{
        console.log(e.target.querySelector('span').textContent);
        console.log(countryStatuses[index]);

        switch (countryStatuses[index]['cluster']){
            case 0:
                console.log(0);
                indicator.className = "low-level"
                statusSpan.textContent = "Низкий уровень опасности"
                break
            case 1:
                console.log(1);
                indicator.className = "medium-level"
                statusSpan.textContent = "Средний уровень опасности"
                break
            case 2:
                console.log(2);
                indicator.className = "high-level"
                statusSpan.textContent = "Высокий уровень опасности"
                break
        }

        h2.textContent = countryStatuses[index]['country']
        input.value = ""
        hintsDiv.innerHTML = ""


        
    })
    hint.classList.add("hintsDiv__hint")
    hint.innerHTML = `
        <span class='hintsDiv__span'>${name}</span>

    `
    hintsDiv.append(hint)
}

async function fetchData(){
    let req = await fetch('http://localhost:3400/main',{
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }
    })

    let data = await req.json()

    return data
}

(async ()=>{
    countryStatuses = await fetchData()
    console.log(countryStatuses);

})()
