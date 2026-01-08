export default function radixSort(data: string, onProgress: (p: number) => void) {
    const rawArray = data.split("\n").filter(line => line.length > 0);

    const isNumeric = rawArray.length > 0 && !isNaN(Number(rawArray[0]));

    if (isNumeric) {
        const arr: number[] = rawArray.map(Number);
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

        const sortNumbers = (targetArr: number[]) => {
            if (targetArr.length === 0) return;

            let radixArr: number[][] = Array.from({ length: 10 }, () => []);
            let digitIndex = 0;

            let localMax = 0;
            for (let i = 0; i < targetArr.length; i++) {
                if (Math.abs(targetArr[i]) > localMax) localMax = Math.abs(targetArr[i]);
            }
            const maxDigits = Math.floor(Math.log10(localMax || 1)) + 1;

            while (digitIndex < maxDigits) {
                const placeValue = Math.pow(10, digitIndex);

                for (let i = 0; i < targetArr.length; i++) {
                    const currentNum = targetArr[i];
                    const digit = Math.floor((Math.abs(currentNum) / placeValue) % 10);
                    radixArr[digit].push(currentNum);
                }

                let index = 0;
                for (let i = 0; i < 10; i++) {
                    const bucket = radixArr[i];
                    for (let j = 0; j < bucket.length; j++) {
                        targetArr[index++] = bucket[j];
                    }
                    bucket.length = 0;
                }

                digitIndex++;
                globalSteps++;
                onProgress(Math.min(100, (globalSteps / (totalMaxDigits * 2)) * 100));
            }
        };

        sortNumbers(negatives);
        negatives.reverse();
        sortNumbers(positives);

        return negatives.concat(positives);
    }

    else {
        let arr = [...rawArray];
        let maxLength = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > maxLength) maxLength = arr[i].length;
        }

        for (let i = maxLength - 1; i >= 0; i--) {
            const buckets: string[][] = [];

            for (let j = 0; j < arr.length; j++) {
                const str = arr[j];
                const charCode = i < str.length ? str.charCodeAt(i) : 0;

                if (!buckets[charCode]) buckets[charCode] = [];
                buckets[charCode].push(str);
            }

            arr = [];
            for (let b = 0; b < buckets.length; b++) {
                if (buckets[b]) {
                    for (const s of buckets[b]) {
                        arr.push(s);
                    }
                }
            }

            const stepsDone = maxLength - i;
            onProgress((stepsDone / maxLength) * 100);
        }

        return arr;
    }
}