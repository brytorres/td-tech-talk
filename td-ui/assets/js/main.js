import '../css/style.css'

const ws = new WebSocket("ws://172.30.176.194:4242/");

const createSection = document.getElementById("create-planet");
const changeSection = document.getElementById("change-planet");
const changePlanetName = document.getElementById("change-planet-name");
const planetName = document.getElementById("name");
const planetSize = document.getElementById("size");
const planetColor = document.getElementById("color");

const createButton = document.getElementById("create-button");
const destroyButton = document.getElementById("destroy-button");
const pulseButton = document.getElementById("pulse-button");

const sizeSlider = document.getElementById("size-slider");
const speedSlider = document.getElementById("speed-slider");

let myPlanet = ""

/**
 * WebSockets
 */
ws.addEventListener("open", (event) => {
  console.log("websocket opened")

  const watcherSubMessage = {
    action: "subscribe",
    topic: "watcher",
  };
  ws.send(JSON.stringify(watcherSubMessage));
})

ws.addEventListener("message", (message) => {
  console.log("message", message.data)
  if (message.data.split("_")[0] == "watcher") {
    console.log("from wathcer")
    listPlanets(message.data.split("_")[1]);
  }

})

ws.addEventListener("error", (error) => {
  console.log("error", error)
})

ws.addEventListener("closed", (event) => {
  console.log("websocket opened")
})

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Creating Planet
 */
createButton.addEventListener("click", () => {
  // Subscribe to watchers topic
  

  // Subscribe to planets topic
  const planetsSubMessage = {
    action: "subscribe",
    topic: "planets",
  };
  ws.send(JSON.stringify(planetsSubMessage));

  // Get planet values
  const name = planetName.value;
  const size = planetSize.value;
  const colorRGB = `${hexToRgb(planetColor.value).r}-${hexToRgb(planetColor.value).g}-${hexToRgb(planetColor.value).b}` 
  const color = colorRGB;
  console.log("Name:", name);
  console.log("Size:", size);
  console.log("Color:", color);

  // Send create planet message
  const createPlanetMessage = {
    action: "publish",
    topic: "planets",
    message: `action:create,name:${name},size:${size},color:${color}`,
  };
  ws.send(JSON.stringify(createPlanetMessage));

  // Modify HTML
  myPlanet = name;
  changePlanetName.textContent = name;
  sizeSlider.value = size;

  createSection.style.display = "none";
  changeSection.style.display = "block";
}); 

/**
 * Destroying Planet
 */
destroyButton.addEventListener("click", () => {
  console.log(myPlanet);
  // Send create planet message
  const createPlanetMessage = {
    action: "publish",
    topic: "planets",
    message: `action:destroy,name:${myPlanet}`,
  };
  ws.send(JSON.stringify(createPlanetMessage));

  // Modify HTML
  myPlanet = "";
  changePlanetName.textContent = "";
  sizeSlider.value = 50;

  createSection.style.display = "block";
  changeSection.style.display = "none";
})

/**
 * Pulsing Space-time Ripple
 */
pulseButton.addEventListener("click", () => {
  console.log("PULSING:", myPlanet);
  const pulsePlanetMessage = {
    action: "publish",
    topic: "planets",
    message: `action:pulse,name:${myPlanet}`,
  };
  ws.send(JSON.stringify(pulsePlanetMessage));

  
})

/**
 * Changing Planet
 */
sizeSlider.addEventListener("input", (event) => {
  console.log(event)
  const pulsePlanetMessage = {
    action: "publish",
    topic: "planets",
    message: `action:change,name:${myPlanet},size:${event.target.value}`,
  };
  ws.send(JSON.stringify(pulsePlanetMessage));
})

speedSlider.addEventListener("input", (event) => {
  console.log(event);
  const pulsePlanetMessage = {
    action: "publish",
    topic: "planets",
    message: `action:change,name:${myPlanet},speed:${event.target.value}`,
  };
  ws.send(JSON.stringify(pulsePlanetMessage));
});

/**
 * List Planets
 */
function listPlanets(planetsString) {
  const ul = document.getElementById("planets-list")
  removeAllChildNodes(ul)
  
  const planets = planetsString.split(",");
  planets.forEach(planet => {
    if (planet.includes("destroyed--")) {
      let li = document.createElement("li");
      const destroyedPlanet = planet.split("--")[1]

      li.appendChild(
        document.createTextNode(
          `Oh no! ${destroyedPlanet} has been destroyed by its creator!`
        )
      );
      li.setAttribute(
        "class",
        "py-2 px-4 w-full border font-bold text-red-700 border-gray-200 dark:border-gray-600"
      );
      li.setAttribute("id", `planet__${planet}`);
      ul.appendChild(li);

      console.log(destroyedPlanet)
      const destroyedLi = document.getElementById(`planet__${destroyedPlanet}`)
      setTimeout(() => {
        ul.removeChild(li);
      }, 5000)
    } else {
      let li = document.createElement("li")
      li.appendChild(document.createTextNode(planet));
      li.setAttribute(
        "class",
        "py-2 px-4 w-full border border-gray-200 dark:border-gray-600"
      );
      li.setAttribute("id", `planet__${planet}`)
      ul.appendChild(li);
    }
  });
}

/**
 * Utility
 */

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}