package com.project.AlexIad.repos;

import com.project.AlexIad.domain.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepo extends CrudRepository<Product, Long> {   // Integer


}
