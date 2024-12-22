import { readTextFile } from '../utils'

const main = async () => {
    const test = true
    const rawInput = await readTextFile(
        __dirname + (test ? '/testInput.txt' : '/input.txt')
    )
    console.log({ rawInput })
}

export default main
