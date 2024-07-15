```mermaid

sequenceDiagram
    participant selain
    participant palvelin
    
    Note right of selain: Käyttäjä avaa sivun.
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate palvelin
    palvelin-->>selain: HTML tiedosto
    deactivate palvelin

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate palvelin
    palvelin-->>selain: css tiedosto
    deactivate palvelin 

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate palvelin
    palvelin-->>selain: javascript tiedosto
    deactivate palvelin 

    Note right of selain: Selain suorittaa javascriptin, joka noutaa muistiinpanot palvelimelta.

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate palvelin
    palvelin-->>selain: data.json tiedosto 
    deactivate palvelin 

    Note right of selain: sivulla näkyy muistiinpanot.