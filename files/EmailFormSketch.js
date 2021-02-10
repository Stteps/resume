let emailFormSketch = `
    <div id = 'contactTitle'>Contactez-moi</div>
    <form method = 'POST' id = 'contactForm'>
        <label class = 'emailFormLabel' for = 'name'>Nom</label>
        <input class = 'emailFormInput' id = 'name' type = 'text' placeholder = 'Entrez votre nom ici' required />
        <label class = 'emailFormLabel' for = 'email'>Adresse email</label>
        <input class = 'emailFormInput' id = 'email' type = 'email' placeholder = 'Entrez votre adresse email ici' required />
        <label class = 'emailFormLabel' for = 'subject'>Objet</label>
        <input class = 'emailFormInput' id = 'subject' type = 'text' placeholder = 'Sujet du message' />
        <label class = 'emailFormLabel' for = 'message'>Message</label>
        <textarea id = 'message' placeholder = 'Entrez votre message ici'></textarea>
        <button id = 'submitButton' type = 'submit'>Envoyer</button>
    </form>
`