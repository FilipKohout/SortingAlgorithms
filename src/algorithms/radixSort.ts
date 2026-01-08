export default function radixSort(data: string, onProgress: (p: number) => void) {
    const rawArray = data.split("\n");
    const isNumeric = !isNaN(Number(rawArray[0]));
    const arr: any[] = isNumeric ? rawArray.map(Number) : rawArray;

    const negatives: number[] = [];
    const positives: number[] = [];
    let globalMax = 0;

    for (let i = 0; i < arr.length; i++) {
        if (Math.abs(arr[i]) > globalMax) globalMax = Math.abs(arr[i]);

        if (arr[i] < 0) negatives.push(arr[i]);
        else positives.push(arr[i]);
    }

    const totalMaxDigits = Math.floor(Math.log10(globalMax || 1)) + 1;
    let globalSteps = 0;

    function sort(arr: number[]) {
        if (arr.length === 0) return;

        let radixArr: number[][] = Array.from({ length: 10 }, () => []);
        let digitIndex = 0;

        let localMax = 0;
        for (let i = 0; i < arr.length; i++) {
            if (Math.abs(arr[i]) > localMax) localMax = Math.abs(arr[i]);
        }
        const maxDigits = Math.floor(Math.log10(localMax || 1)) + 1;

        function sortStep() {
            const placeValue = Math.pow(10, digitIndex);

            for (let i = 0; i < arr.length; i++) {
                const currentNum = arr[i];
                const digit = Math.floor((Math.abs(currentNum) / placeValue) % 10);
                radixArr[digit].push(currentNum);
            }

            let index = 0;
            for (let i = 0; i < 10; i++) {
                const bucket = radixArr[i];
                const bucketLen = bucket.length;

                for (let j = 0; j < bucketLen; j++)
                    arr[index++] = bucket[j];

                bucket.length = 0;
            }

            digitIndex++;
            globalSteps++;
            onProgress((globalSteps / (totalMaxDigits * 2)) * 100);
        }

        while (digitIndex < maxDigits)
            sortStep();
    }

    sort(negatives);
    negatives.reverse();

    sort(positives);

    return negatives.concat(positives);
}