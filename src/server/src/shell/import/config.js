const FILES_FOLDER = "/mnt/data/export";
const CONVERTER_XLSX_TO_CSV = "xlsxToCsv";

const config = {
  interactions_pole_t: {
    download: {
      className: "MinioDownloader",
      bucket: "dgt",
      fileMatch: /^EtablissementActifsControlés_(.)*.csv$/,
      outputFileName: "interactions_pole_t.csv",
    },
    ingest: {
      table: "interactions_pole_t",
      historyTable: "interactions_pole_t_historique",
      filename: `${FILES_FOLDER}/interactions_pole_t.csv`,
      cols: ["siret", "date", "realise_pour"],
      delimiter: ";",
      truncate: true,
      history: true,
      date: {
        field: "date",
        format: "DD/MM/YYYY",
      },
    },
  },
  interactions_pole_3e: {
    download: {
      className: "MinioDownloader",
      bucket: "dge",
      fileMatch: /^(.)*_Tableau_donnees_API_EOS_(.)*.csv$/,
      outputFileName: "interactions_pole_3e.csv",
    },
    ingest: {
      className: "InteractionsPole3EIngestor",
      table: "interactions_pole_3e",
      historyTable: "interactions_pole_3e_historique",
      filename: `${FILES_FOLDER}/interactions_pole_3e.csv`,
      cols: [
        "siret",
        "date_visite",
        "region",
        "inspecteurs",
        "filieres",
        "type_suivi",
        "suivi_eti",
      ],
      delimiter: ";",
      truncate: true,
      history: true,
      date: {
        field: "date_visite",
        format: "DD/MM/YYYY",
      },
    },
  },
  interactions_pole_3e_src: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^SRC_Extraction(.)*.csv$/,
      outputFileName: "interactions_pole_3e_src.csv",
    },
    ingest: {
      className: "InteractionsPole3ESrcIngestor",
      table: "interactions_pole_3e_src",
      filename: `${FILES_FOLDER}/interactions_pole_3e_src.csv`,
      cols: ["region", "siret", "numero_dossier", "type_controle", "date"],
      delimiter: ";",
      truncate: true,
      history: false,
      date: {
        field: "date",
        format: "DD/MM/YYYY",
      },
    },
  },
  etablissements_activite_partielle: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^APART_(.)*.xlsx$/,
      converter: CONVERTER_XLSX_TO_CSV,
      outputFileName: "etablissements_activite_partielle.csv",
    },
    ingest: {
      table: "etablissements_activite_partielle",
      filename: `${FILES_FOLDER}/etablissements_activite_partielle.csv`,
      cols: [
        "siret",
        "num_convention",
        "date_decision",
        "num_avenant",
        "da_init",
        "nb_h_auto_avn",
        "nb_h_auto_cum",
        "nb_h_conso_cum",
        "cause",
      ],
      delimiter: ",",
      truncate: true,
      history: false,
      date: {
        field: "date_decision",
        format: "YYYY-MM-DD",
      },
    },
  },
  rupco_procedures_historique: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^PSE_procedure_historique.xlsx$/,
      converter: CONVERTER_XLSX_TO_CSV,
      outputFileName: "rupco_procedures_historique.csv",
    },
    ingest: {
      table: "rupco_procedures",
      filename: `${FILES_FOLDER}/rupco_procedures_historique.csv`,
      cols: [
        "numero",
        "type",
        "date_enregistrement",
        "etat",
        "siren",
        "effectif_entreprise",
        "effectif_groupe",
        "nom_groupe",
        "date_jugement",
        "situation_juridique",
      ],
      delimiter: ",",
      truncate: true,
      history: false,
      date: {
        field: "date_enregistrement",
        format: "DD/MM/YYYY",
      },
    },
  },
  rupco_etablissements_historique: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^PSE_etablissement_historique.xlsx$/,
      converter: CONVERTER_XLSX_TO_CSV,
      outputFileName: "rupco_etablissements_historique.csv",
    },
    ingest: {
      table: "rupco_etablissements",
      filename: `${FILES_FOLDER}/rupco_etablissements_historique.csv`,
      cols: [
        "numero",
        "type",
        "siren_etablissement",
        "effectif_etablissement",
        "siret",
        "nombre_de_ruptures_de_contrats_en_debut_de_procedure",
        "nombre_de_ruptures_de_contrats_en_fin_de_procedure",
        "siren",
        "situation_juridique",
        "date_enregistrement",
        "date_jugement",
      ],
      delimiter: ",",
      truncate: true,
      history: false,
      date: {
        field: "date_enregistrement",
        format: "DD/MM/YYYY",
      },
    },
  },
};

module.exports = config;
