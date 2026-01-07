import algorithmWrapper from "./algorithmWrapper";
import selectionSort from "./algorithms/selectionSort";
import heapSort from "./algorithms/heapSort";
import quickSort from "./algorithms/quickSort";
import mergeSort from "./algorithms/mergeSort";
import radixSort from "./algorithms/radixSort";

await algorithmWrapper(radixSort, "./raw/random_integers_10M.txt");
await new Promise(resolve => setTimeout(resolve, 100000000));
