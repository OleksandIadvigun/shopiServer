package com.example.demoIad.controller;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.support.ServletContextResource;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
public class ControllerLink {

    @GetMapping("/list")
    public String shoList(
            @RequestParam(name="name", required=false, defaultValue="user") String name, Model model) {
        model.addAttribute("name", name);
        return "shopi";
    }

    @GetMapping("/listAl")
    public String alarmList(
            @RequestParam(name="name", required=false, defaultValue="user") String name, Model model) {
        model.addAttribute("name", name);
        return "alarms";
    }

    @GetMapping("/products")
    public String info(
            @RequestParam(name="name", required=false, defaultValue="user") String name, Model model) {
        model.addAttribute("name", name);
        return "products";
    }
   // @GetMapping("/downloadApp")
   /* public void getFile(HttpServletResponse response) {
        Path file = Paths.get("C:\\programming projects\\java projects\\serverShopi\\demoIad\\demoIad\\src\\main\\resources\\static\\download/shopi.zip");
        if (Files.exists(file)){
            response.setHeader("Content-disposition", "attachment;filename=" + "download apk shopi");
            response.setContentType("application/zip");

            try {
                Files.copy(file, response.getOutputStream());
                response.getOutputStream().flush();
            } catch ( IOException e) {
                throw new RuntimeException("IOError writing file to output stream");
            }
        }
    }*/
   /* public ResponseEntity<Object> downloadFile() throws IOException, URISyntaxException {
        File file = new File("C:/programming projects/java projects/serverShopi/demoIad/demoIad/shopi.zip");
        InputStreamResource inp = new InputStreamResource(new FileInputStream(file));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition" , "download app");
        ResponseEntity<Object> resp = ResponseEntity.ok().headers(headers).contentType(MediaType
                .parseMediaType("application/zip")).body(inp);
        return resp;
    }*/
}
