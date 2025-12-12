import algorithmWrapper from "./algorithmWrapper";
import selectionSort from "./algorithms/selectionSort";

await algorithmWrapper(selectionSort, "./raw/random_words_10M.txt");
