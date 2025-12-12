export default function insertionSort(data: string, onProgress: (p: number) => void) {
    const arr = data.split("\n").map(Number);

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