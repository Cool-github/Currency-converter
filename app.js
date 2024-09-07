const BASE_URL = "https://v6.exchangerate-api.com/v6/36d4ad03e191452d51025990/latest";

const countrySelector = document.querySelectorAll(".select-container select");
const btn = document.querySelector("button");
const fromcurrency = document.querySelector(".from select");
const tocurrency = document.querySelector(".to select");

for(let select of countrySelector){
    for(let c in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = c;
        newOption.value = c;
        if(select.name === "from" && c === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && c === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evnt) => {
        updateFlag(evnt.target);
    });
}

const updateFlag = (event) => {
    let ccode = event.value;
    let countryCode = countryList[ccode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    event.parentElement.querySelector("img").src = newSrc;   
}

btn.addEventListener("click", async(evnt) => {
    evnt.preventDefault();
    let usrIp = document.querySelector(".amount input").value;
    if (usrIp <= 0 || usrIp === ""){
        usrIp = 1;
        document.querySelector(".amount input").value = 1;
    }
    
    const URL = `${BASE_URL}/${fromcurrency.value}`;
    let response = await fetch(URL);
    let data = await response.json();

    let conversionRate = data.conversion_rates[tocurrency.value];
    let convertedAmount = usrIp * conversionRate;

    let msg = document.querySelector(".msg");
    msg.innerText = `${usrIp} ${fromcurrency.value} = ${convertedAmount.toFixed(2)} ${tocurrency.value}`;
});
