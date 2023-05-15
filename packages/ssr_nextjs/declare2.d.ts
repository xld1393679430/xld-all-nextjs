export { }

declare global {
    interface Array<T extends unknown> {
        getLen(): number;
    }

    interface Window {
        localStorage: {
            setItem(key: string, value: string, listener?: boolean): void,
        };
    }

    const localStorage: Storage & {
        setItem(key: string, value: string, listener?: boolean): void,
    };
}

