import { html, render } from "../../node_modules/lit-html/lit-html.js";

const root = document.getElementById('contacts');

const cardTemplate = (card) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${card.name}</h2>
        <button class="detailsBtn">Details</button>
        <div class="details" id=${card.id}>
            <p>Phone number: ${card.phoneNumber}</p>
            <p>Email: ${card.email}</p>
        </div>
    </div>
</div>
`;

const mainTemplate = (contacts) => html`
${contacts.map(cardTemplate)}
`;

export const cardView = (contacts) => {
    render(mainTemplate(contacts), root);
}