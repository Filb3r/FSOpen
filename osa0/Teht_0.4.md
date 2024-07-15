```mermaid

sequenceDiagram
    participant selain
    participant palvelin
    
    Note right of selain: Käyttäjä kirjoittaa uuden muistiinpanon ja painaa save nappia.
    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/notes
    activate palvelin
    palvelin-->>selain: Status 302 (uudelleenohjaus)
    deactivate palvelin
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate palvelin
    palvelin-->>selain: HTML tiedosto
    deactivate palvelin
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate palvelin
    palvelin-->>selain: css tiedosto
    deactivate palvelin

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate palvelin
    palvelin-->>selain: javascript tiedosto
    deactivate palvelin 

    Note right of selain: Selain suorittaa javascriptin, joka hakee muistiinpanot palvelimelta.  

    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate palvelin
    palvelin-->>selain: data.json tiedosto
    deactivate palvelin 

    Note right of selain: Lopuksi kaikki muistiinpanot näkyy sivulla.