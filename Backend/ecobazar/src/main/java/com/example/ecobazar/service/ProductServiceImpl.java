package com.example.ecobazar.service;

import com.example.ecobazar.entity.Product;
import com.example.ecobazar.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{
    private ProductRepository productRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(int theId) {
        Optional<Product> product = productRepository.findById(theId);
        Product theProduct = null;
        if (product.isPresent()) {
            theProduct = product.get();
        }
        else {
            throw new RuntimeException("Did not find product id - " + theId);
        }

        return theProduct;
    }

    @Override
    public Product save(Product theProduct) {
        return productRepository.save(theProduct);
    }

    @Override
    public void deleteById(int theId) {
        productRepository.deleteById(theId);
    }
}
