import { X509Certificate } from 'crypto'
import { readTextFile } from '../utils'
type coordinate = [number, number]

const main = async () => {
    const test = false
    const rawInput = await readTextFile(__dirname, test)

    const gameBoard = rawInput.split('\n')
    const width = gameBoard[0].length
    const height = gameBoard.length
    let part1Score = 0
    let part2Score = 0

    const getSquare = (x: number, y: number) => {
        return !gameBoard[y]?.[x] ? '' : gameBoard[y][x]
    }

    const checkSpotPart1 = ([
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x4, y4],
    ]: coordinate[]) => {
        if (getSquare(x1, y1) != 'X') return
        if (getSquare(x2, y2) != 'S') return
        if (getSquare(x3, y3) != 'A') return
        if (getSquare(x4, y4) != 'M') return
        part1Score++
    }

    const checkSpotPart2 = ([
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x4, y4],
        [x5, y5],
    ]: coordinate[]) => {
        let leftDiag = false
        let rightDiag = false
        if (getSquare(x1, y1) != 'A') return

        if (
            (getSquare(x2, y2) == 'M' && getSquare(x3, y3) == 'S') ||
            (getSquare(x2, y2) == 'S' && getSquare(x3, y3) == 'M')
        ) {
            leftDiag = true
        }

        if (
            (getSquare(x4, y4) == 'M' && getSquare(x5, y5) == 'S') ||
            (getSquare(x4, y4) == 'S' && getSquare(x5, y5) == 'M')
        ) {
            rightDiag = true
        }

        if (leftDiag && rightDiag) {
            part2Score++
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            checkSpotPart2([
                [x, y],
                [x - 1, y - 1],
                [x + 1, y + 1],
                [x - 1, y + 1],
                [x + 1, y - 1],
            ])

            //up
            checkSpotPart1([
                [x, y],
                [x, y - 3],
                [x, y - 2],
                [x, y - 1],
            ])

            //check right up
            checkSpotPart1([
                [x, y],
                [x + 3, y - 3],
                [x + 2, y - 2],
                [x + 1, y - 1],
            ])

            //check right
            checkSpotPart1([
                [x, y],
                [x + 3, y],
                [x + 2, y],
                [x + 1, y],
            ])

            //check right down
            checkSpotPart1([
                [x, y],
                [x + 3, y + 3],
                [x + 2, y + 2],
                [x + 1, y + 1],
            ])

            //check down
            checkSpotPart1([
                [x, y],
                [x, y + 3],
                [x, y + 2],
                [x, y + 1],
            ])

            //check left down
            checkSpotPart1([
                [x, y],
                [x - 3, y + 3],
                [x - 2, y + 2],
                [x - 1, y + 1],
            ])

            //check left
            checkSpotPart1([
                [x, y],
                [x - 3, y],
                [x - 2, y],
                [x - 1, y],
            ])

            //check left up
            checkSpotPart1([
                [x, y],
                [x - 3, y - 3],
                [x - 2, y - 2],
                [x - 1, y - 1],
            ])
        }
    }

    console.log({ part1Score, part2Score })
}

export default main
