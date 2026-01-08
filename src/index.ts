import algorithmWrapper from "./algorithmWrapper";
import selectionSort from "./algorithms/selectionSort";
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

await algorithmWrapper(bubbleSort, fileNames[4]);
await new Promise(resolve => setTimeout(resolve, 100000000));
