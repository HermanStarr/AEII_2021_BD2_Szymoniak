export const getArrayUnion = (array1, array2) => {
    return [...new Set([...array1,...array2])];
}

export const getArrayIntersection = (array1, array2) => {
    return array1.filter(item => array2.includes(item));
}

export const getArrayDifference = (array1, array2) => {
    return array1.filter(item => !array2.includes(item));
}