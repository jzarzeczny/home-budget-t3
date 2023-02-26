import { BankType } from "@components/forms/AddExpenseFileForm";
import { parse } from "csv-parse/sync";

export interface TransactionInterface {
  transactionDate: string;
  contractor: string;
  title: string;
  value: number;
  currency: string;
}

export function parseCSV(csvFile: File, parserType: BankType) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reject(new Error("Failed to load the data"));
    };

    reader.onload = () => {
      switch (parserType) {
        case BankType.ING:
          const encodedIng = encodeING(reader.result as string);
          return resolve(encodedIng);

        case BankType.CA:
          const encodedCA = encodeCA(reader.result as string);
          return resolve(encodedCA);

        default:
          throw new Error("Error in parsing");
      }
    };
    reader.readAsText(csvFile);
  });
}

function encodeING(data: string) {
  return createArrayOfObjects(
    parse(data, {
      delimiter: ";",
      fromLine: 20,
      skipEmptyLines: true,
      skipRecordsWithError: true,
      skipRecordsWithEmptyValues: true,
    })
  );
}

function createArrayOfObjects(encodedCSV: string[][]): TransactionInterface[] {
  const transactionData: TransactionInterface[] = encodedCSV.map(
    (transaction) => ({
      transactionDate: transaction[0] as string,
      contractor: transaction[2] as string,
      title: transaction[3] as string,
      value: convertToJSnumberStyle(transaction[8] as string),
      currency: transaction[9] as string,
    })
  );
  return transactionData;
}

function encodeCA(data: string) {
  return createArrayFromCAParse(
    parse(data, {
      delimiter: ";",
    })
  );
}

function createArrayFromCAParse(
  encodedCSV: string[][]
): TransactionInterface[] {
  const transactionDateIndex = encodedCSV[0]?.indexOf(
    "Data operacji"
  ) as number;
  const contractorIndex = encodedCSV[0]?.indexOf(
    "Miejsce transakcji"
  ) as number;
  const titleIndex = encodedCSV[0]?.indexOf("Tytuł") as number;
  const transactionTypeIndex = encodedCSV[0]?.indexOf(
    "Kategoria transakcji"
  ) as number;
  const transferValueIndex = encodedCSV[0]?.lastIndexOf("Kwota") as number;
  const transactionData: TransactionInterface[] = encodedCSV.map(
    (transaction) => ({
      transactionDate: transaction[transactionDateIndex] as string,
      contractor: transaction[contractorIndex] as string,
      title: transaction[titleIndex]
        ? (transaction[titleIndex] as string)
        : (transaction[transactionTypeIndex] as string),

      value: convertToJSnumberStyle(
        (transaction[transferValueIndex] as unknown as string).split(
          " "
        )[0] as string
      ) as number,
      currency: (transaction[transferValueIndex] as unknown as string).split(
        " "
      )[1] as string,
    })
  );
  return transactionData.splice(1);
}

function convertToJSnumberStyle(string: string): number {
  return parseFloat(string.trim().replace(",", "."));
}
