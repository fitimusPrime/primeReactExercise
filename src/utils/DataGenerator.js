
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
        attachments: randomAttachments(getRandomInt(1, 8)),
        children: depth ? randomDashboards(getRandomInt(0, 4), depth) : []
    }
    return dashboard
}
export const randomAttachment = (type) => {
    const attachment = {
        id: uuidv4(),
        type,
        data: null
    }
    switch (type) {
        case 'text':
            attachment.data = faker.lorem.paragraphs()
            break
        case 'image':
            attachment.data = faker.image.imageUrl()
            break
        case 'pie':
            attachment.data = randomPieChartData()
            break
        case 'tree':
            attachment.data = randomTreeChartData()
            break
        case 'bar':
            attachment.data = randomBarChartData()
            break
        case 'line':
            attachment.data = randomLineChartData()
            break
    }

    return attachment
}
export const randomAttachments = (length = 6) => {
    const types = ['text', 'image', 'pie', 'line', 'bar', 'tree']
    return Array(length).fill(null).map((next, index) => randomAttachment(types[getRandomInt(0, 5)]))
}
export const randomDashboards = (length = 6, depth = 3) => {
    return Array(length).fill(null).map((next, index) => randomDashboard(depth - 1))
}
export const randomPieChartData = () => {

    const data = randomCategoryData(8, true)
    const groups = data.reduce((accumulator, next) => {
        const group = next.group
        return accumulator.includes(group) ? accumulator : [...accumulator, group]
    }, [])

    const grouped = groups.map(group => {
        const items = data.filter(next => next.group === group)
        const length = items.length || Infinity
        const average = items.reduce((sum, next) => sum + next.value, 0) / length
        return {
            name: group,
            value: average.toFixed(2)
        }
    })
    return {
        series: [
            {
                data: grouped,
                type: 'pie'
            }
        ]
    }
}
export const randomLineChartData = () => {
    const data = randomCategoryData(8, true)
    const xAxis = randomWordsOfLength(6)
    const series = data.map(x=>{
        return {
            name: x.name,
            type: 'line',
            data: randomPositiveValues(xAxis.length)
        }
    })
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: data.map(next => next.name)
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: series
    }
}
export const randomBarChartData = () => {
    const data = randomCategoryData(8, true)
    const cumulative = data.reduce((accumulator, next) => {
        const { sum, data } = accumulator
        const cumulatedValue = sum + next.value
        return { sum: cumulatedValue, data: [...data, { ...next, value: cumulatedValue }] }
    }, { sum: 0, data: [] })
    return {
        xAxis: {
            type: 'category',
            data: data.map(next => next.name)
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: cumulative.data,
                type: 'bar'
            }
        ]
    }
}
export const randomTreeChartData = () => {
    const data = randomCategoryData(24, true)
    return {
        name: 'Tree',
        series: [
            {
                data: data.sort((a, b) => b.value - a.value).filter((which, index) => index < 4),
                type: 'treemap'
            }
        ]
    }
}