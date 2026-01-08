export default function mergeSort(data: string, onProgress: (p: number) => void) {
    const rawArray = data.split("\n");
    const isNumeric = !isNaN(Number(rawArray[0]));
    const arr: any[] = isNumeric ? rawArray.map(Number) : rawArray;

    function merge(left: number, mid: number, right: number) {
        const lengthLeft = mid - left + 1;
        const lengthRight = right - mid;

        const leftArr = new Array(lengthLeft);
        const rightArr = new Array(lengthRight);

        for (let i = 0; i < lengthLeft; i++)
            leftArr[i] = arr[left + i];

        for (let j = 0; j < lengthRight; j++)
            rightArr[j] = arr[mid + 1 + j];

        let iLeft = 0, iRight = 0, iMerged = left;

        while (iLeft < lengthLeft && iRight < lengthRight) {
            if (leftArr[iLeft] <= rightArr[iRight]) {
                arr[iMerged] = leftArr[iLeft];
                iLeft++;
            } else {
                arr[iMerged] = rightArr[iRight];
                iRight++;
            }

            iMerged++;
        }

        while (iLeft < lengthLeft) {
            arr[iMerged] = leftArr[iLeft];

            iLeft++;
            iMerged++;
        }

        while (iRight < lengthRight) {
            arr[iMerged] = rightArr[iRight];

            iRight++;
            iMerged++;
        }
    }

    let mergesCompleted = 0;
    const totalMerges = arr.length - 1;

    function sort(left: number, right: number) {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);

        sort(left, mid);
        sort(mid + 1, right);
        merge(left, mid, right);

        mergesCompleted++;

        onProgress((mergesCompleted / totalMerges) * 100)
    }

    sort(0, arr.length - 1);

    return arr;
}