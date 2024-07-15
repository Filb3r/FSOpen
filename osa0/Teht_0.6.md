```mermaid

sequenceDiagram
    participant selain
    participant palvelin
    
    Note right of selain: Käyttäjä kirjoittaa muistiinpanon ja painaa save nappia.
    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate palvelin
    palvelin-->>selain: STATUS 201, {"message":"note created"}
    deactivate palvelin

    Note right of selain: 