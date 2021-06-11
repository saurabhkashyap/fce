import { renameKeys } from "../../utils";

export const resolveRupcoProcedureFromSiren = (type) => async (parent, _, { dataSources }) =>
  dataSources.postgre.rupco().getRupcoProcedureBySiren(parent.siren, type)

export const resolveRupcoProcedureFromSiret = (type) => async (parent, _, { dataSources }) =>
  dataSources.postgre.rupco().getRupcoEtablissementBySiret(parent.siret, type);

export const renameRuptures = (rows) =>
  rows.map(renameKeys({ nombre_de_ruptures_de_contrats_en_fin_de_procedure: "nombre_de_ruptures" }))

export const filterRupturesByType = (requestedType) => (rows) =>
  rows.filter(({ type }) => type.startsWith(requestedType))
