import { parse } from "csv-parse/sync";

export interface TransactionInterface {
  transactionDate: string;
  contractor: string;
  title: string;
  value: number;
  currency: string;
}

export function parseCSV(csvFile: File) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reject(new Error("Failed to load the data"));
    };

    reader.onload = () => {
      const encodedCSV = parse(reader.result as string, {
        delimiter: ";",
        fromLine: 100,
        skipEmptyLines: true,
        skipRecordsWithError: true,
        skipRecordsWithEmptyValues: true,
      });
      resolve(createArrayOfObjects(encodedCSV));
    };
    reader.readAsText(csvFile);
  });
}

function createArrayOfObjects(encodedCSV: string[][]): TransactionInterface[] {
  const transactionData: TransactionInterface[] = encodedCSV.map(
    (transaction) => ({
      transactionDate: transaction[0] as string,
      contractor: transaction[2] as string,
      title: transaction[3] as string,
      value: parseInt(transaction[8] as string),
      currency: transaction[9] as string,
    })
  );
  return transactionData;
}
