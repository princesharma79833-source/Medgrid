import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import xlsx from "xlsx";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const workbookPath = path.join(
  projectRoot,
  "AYUSH_Medical_Tourism_Dataset_India.xlsx",
);
const outputPath = path.join(projectRoot, "src", "Data", "ayushData.json");

const workbook = xlsx.readFile(workbookPath);
const data = Object.fromEntries(
  workbook.SheetNames.map((sheetName) => [
    sheetName,
    xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: null,
    }),
  ]),
);

fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Created ${path.relative(projectRoot, outputPath)}`);
