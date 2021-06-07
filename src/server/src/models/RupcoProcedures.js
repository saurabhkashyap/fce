import Model from "./Model";

export default class RupcoProcedures extends Model {
  static types = {
    PSE: "PSE",
    LiceC: "LiceC",
    RCC: "RCC",
    CM: "CM"
  }
  async findBySiren(siren, requestedType) {
    try {
      const response = await this.db.query(
        `SELECT * FROM rupco_procedures WHERE siren=$1`, [siren]
      );

      return response.rows.filter(({ type }) => type.startsWith(requestedType));
    } catch (error) {
      console.error(error)
    }
  }
}
