class CancellationToken {
    private _isCancelled = false;

    cancel() {
        this._isCancelled = true;
    }

    get isCancelled(): boolean {
        return this._isCancelled;
    }
}

export { CancellationToken };