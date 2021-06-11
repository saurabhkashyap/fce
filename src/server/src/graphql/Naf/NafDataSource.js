import {fetchFromTable} from "../../utils/knex";

const formatResponse = (response) => (response[0] || {}).libelle;

const getNaf = fetchFromTable({
  tableName: "naf",
  formatResponse
});

const naf = (knex) => ({
  getNafLibelleByCode: (code) => getNaf(knex)({ code })
})

export default naf;
