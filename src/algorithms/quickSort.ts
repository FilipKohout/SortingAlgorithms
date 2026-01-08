export default function quickSort(data: string, onProgress: (p: number) => void) {
    const rawArray = data.split("\n");
    const isNumeric = !isNaN(Number(rawArray[0]));
    const arr: any[] = isNumeric ? rawArray.map(Number) : rawArray;

    let sortedElementsCount = 0;

    function partition(low: number, high: number) {
        const mid = Math.floor((low + high) / 2);
        const pivot = arr[mid];
        let i = low - 1;

        [arr[mid], arr[high]] = [arr[high], arr[mid]];

        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

        sortedElementsCount++;

        return i + 1;
    }

    function sort(low: number = 0, high: number | null = null): void {
        if (high === null) high = arr.length - 1;

        while (low < high) {
            const pi = partition(low, high);

            if (pi - low < high - pi) {
                sort(low, pi - 1);
                low = pi + 1;
            } else {
                sort(pi + 1, high);
                high = pi - 1;
            }

            onProgress((sortedElementsCount / arr.length) * 100);
        }
    }

    sort();
    return arr;
}