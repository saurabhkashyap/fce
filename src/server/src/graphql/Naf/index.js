export const nafResolvers = {
  Entreprise: {
    libelle_naf: (parent, _, { dataSources }) =>
      dataSources.postgre.naf().getNafLibelleByCode(parent.naf)
  }
}
