import {gql} from "apollo-server-express";

export const categorieJuridiqueTypeDef = gql`
  type CategorieJuridique {
    code: String
    libelle: String
  }
`;

export const categorieJuridiqueResolver = {
  Entreprise: {
    categorie_juridique(parent, query, { dataSources }) {
      return dataSources.categorieJuridique.getCategorieByCode(parent.categoriejuridiqueunitelegale);
    }
  }
}
