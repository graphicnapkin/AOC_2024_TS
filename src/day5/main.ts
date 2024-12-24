import { readTextFile } from '../utils'

const main = async () => {
    const test = false
    const rawInput = await readTextFile(__dirname, test)
    const [rules, pageSets] = rawInput.split('\n\n')
    const rulesMap: {
        [any: string]: {
            before: string[]
            after: string[]
        }
    } = {}

    const goodPages: string[][] = []

    rules.split('\n').forEach((r) => {
        const [first, second] = r.split('|')
        if (!rulesMap[first]) rulesMap[first] = { before: [], after: [] }
        if (!rulesMap[second]) rulesMap[second] = { before: [], after: [] }

        rulesMap[first].before = [...rulesMap[first].before, second]
        rulesMap[second].after = [...rulesMap[second].after, first]
    })

    const fixPages = (pages: string[], fixes: number): [string[], number] => {
        for (let i = 0; i < pages.length; i++) {
            const p = pages[i]
            const rules = rulesMap[p]
            for (let j = 0; j < rules.before.length; j++) {
                const before = rules.before[j]
                const beforeIndex = pages.indexOf(before)

                if (beforeIndex !== -1 && beforeIndex < i) {
                    const tmp = pages[beforeIndex]
                    pages[beforeIndex] = pages[i]
                    pages[i] = tmp

                    return fixPages(pages, fixes + 1)
                }
            }

            for (let j = 0; j < rules.after.length; j++) {
                const after = rules.after[j]
                const afterIndex = pages.indexOf(after)
                if (afterIndex !== -1 && afterIndex > i) {
                    const tmp = pages[afterIndex]
                    pages[afterIndex] = pages[i]
                    pages[i] = tmp

                    return fixPages(pages, fixes + 1)
                }
            }
        }

        return [pages, fixes]
    }

    pageSets.split('\n').forEach((r) => {
        const pages = r.split(',')
        const [newPages, fixes] = fixPages(pages, 0)
        console.log({ newPages, fixes })

        // part 1
        //if (fixes == 0) goodPages.push(newPages)
        // part 2
        if (fixes > 0) goodPages.push(newPages)
    })

    let output = 0
    goodPages.forEach((p) => {
        const middle = Math.round(p.length / 2)
        output += parseInt(p[middle - 1])
    })

    console.log({
        output,
    })
}

export default main
