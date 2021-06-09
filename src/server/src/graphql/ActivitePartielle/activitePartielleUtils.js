import { renameKeys } from "../../utils";

export const formatActivitePartielleData = renameKeys({
  num_convention: "numConvention",
  num_avenant: "nbAvenants",
  cause: "motif",
  nb_h_auto_cum: "nbHeuresAutorisees",
  nb_h_conso_cum: "nbHeuresConsommees",
  date_decision: "date"
});
