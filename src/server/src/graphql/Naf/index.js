export const nafResolvers = {
  Entreprise: {
    libelle_naf: (parent, _, { dataSources }) =>
      dataSources.naf.getNafLibelleByCode(parent.naf)
  }
}
