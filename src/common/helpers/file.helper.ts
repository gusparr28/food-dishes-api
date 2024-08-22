import path from "node:path";

export class FileHelper {
	async extractFileData<T>(filePath: string): Promise<T> {
		const dataFile = await Bun.file(path.resolve(__dirname, filePath), {
			type: "application/json",
		}).json();

		return dataFile;
	}
}
