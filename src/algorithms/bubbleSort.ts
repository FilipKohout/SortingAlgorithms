export default function bubbleSort(data: string, onProgress: (p: number) => void) {
    const rawArray = data.split("\n");
    const isNumeric = !isNaN(Number(rawArray[0]));
    const arr: any[] = isNumeric ? rawArray.map(Number) : rawArray;

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