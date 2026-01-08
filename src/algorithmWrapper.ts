import { TIME_OUT } from "./consts";
import * as fs from "node:fs";

export default function algorithmWrapper(algorithm: (data: string, onProgress: (p: number) => void) => any, file: string,) {
    return new Promise((resolve, reject) => {
        console.log(`Loading data: ${file}`);
        const data = fs.readFileSync(file, "utf-8");

        const start = performance.now();
        let finished = false;
        let savedProgress = 0;
        let lastUpdate = 0;
        let lastSummary: string | null;

        const timeout = setTimeout(() => {
            if (!finished) {
                updateConsole();
                reject(new Error(`Timeout after ${TIME_OUT} ms`));
            }
        }, TIME_OUT);

        const updateConsole = () => {
            const milis = performance.now() - start;
            const elapsed = (milis / 1000).toFixed(2);
            const formattedProgress = savedProgress.toFixed(2);
            const estimatedTotalTime = milis / (savedProgress / 100);
            const remainingTime = ((estimatedTotalTime - milis) / 1000).toFixed(2);

            lastSummary = `Finished: ${finished} | Progress: ${formattedProgress}% | Time: ${elapsed} s | Estimated: ${remainingTime} s`;
            process.stdout.write("\r" + lastSummary);
        }

        const onProgress = (progress: number) => {
            if (performance.now() - lastUpdate < 100 && lastUpdate != 0 && !finished) return;
            lastUpdate = performance.now();

            savedProgress = progress;
            updateConsole();
        };

        try {
            const result: any[] = algorithm(data, onProgress);
            finished = true;

            clearTimeout(timeout);

            savedProgress = 100;
            updateConsole();

            console.log("\nSaving result to file...");
            fs.writeFile(`./out/result-${algorithm.name}-${file.split("/").pop()}`, (lastSummary! ?? "Unknown") + "\n" + result.join("\n"), { encoding: "utf-8" }, (err) => {});

            resolve(result);
        } catch (err) {
            clearTimeout(timeout);
            reject(err);
        }
    });
}