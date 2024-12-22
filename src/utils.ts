import { promises } from "fs";
const readFile = promises.readFile;

export const readTextFile = async (directory: string, test: boolean) => {
    let filePath = directory + (test ? "/testInput.txt" : "/input.txt");
    try {
        const data = await readFile(filePath, "utf-8");
        return data;
    } catch (err) {
        console.error("Error reading file:", err);
        throw err;
    }
};
