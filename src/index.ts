import algorithmWrapper from "./algorithmWrapper";
import selectionSort from "./algorithms/selectionSort";
import insertionSort from "./algorithms/insertionSort";
import heapSort from "./algorithms/heapSort";
import quickSort from "./algorithms/quickSort";
import mergeSort from "./algorithms/mergeSort";
import radixSort from "./algorithms/radixSort";
import bubbleSort from "./algorithms/bubbleSort";

const fileNames = [
    "./raw/integers_0_to_4294967295.txt",
    "./raw/random_1M_cela_cisla.txt",
    "./raw/random_10M_interval.txt",
    "./raw/random_integers_10M.txt",
    "./raw/random_words_10M.txt",
]

const functions = [
    radixSort,
    quickSort,
    mergeSort,
    heapSort,
    insertionSort,
    selectionSort,
    bubbleSort,
]

for (const fileName of fileNames) {
    await algorithmWrapper(radixSort, fileName);
}
await new Promise(resolve => setTimeout(resolve, 100000000));
