package com.example.demoIad.controller;

import com.example.demoIad.domain.Product;
import com.example.demoIad.domain.Views;
import com.example.demoIad.repos.ProductRepo;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Generated;
import org.junit.Test;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/alarms")
public class AlarmController {
    private ProductRepo productRepo;

    @Autowired
    public AlarmController(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    @GetMapping
    @Test
    @JsonView(Views.IdName.class)
    public List<Product> findExpiratedProducts() {
        LocalDateTime localDateTime = LocalDateTime.now();
        List<Product> all = (List<Product>) productRepo.findAll();
        List<Product> sortedList = all.stream().sorted(Comparator.comparing(a ->
                a.getOverdueDate()))
                    .filter(a -> a.getOverdueDate().isBefore(localDateTime) ||
                        a.getOverdueDate().isEqual(localDateTime))
                .collect(Collectors.toList());
        return sortedList;
    }

    @GetMapping("{id}")
    public Product getOne(@PathVariable("id") Product product) {
        return product;
    }


    @PostMapping
    public Product create(@RequestBody Product product) {
        product.setCreationDate(LocalDateTime.now());
        product.setOverdueDate(product.getCreationDate().plusDays(product.getExpiration()));
        return productRepo.save(product);
    }

    @PutMapping("{id}")
    public Product update(@PathVariable("id") Product productFromDB,
                          @RequestBody Product product) {      // message from user

        BeanUtils.copyProperties(product, productFromDB, "id");
        productFromDB.setCreationDate(LocalDateTime.now());
        productFromDB.setOverdueDate(productFromDB.getCreationDate().plusDays(productFromDB.getExpiration()));
        return productRepo.save(productFromDB);
    }


    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Product product) {

        productRepo.delete(product);
    }

}

