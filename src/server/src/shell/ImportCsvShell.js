const { execSync } = require("child_process");
const readline = require("readline");
const config = require("config");
const csv = require("csv-parser");
const fs = require("fs");
const Shell = require("./Shell");

class ImportCsvShell extends Shell {
  constructor(args, options) {
    super(args, options);
  }

  async execute() {
    let fileName = this._args[0];
    let pathName = process.cwd();
    const tmpFile = "/tmp/fce_import.csv";
    let completeFilePath = pathName + "/" + fileName;

    let delimiter = ",";
    let tableName = "";

    if (
      !fileName ||
      !fileName.includes(".csv") ||
      !fs.existsSync(completeFilePath)
    ) {
      console.error("Error on file name or file doesn't exist");
      return false;
    }

    let writeStream = fs.createWriteStream(tmpFile);
    let rlp = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });

    let csvHeaders = [];
    const choseHeaderName = new Promise((resolve, reject) => {
      fs.createReadStream(completeFilePath)
        .pipe(csv())
        .on("headers", async headers => {
          await new Promise((res, rej) => {
            rlp.question(
              `Le délimiteur par défaut est ${delimiter} souhaitez vous le remplacer ? (N/nouveau délimiteur) : `,
              answer => {
                if (answer.toUpperCase() !== "N" && answer !== "") {
                  delimiter = answer;
                }

                console.log(`Le délimiteur est : ${delimiter}`);
                res();
              }
            );
          });

          await new Promise((res, rej) => {
            rlp.question(
              `Dans quelle table voulez vous importer le csv ? : `,
              answer => {
                tableName = answer;
                res();
              }
            );
          });

          for await (let header of headers) {
            await new Promise((res, rej) => {
              rlp.question(
                `Pour la colonne ${header} choisisez un nouveau nom de colonne : `,
                answer => {
                  console.log(
                    `Le nouveau nom de la collone ${header} est: ${answer}`
                  );
                  csvHeaders.push(answer);
                  res();
                }
              );
            });
          }

          rlp.close();
          resolve();
        });
    });

    choseHeaderName.then(() => {
      let stringCsvHeaders = csvHeaders.join(delimiter);
      writeStream.write(csvHeaders.join(delimiter) + "\n");

      fs.createReadStream(completeFilePath)
        .pipe(csv())
        .on("data", rawData => {
          const raw = Object.values(rawData).join(delimiter);
          writeStream.write(raw + "\n");
        })
        .on("end", () => {
          console.log("-----------> Csv clean ! :)");
          console.log("Run import.");
          const psqlQuery = `psql -h ${config.get("db.host")} -d ${config.get(
            "db.database"
          )} -U ${config.get("db.user")} -p ${config.get("db.password")}
        -c "\copy ${tableName}(${stringCsvHeaders}) FROM '${completeFilePath}'
        with (format csv, header true, delimiter ',');"`;

          execSync(psqlQuery);
          execSync(`rm ${tmpFile}`);
        });
    });
  }
}

module.exports = ImportCsvShell;
