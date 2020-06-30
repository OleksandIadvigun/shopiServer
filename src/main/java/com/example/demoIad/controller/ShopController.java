package com.example.demoIad.controller;

import com.example.demoIad.domain.Product;
import com.example.demoIad.domain.Shop;
import com.example.demoIad.repos.ProductRepo;
import com.example.demoIad.repos.ShopRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/shop")
public class ShopController {

   private final ShopRepo shopRepo;

    @Autowired
    public ShopController(ShopRepo shopRepo) {
        this.shopRepo = shopRepo;
    }

    @GetMapping
    public List<Shop> list(
            @RequestParam(name = "name", required = false, defaultValue = "BOSS") String name, Model model) {
        model.addAttribute("name", name);
        return (List<Shop>) shopRepo.findAll();
    }
    @GetMapping("{id}")
    public Shop getOne(@PathVariable("id") Shop shop) {
        return shop;
    }

    @PostMapping
    public Shop create(@RequestBody Shop shop) {
        shop.setCreationDate(LocalDateTime.now());
        return shopRepo.save(shop);
    }

    @PutMapping("{id}")
    public Shop update(@PathVariable ("id") Shop shopFromDB,
                          @RequestBody Shop shop) {      // message from user

        BeanUtils.copyProperties(shop, shopFromDB, "id");
        return shopRepo.save(shopFromDB) ;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable ("id") Shop shop) {

        shopRepo.delete(shop);
    }

}