package com.example.demoIad.repos;

import com.example.demoIad.domain.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepo extends CrudRepository<Product, Long> {   // Integer


}
