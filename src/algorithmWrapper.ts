import { TIME_OUT } from "./consts";
import * as fs from "node:fs";

export default function algorithmWrapper(algorithm: (data: string, onProgress: (p: number) => void) => any, file: string,) {
    return new Promise((resolve, reject) => {
        console.log(`Loading data: ${file}`);
        const data = fs.readFileSync(file, "utf-8");

        const start = performance.now();
        let finished = false;
        let savedProgress = 0;

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

            process.stdout.write(`\rFinished: ${finished} | Progress: ${formattedProgress}% | Time: ${elapsed} s | Estimated: ${remainingTime} s`);
        }

        const onProgress = (progress: number) => {
            savedProgress = progress;
            updateConsole();
        };

        try {
            const result = algorithm(data, onProgress);
            finished = true;

            clearTimeout(timeout);
            updateConsole();

            resolve(result);
        } catch (err) {
            clearTimeout(timeout);
            reject(err);
        }
    });
}