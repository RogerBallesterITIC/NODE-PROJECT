const btnToJSON = document.getElementById("btnToJSON");
const btnToXML = document.getElementById("btnToXML");

btnToJSON.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  // Cambiamos la ruta a /XMLtoJsonNew (o el nombre que hayas dado en server.js)
  const res = await fetch("/XMLtoJsonNew", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  
  document.getElementById("output").value = json.result;
});

btnToXML.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  // Cambiamos la ruta a /JsonToXMLNew
  const res = await fetch("/JsonToXMLNew", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();
  
  document.getElementById("output").value = json.result;
});