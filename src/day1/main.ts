//https://adventofcode.com/2024/day/1
import { readTextFile } from '../utils'

const main = async () => {
    const test = true
    const rawInput = await readTextFile(
        __dirname + (test ? '/testInput.txt' : '/input.txt')
    )

    let totalDistance = 0
    let similarityScore = 0
    let leftList: number[] = []
    let rightList: number[] = []

    rawInput.split('\n').forEach((row) => {
        const [l, r] = row.split('   ')
        leftList.push(parseInt(l))
        rightList.push(parseInt(r))
    })

    leftList.sort((a, b) => a - b)
    rightList.sort((a, b) => a - b)

    leftList.forEach((num) => {
        similarityScore += rightList.filter((n) => n === num).length * num
    })

    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i])
    }
    console.log({ totalDistance })
    console.log({ timesFound: similarityScore })
}

export default main
