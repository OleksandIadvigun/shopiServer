package com.example.demoIad.domain;



import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@ToString(of = {"id", "name", "longitude","latitude", "creationDate"})
@EqualsAndHashCode(of = {"id"})
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.ShopView.class)
    private Long id;
    @JsonView(Views.ShopView.class)
    private String name;

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    //private Address address;
    @JsonView(Views.ShopView.class)
    private float latitude;
    @JsonView(Views.ShopView.class)
    private float longitude;
    @JsonView(Views.ShopView.class)
    private int areaSize;

    @Column(updatable = false )
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonView(Views.ShopView.class)
    private LocalDateTime creationDate;

    public Shop(String name, float latitude, float longitude, int areaSize) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.areaSize = areaSize;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAreaSize() {
        return areaSize;
    }

    public void setAreaSize(int areaSize) {
        this.areaSize = areaSize;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }



    public Shop() {
    }

}
