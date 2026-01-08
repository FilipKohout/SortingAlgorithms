export default function selectionSort(data: string, onProgress: (p: number) => void) {
    const rawArray = data.split("\n");
    const isNumeric = !isNaN(Number(rawArray[0]));
    const arr: any[] = isNumeric ? rawArray.map(Number) : rawArray;

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }

        if (minIndex !== i)
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]

        onProgress(i / (arr.length - 1) * 100);
    }

    return arr;
}