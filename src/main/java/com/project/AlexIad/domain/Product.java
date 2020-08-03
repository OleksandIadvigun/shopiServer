package com.project.AlexIad.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@ToString(of = {"id", "name", "creationDate"})
@EqualsAndHashCode(of = {"id"})
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.IdName.class)
    private Long id;
    @JsonView(Views.IdName.class)
    private String name;
    @JsonView(Views.IdName.class)
    private int amount;
    @JsonView(Views.IdName.class)
    private int expiration;
    //@Column(updatable = true )
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonView(Views.IdName.class)
    private LocalDateTime creationDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonView(Views.IdName.class)
    private LocalDateTime overdueDate;

    public LocalDateTime getOverdueDate() {
        return overdueDate;
    }

    public void setOverdueDate(LocalDateTime overdueDate) {
        this.overdueDate = overdueDate;
    }


    public Product() {
    }

    public Product(String name, int amount, int expiration) {
        this.name = name;
        this.amount = amount;
        this.expiration = expiration;
    }


    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getExpiration() {
        return expiration;
    }

    public void setExpiration(int expiration) {
        this.expiration = expiration;
    }


    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }


    public String getName() {
        return name;
    }

    public void setName(String text) {
        this.name = text;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
