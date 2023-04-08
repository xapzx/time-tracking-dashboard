const cards = document.querySelectorAll('.card-wrapper');
const switcher = document.querySelectorAll('.stat-switch > a');

async function setData(overview) {
    const response = await fetch("data.json");
    const jsonData = await response.json();

    let index = 0;
    cards.forEach(card => {
        const data = jsonData[index]["timeframes"];
        card.querySelector('.stat-total-data').innerText = data[overview]["current"];

        let previous = "Last week"
        if(overview === "daily") {
            previous = "Yesterday"
        } else if(overview === "weekly") {
            previous = "Last Week"
        } else {
            previous = "Last Month"
        }

        card.querySelector('.stat-overview').innerText = previous + " - " + data[overview]["previous"] + "hrs";
        index++;
    });
}

function setActive(element) {
    switcher.forEach(type => {
        if(element == type) {
            element.setAttribute('data-active', "true");
        } else {
            type.setAttribute('data-active', "false");
        }
    });
}

switcher.forEach(element => {
    element.addEventListener('click', () => {
        setActive(element);
        setData(element.getAttribute('data-overview'));
    });
})

document.addEventListener("DOMContentLoaded", () => {
    setData("weekly");
});
