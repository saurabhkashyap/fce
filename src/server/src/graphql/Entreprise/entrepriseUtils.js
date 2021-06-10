import {renameKeys} from "../../utils";

export const renameEntrepriseKeys = renameKeys({
  denominationunitelegale: "raison_sociale",
  categorieentreprise: "categorie_entreprise",
  nomusageunitelegale: "nom_commercial",
  datecreationunitelegale: "date_de_creation",
  etatadministratifunitelegale: "etat_entreprise",
  datedebut: "date_de_radiation",
  caractereemployeurunitelegale: "entreprise_employeur",
  anneeeffectifsunitelegale: "annee_tranche_effectif",
  trancheeffectifsunitelegale: "tranche_effectif"
})
