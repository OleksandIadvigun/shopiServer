package com.project.AlexIad.controller;


import com.project.AlexIad.domain.Product;
import com.project.AlexIad.domain.Views;
import com.project.AlexIad.repos.ProductRepo;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductRepo productRepo;

    @Autowired
    public ProductController(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }


    @GetMapping
    @JsonView(Views.IdName.class)
    public List<Product> list(
            @RequestParam(name = "name", required = false, defaultValue = "BOSS") String name, Model model) {
        model.addAttribute("name", name);
        return (List<Product>) productRepo.findAll();
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