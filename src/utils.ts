export function notNull<T>(value: T): value is NonNullable<T> {
    return value != null
}

export function raise(message: string): never {
    throw new Error(message)
}
