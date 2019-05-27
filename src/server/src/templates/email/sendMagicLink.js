import layout from "./layout";

export default ({ link }) =>
  layout(`
Bonjour,<br/><br/>

Vous avez fait une demande de connexion à l'application FCE, pour vous connecter veuillez cliquez sur le lien suivant : <br/><br/>

<a href="${link}">${link}</a><br/><br/>

<strong>Attention, ce lien n'est valable qu'avec le même navigateur internet avec lequel vous avez fait la demande. Si votre navigateur par défaut est différent veuillez copier coller le lien dans celui-ci.</strong><br/><br/>

Cordialement,<br/><br/>

L'équipe FCE
`);
