const ONE_DAY = 60*60*24;

const identity = (input) => input;

export const fetchFromTable = ({ tableName, formatResponse = identity }) => (knex) => async (props) => {
  const response = await knex(tableName)
    .where(props)
    .select()
    .cache(ONE_DAY);

  return formatResponse(response);
}
