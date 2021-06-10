import {gql} from "apollo-server-express";

export const entrepriseTypeDef = gql`
  type Entreprise {
    siren: String
    pse: [Rupco]
    rcc: [Rupco]
    lice: [Rupco]
    etablissements: [Etablissement]
    apprentissage: [Apprentissage]
    raison_sociale: String
    categorie_entreprise: String
    nom_commercial: String
    date_de_creation: String
    etat_entreprise: String
    date_de_radiation: String
    entreprise_employeur: String
    annee_tranche_effectif: String
    tranche_effectif: String
    categorie_juridique: CategorieJuridique
    idcc: [Idcc]
    naf: String
    libelle_naf: String
    interactions_3E_SEER: [InteractionsPole3eSeer]
  }
`;

export const entrepriseResolver = {
  Query: {
    entreprise(parent, query, { dataSources }) {
      return dataSources.entreprise.getEntrepriseBySiren(query.siren);
    }
  }
}
