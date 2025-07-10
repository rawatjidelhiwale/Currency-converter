const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn1");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
    for (currcode in countryList) {
      let newoption = document.createElement("option");
      newoption.innerText = currcode;
      newoption.value = currcode;
      if(select.name === "from" && currcode ==="USD"){
        newoption.selected = "selected";
      }
      else if (select.name === "to" && currcode ==="INR"){
       newoption.selected = "selected";
      }
      select.append(newoption);
    }
     select.addEventListener("change",(evt) =>{
     updateflag(evt.target);
     });  
}

 const updateflag = (element) =>{
     let currcode = element.value;
     let countrycode = countryList[currcode];
     let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
     img.src = newsrc;
 }
  
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountvalue = amount.value;

  if (amountvalue === "" || amountvalue < 0) {
    amountvalue = 1;
    amount.value = "1";
  }

  const from = fromcurr.value.toLowerCase();
  const to = tocurr.value.toLowerCase();
  const URL = `${BASE_URL}/${from}.json`;

  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[from][to];
    let finalamout = (amountvalue * rate).toFixed(2);
    msg.innerText = `${amountvalue} ${fromcurr.value} = ${finalamout} ${tocurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate.";
    console.error(error);
  }
});
