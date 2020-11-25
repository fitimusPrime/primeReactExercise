
import faker from 'faker'
import { v4 as uuidv4 } from 'uuid';
/**
 * Generates random values of length, can be positive or negative
 * @param {int} length
 */
export const randomValuesOfLength = (length) => {
    return randomPositiveValues(length).map(next => next - 50)
}

/**
 * Generates only positive values of length
 * @param {int} length
 */
export const randomPositiveValues = (length) => {
    return Array(length).fill(null).map(() => Math.round(Math.random() * 100))
}

/**
 * Generates random words of a given length
 * @param {int} length
 */
export const randomWordsOfLength = (length) => {
    const words = ['Tell', 'Make', 'Pie', 'Peanut', 'Aunt', 'User', 'Contrast', 'Yellow', 'Ou My!', 'Jelly', 'Work', 'Mama', 'Queen', 'Knight']
    return Array(length).fill(null).map((next, index) => words[Math.floor(Math.random() * words.length)])
}

/**
 * Generates random groups of a certain length
 * @param {int} length
 */
export const randomGroupsOfLength = (length) => {
    const words = ['Developers', 'Designers', 'Magicians', 'Wizzards', 'React', 'Loops']
    return Array(length).fill(null).map((next, index) => words[Math.floor(Math.random() * words.length)])
}

/**
 * Returns given a length, an array that contains that many elements of the form
 * {
 *  name: 'Random Word',
 *  group: 'Random Group',
 *  value: 'Random Value'
 * }
 * @param {int} length
 * @param {boolean} positive = false
 */
export const randomCategoryData = (length, positive = false) => {
    const values = positive ? randomPositiveValues(length) : randomValuesOfLength(length)
    const words = randomWordsOfLength(length)
    const groups = randomGroupsOfLength(length)
    return words.map((next, index) => { return { name: next, group: groups[index], value: values[index] } })
}

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const randomDashboard = (depth) => {
    const dashboard = {
        id: uuidv4(),
        name: faker.company.companyName(),
        createdAt: faker.date.recent(),
        text: faker.lorem.lines(),
        children: depth ? randomDashboards(getRandomInt(0, 4), depth) : []
    }
    return dashboard
}
export const randomDashboards = (length = 6, depth = 3) => {
    return Array(length).fill(null).map((next, index) => randomDashboard(depth - 1))
}