import algorithmWrapper from "./algorithmWrapper";
import selectionSort from "./algorithms/selectionSort";
import heapSort from "./algorithms/heapSort";
import quickSort from "./algorithms/quickSort";
import mergeSort from "./algorithms/mergeSort";

await algorithmWrapper(quickSort, "./raw/rando_1M_cela_cisla.txt");
await new Promise(resolve => setTimeout(resolve, 100000000));
