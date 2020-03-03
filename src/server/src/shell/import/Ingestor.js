require("dotenv").config();
const process = require("process");
const fs = require("fs");
const { execSync } = require("child_process");
const _get = require("lodash.get");
const lineReplace = require("line-replace");
const { parse, isValid, format } = require("date-fns");

const TMP_DIR = "/tmp";
const PSQL_BASE_CMD = `psql -h ${process.env.PG_HOST} -d ${process.env.PG_DB} -U ${process.env.PG_USER} -c `;

class Ingestor {
  constructor(config) {
    this._config = config;
    this.psql = PSQL_BASE_CMD;
    this.tmpFile = `${TMP_DIR}/${this.getConfig("table")}.csv`;
  }

  getConfig(key) {
    return _get(this._config, key);
  }

  async execute() {
    console.log("Execute Injestor");

    const { truncate } = this._config;

    await this._createTmpFileWithNewHeader();

    this.beforeTruncate();
    if (truncate) {
      this._truncateTable();
    }
    this.afterTruncate();

    this.beforePsqlCopy();
    this._runPsqlCopy();
    this.afterPsqlCopy();

    this._saveProcessDate();

    console.log("Injestor finished");
  }

  beforeTruncate() {}
  afterTruncate() {}
  beforePsqlCopy() {}
  afterPsqlCopy() {}

  async _createTmpFileWithNewHeader() {
    console.log("Create tmp file with new header");

    const { filename, delimiter, cols } = this._config;
    fs.copyFileSync(filename, this.tmpFile);

    return new Promise(resolve => {
      lineReplace({
        file: this.tmpFile,
        line: 1,
        text: cols.join(delimiter),
        addNewLine: true,
        callback: () => {
          resolve();
        }
      });
    });
  }

  _truncateTable() {
    console.log("Truncate table");
    return execSync(`${this.psql} "TRUNCATE ${this.getConfig("table")};"`);
  }

  _runPsqlCopy() {
    console.log("Import csv to postgres");
    const { table, delimiter, cols } = this._config;
    const psqlImportQuery = `${this.psql} "\\copy ${table}(${cols.join(
      ","
    )}) FROM '${
      this.tmpFile
    }' with (format csv, header true, delimiter '${delimiter}');"`;

    return execSync(psqlImportQuery);
  }

  _saveProcessDate() {
    console.log("save process date");
    const {
      date: { field, format },
      table
    } = this._config;

    const query = `UPDATE import_updates SET date = (SELECT max(TO_DATE(${field}, '${format}')) FROM ${table}), date_import = CURRENT_TIMESTAMP
    WHERE \\"table\\" = '${table}';`;

    return execSync(`${this.psql} "${query}"`);
  }

  _formatDate(date) {
    if (!date) {
      return null;
    }

    date = date.trim();

    const datesFormats = ["yyyy-MM-dd", "dd/MM/yyyy", "ddMMMyyyy", "dd/MM/yy"];

    for (const dateFormat of datesFormats) {
      const parsedDate = parse(date, dateFormat, new Date());

      if (isValid(parsedDate)) {
        return format(parsedDate, "yyyy-MM-dd");
      }
    }

    return null;
  }
}

module.exports = Ingestor;
