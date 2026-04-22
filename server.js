const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/convert", (req, res) => {
  const { data } = req.body;

  const result = data.toUpperCase();

  res.json({ result });
});

app.post("/XMLtoJson", (req, res) => {
    const { data } = req.body;
    let xml = data;

    xml = xml.replaceAll("/", "");
    let menorQ = [];
    let mayorQ = [];

    for (let i = 0; i < xml.length; i++) {
        if (xml[i] == ">") mayorQ.push(i);
        if (xml[i] == "<") menorQ.push(i);
    }

    let jsonResult = "{";
    for (let i = 0; i < menorQ.length; i++) {
        if (i % 2 != 0) continue;
        let key = xml.substring(menorQ[i] + 1, mayorQ[i]);
        let value = xml.substring(mayorQ[i] + 1, menorQ[i + 1]);
        jsonResult += `"${key}" : "${value}"`;
        if (i + 2 < menorQ.length) {
            jsonResult += ",";
        }
    }
    jsonResult += "}";

    res.json({ result: jsonResult });
});

app.post("/JsonToXML", (req, res) => {
    const { data } = req.body;
    let json = data;

    json = json.replaceAll("\"","");
    json = json.replaceAll("{","");
    json = json.replaceAll("}","");
    let keyvalues = [];
    keyvalues = json.split(",");
    let xml = "";
    xml += "<arrel>";

    for(let i = 0; i < keyvalues.length;i++){
        let tempArray = keyvalues[i].split(":");
        xml += "<";
        xml += tempArray[0];
        xml += ">";
        
        xml += tempArray[1];
        
        xml += "</";
        xml += tempArray[0];
        xml += ">";
    }
    xml += "</arrel>"

    res.json({ result: xml });
});

app.listen(PORT, () => {
    console.log(`Servidor a http://localhost:${PORT}`);
});