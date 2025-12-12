export default function selectionSort(data: string, onProgress: (p: number) => void) {
    const arr = data.split("\n").map(Number);

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) minIndex = j;
        }

        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        onProgress(i / (arr.length - 1) * 100);
    }

    return arr;
}