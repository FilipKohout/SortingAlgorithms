export default function bubbleSort(data: string, onProgress: (p: number) => void) {
    const arr = data.split("\n").map(Number);

    for (let i = 0; i < arr.length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        onProgress(i / (arr.length - 1) * 100);

        if (!swapped) break;
    }

    return arr;
}