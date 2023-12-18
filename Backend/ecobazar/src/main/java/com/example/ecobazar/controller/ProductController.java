package com.example.ecobazar.controller;

import com.example.ecobazar.entity.Product;
import com.example.ecobazar.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ProductController {
    private ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.findAll();
    }
    @GetMapping("/products/{productId}")
    public Product getProduct(@PathVariable int productId) {
        return productService.findById(productId);
    }
    @PostMapping("/products")
    public Product addProduct(@RequestBody Product theProduct) {
        theProduct.setId(0);
        return productService.save(theProduct);
    }
    @PutMapping("/products")
    public Product updateProduct(@RequestBody Product theProduct) {
        return productService.save(theProduct);
    }
    @DeleteMapping("/products/{productId}")
    public String deleteProduct(@PathVariable int productId) {
        Product tempProduct = productService.findById(productId);
        if(tempProduct == null) {
            throw new RuntimeException("Product id not found - " + productId);
        }
        productService.deleteById(productId);
        return "Deleted employee id - " + productId;
    }
}
