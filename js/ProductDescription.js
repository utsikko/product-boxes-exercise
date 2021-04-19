class ProductDescription {
  // 1. describe and create / initiate our object
  constructor() {
    this.resultsModalTitle = document.querySelector("#descriptionModalLabel");
    this.resultsModalDescription = document.querySelector("#modalResults");
    this.descButtons = document.querySelectorAll(".description");
    this.events();
  }

  // 2. events
  events() {
    this.descButtons.forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        const productId = el.getAttribute("name");
        this.getDescription(productId);
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
}

const productDescription = new ProductDescription();
