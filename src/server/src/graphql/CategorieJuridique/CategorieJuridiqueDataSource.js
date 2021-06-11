import { fetchFromTable } from "../../utils/knex";

const getCategoryJuridique = fetchFromTable({
  tableName: "categorie_juridique",
  formatResponse: (response) => response[0] || null
});

const categorieJuridique = (knex) => ({
  getCategorieByCode: (code) => getCategoryJuridique(knex)({ code }),
})

export default categorieJuridique;
