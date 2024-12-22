import { readTextFile } from '../utils'

const main = async () => {
    const test = false
    const rawInput = await readTextFile(
        __dirname + (test ? '/testInput.txt' : '/input.txt')
    )

    let safeCount = 0

    console.log('part1')
    rawInput.split('\n').forEach((r, index) => {
        const level = r.split(' ').map((i) => parseInt(i))
        let [increase, decrease] = [false, false]
        level[0] > level[1] ? (decrease = true) : (increase = true)

        const [safeLevel] = checkLevel(level, increase, decrease)
        if (safeLevel) safeCount++
    })
    console.log({ safeCount })
    safeCount = 0

    console.log('part2')
    rawInput.split('\n').forEach((r, index) => {
        const level = r.split(' ').map((i) => parseInt(i))
        let up = 0
        let down = 0
        let [increase, decrease] = [false, false]

        level.forEach((num, i) => {
            let next = i + 1
            if (next == level.length) return
            if (num > level[next]) return down++
            up++
        })

        if (up == down) {
            return
        }

        if (up > down) {
            increase = true
        } else {
            decrease = true
        }

        let [safeLevel, badIndex] = checkLevel(level, increase, decrease)
        if (safeLevel) return safeCount++

        // check without the first element
        let [remove1st] = checkLevel(level.slice(1), increase, decrease)
        if (remove1st) return safeCount++

        // check without the badIndex
        let levelCopy = [...level]
        levelCopy.splice(badIndex as number, 1)
        const [removeCurrent] = checkLevel(levelCopy, increase, decrease)
        if (removeCurrent) return safeCount++

        // check without the index after the bad index
        levelCopy = [...level]
        levelCopy.splice((badIndex as number) + 1, 1)
        const [removeNext] = checkLevel(levelCopy, increase, decrease)
        if (removeNext) return safeCount++
    })

    console.log({ safeCount })
}

const checkLevel = (level: number[], increase: boolean, decrease: boolean) => {
    for (let i = 0; i < level.length; i++) {
        if (i + 1 == level.length) {
            return [true, 0]
        }

        if (level[i] == level[i + 1]) {
            return [false, i]
        }

        if (
            increase &&
            (level[i] > level[i + 1] || level[i + 1] - level[i] > 3)
        ) {
            return [false, i]
        }

        if (
            decrease &&
            (level[i] < level[i + 1] || level[i] - level[i + 1] > 3)
        ) {
            return [false, i]
        }
    }
    return [true, 0]
}

export default main
