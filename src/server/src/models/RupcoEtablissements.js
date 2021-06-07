import Model from "./Model";

export default class RupcoEtablissements extends Model {
  async findByNumero(numero) {
    try {
      const response = await this.db.query(
        `SELECT * FROM rupco_etablissements WHERE numero=$1`, [numero]
      );

      return response.rows;
    } catch (error) {
      console.error(error)
    }
  }
}
