package com.example.demoIad.repos;

import com.example.demoIad.domain.Product;
import com.example.demoIad.domain.Shop;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ShopRepo extends CrudRepository<Shop, Long> {   // Integer


}
