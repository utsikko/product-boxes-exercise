<?php
include_once('Request.php');

define("products", [
  "basketball",
  "jersey",
  "shoes"
]);

define("productDesc", [
  "Orange ball! The official basketball played in the NBA, now for special price.",
  "Number 1! The jersey of the raising star Devin Booker.",
  "Cool shoes! Just released, the newest arrival of Air Jordan brand.",
  "Could not find product description."
]);

class RequestHandler extends Request {
  function __construct($productId) {
    $this->productId = $this->sanitizeParam($productId);
  }

  public function handleRequest() {
    if(!empty($this->productId)) {
      $description = $this->getDescriptionByProductId();
      $response = array(
        'status' => true,
        'message' => 'success',
        'title' => $this->productId,
        'description' => $description
      );
    } else {
      $response = array(
        'status' => false,
        'message' => 'fail',
        'title' => 'No product available',
        'description' => $description
      );
    }

    header('Content-Type: application/json;charset=utf-8');
    return json_encode($response);
  }

  private function getDescriptionByProductId(): string {
    $productIdParam = $this->productId;
      if($productIdParam == products[0]) {
        return productDesc[0];
      } elseif($productIdParam == products[1]) {
        return productDesc[1];
      } elseif($productIdParam == products[2]) {
        return productDesc[2];
      }
    return productDesc[3];
  }

  private function sanitizeParam($urlParam): string {
    $urlParam = trim($urlParam);
    $urlParam = stripslashes($urlParam);
    $urlParam = htmlspecialchars($urlParam);
    return $urlParam;
  }
}

$requestHandler = new RequestHandler($_GET['productId']);
$returnedObj = $requestHandler->handleRequest();
echo($returnedObj);
?>