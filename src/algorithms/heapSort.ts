export default function heapSort(data: string, onProgress: (p: number) => void) {
    const arr = data.split("\n").map(Number);

    function heapify(n: number, i: number) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest])
            largest = left;

        if (right < n && arr[right] > arr[largest])
            largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];

            heapify(n, largest);
        }
    }

    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(n, i);

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];

        onProgress(((n - i) / n) * 100);
        heapify(i, 0);
    }

    return arr;
}