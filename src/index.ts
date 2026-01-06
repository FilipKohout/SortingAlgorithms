import algorithmWrapper from "./algorithmWrapper";
import selectionSort from "./algorithms/selectionSort";
import heapSort from "./algorithms/heapSort";

await algorithmWrapper(heapSort, "./raw/random_words_1M.txt");
await new Promise(resolve => setTimeout(resolve, 100000000));
