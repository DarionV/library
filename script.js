const myLibrary = [];

function Book() {
    this.title = "Frankenstein";
    this.author = "Mary Shelley";
    this.read = false;
    this.info = function () {
        let readStatus = "";
        this.read ? readStatus = ", read." : readStatus = ", not yet read.";
        return this.title + " by " + this.author + readStatus;
    };
}
