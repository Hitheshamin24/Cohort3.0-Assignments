class Book {
  #book = [];
  static id = 0;
  addBook(title, author, borrowed) {
    Book.id++;

    let obj = { id:Book.id, title, author, borrowed };
    this.#book.push(obj);
  
  }
  borrowBook(id) {
    let bookIndex = this.#book.findIndex((b) => b.id == id);
    if (bookIndex !== -1) {
      if (this.#book[bookIndex].borrowed != true) {
        console.log("Book borrowed successfully");
        this.#book[bookIndex].borrowed = true;
      } else {
        console.log("Book is already borrowed");
      }
    } else {
      console.log("Invalid Index");
    }
  }
  returnBook(id) {
    let bookIndex = this.#book.findIndex((b) => b.id == id);
    if (bookIndex !== -1) {
      if (this.#book[bookIndex].borrowed != false) {
        console.log("Book returned successfully");
        this.#book[bookIndex].borrowed = false;
      } else {
        console.log("Book is already borrowed");
      }
    } else {
      console.log("Invalid index");
    }
  }
  showAvailableBooks() {
    return this.#book.filter((b) => b.borrowed != true);
  }
}
let library=new Book()
library.addBook("Richdad POor dad","Robert Kiyosaki",false)
library.addBook("Our Love Stroy","Hithvi",false)
console.log("All books")
console.log(library.showAvailableBooks())
library.borrowBook(2)
console.log("After borrowing secong book")
console.log(library.showAvailableBooks())
library.returnBook(2)
console.log("After returing second book")
console.log(library.showAvailableBooks())

