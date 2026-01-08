export default function insertionSort(data: string, onProgress: (p: number) => void) {
    const rawArray = data.split("\n");
    const isNumeric = !isNaN(Number(rawArray[0]));
    const arr: any[] = isNumeric ? rawArray.map(Number) : rawArray;

    for (let i = 1; i < arr.length; i++) {
        let current = arr[i]

        for (let j = i - 1; j >= 0; j--) {
            if (arr[j] > current)
                arr[j + 1] = arr[j];
            else {
                arr[j + 1] = current;
                break;
            }

            if (j === 0) arr[0] = current;
        }

        onProgress(i / (arr.length - 1) * 100);
    }


    return arr;
}