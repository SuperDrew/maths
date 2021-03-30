class NotImplementedError extends Error {
    constructor(message: string) {
        super(`Not implemented yet: ${message}`);
        this.name = 'NotImplementedError';
    }
}

export { NotImplementedError };
