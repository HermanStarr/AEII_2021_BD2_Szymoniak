

export const getArrayUnion = (array1, array2) => {
    return [...new Set([...array1,...array2])];
}