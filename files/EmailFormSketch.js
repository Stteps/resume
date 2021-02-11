let emailFormSketch = `
    <div id = 'contactTitle'>Contactez-moi</div>
    <div class = 'closeCross'>x</div>
    <form method = 'POST' id = 'contactForm'>
        <label class = 'emailFormLabel' for = 'name'>Nom</label>
        <input class = 'emailFormInput' id = 'name' type = 'name' placeholder = 'Entrez votre nom ici' onclick = 'focus()' required />
        <label class = 'emailFormLabel' for = 'email'>Adresse email</label>
        <input class = 'emailFormInput' id = 'email' type = 'email' placeholder = 'Entrez votre adresse email ici' onclick = 'focus()' required />
        <label class = 'emailFormLabel' for = 'subject'>Objet</label>
        <input class = 'emailFormInput' id = 'subject' type = 'subject' placeholder = 'Sujet du message'  onclick = 'focus()' />
        <label class = 'emailFormLabel' for = 'message'>Message</label>
        <textarea id = 'message' placeholder = 'Entrez votre message ici' onclick = 'focus()'></textarea>
        <button class = 'submitButton' type = 'submit'>Envoyer</button>
    </form>
`