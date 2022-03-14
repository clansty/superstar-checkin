import formatDate from './formatDate'
import chalk from 'chalk'

const date = () => {
    return formatDate('yyyy/M/d h:mm:ss')
}

export const info = (...message) => {
    console.info(`[${date()}][INFO]`, ...message)
}

export const warn = (...message) => {
    console.warn(chalk.yellow(`[${date()}][WARN]`), ...message)
}

export const error = (...message) => {
    console.error(chalk.red(`[${date()}][ERROR]`), ...message)
}

export const success = (...message) => {
    console.info(chalk.green(`[${date()}][SUCCESS]`), ...message)
}
