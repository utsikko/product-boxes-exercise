class ProductDescription {
  // 1. describe and create / initiate our object
  constructor() {
    this.modal = document.querySelector(".modal-popup");
    this.openButton = document.querySelectorAll(".open-popup");
    this.closeButton = document.querySelectorAll(".close-popup");
    this.isModalOpen = false;
    this.resultsModalTitle = document.querySelector("#descriptionModalLabel");
    this.resultsModalDescription = document.querySelector("#modalResults");
    this.events();
  }

  // 2. events
  events() {
    this.openButton.forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        const productId = el.getAttribute("name");
        this.openModal(productId);
      });
    });

    document.addEventListener("keydown", e => this.keyPressDispatcher(e));

    this.closeButton.forEach(el => {
      el.addEventListener("click", e => {
        this.closeModal();
      });
    });
  }

  // 3. methods
  async getDescription(productId) {
    try {
      const response = await axios.get("/products/server/RequestHandler.php?productId=" + productId);
      this.resultsModalTitle.innerHTML = `${response.data.title}`;
      this.resultsModalDescription.innerHTML = `${response.data.description}`;
    } catch (error) {
      console.log("Oops! something went wrong...", error);
    }
  }

  openModal(productId) {
    this.modal.style.display = "block";
    this.getDescription(productId);
    this.isModalOpen = true;
  }

  closeModal() {
    this.modal.style.display = "none";
    this.isModalOpen = false;
  }

  keyPressDispatcher(e) {
    if (e.keyCode == 27 && this.isModalOpen) {
      this.closeModal();
    }
  }
}

const productDescription = new ProductDescription();
