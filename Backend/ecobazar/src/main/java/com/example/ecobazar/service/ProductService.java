package com.example.ecobazar.service;

import com.example.ecobazar.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();
    Product findById(int theId);
    Product save(Product theProduct);
    void deleteById(int theId);
}
