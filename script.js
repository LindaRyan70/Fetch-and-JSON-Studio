// TODO: add code here

//  Step 1: Add code that runs on the window load event.
window.addEventListener("load", function() {

    //  Step 2: Make a GET request using fetch to the astronauts API. (Use Chptr 27.1.2.3)
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) {
        response.json().then(function(json) {

            //  Note: mainDiv variable name could be any word, as long as it's the same each time referenced.
           const mainDiv = document.getElementById('container');  
           
            //  BONUS 1: I did some research on how to use sort for descending (b-a) or ascending (a-b) order.
           json.sort(function(a,b) {
            return b.hoursInSpace - a.hoursInSpace;
            });
            //  Arrow Function version of above is: json.sort((a,b) => b.hoursInSpace - a.hoursInSpace);

            //  BONUS 3: Researched adding an element to my HTML using .createElement and .appendChild
            const astronautCount = document.createElement('h2');
            astronautCount.innerHTML = `Number of Astronauts: ${json.length}`;
            mainDiv.appendChild(astronautCount);

            //  Step 3: Add each astronaut returned to the web page. 
            //  Bonus 2: Make the "Active: true" text green is included in template literal below. Note: used inline <span> to keep marker/bullet default black. To make "Active: false" stay black text, just replace "red" with empty string " "
            //  NOTE: Can use for...of loop instead in first line below:  for (astronaut of json) {}  where astronaut could be anyVariable as long as same one used in <li> template literals ${astronaut.firstName}
           for (let i = 0; i < json.length; i++) {
                mainDiv.innerHTML += `
                    <div class="astronaut">
                        <div class="bio">
                            <h3>${json[i].firstName} ${json[i].lastName}</h3>
                            <ul>
                                <li>Hours in Space: ${json[i].hoursInSpace}</li>
                                <li>
                                    <span class='${json[i].active ? "green" : "red"}'>Active: ${json[i].active}</span>
                                </li>     
                                <li>Skills: ${json[i].skills.join(', ')}</li>
                            </ul>
                        </div>
                        <img class="avatar" src="${json[i].picture}">
                    </div>
                `;
            };
        });
    });
});
