package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.TestRequstBodyDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("test")
public class TestController {
    
    @GetMapping
    public String testController(){
        return "Hello World!";
    }

    @GetMapping("/testGetMapping")
    public String testControllerWithPath(){
        return "Hello World! testGetmapping! ";
    }

    @GetMapping(value="/{id}")
    public String testControllerWithPathVaribles(@PathVariable(required = false) int id) {
        return "Helloe world ID " + id;
    }

    @GetMapping(value="testRequestParam")
    public String testControllerRequestParam(@RequestParam(required = true) int id) {
        return "Hellow World ID" + id;
    }

    //@RequestBody는 RequestBody로 보내오는 JSON을 testRequstBodyDTO오브젝트로 변환해 가져로하는 끗
    @GetMapping(value="/testRequestBody")
    public String testControllerRequstBody(@RequestBody TestRequstBodyDTO testRequstBodyDTO) {
        return "Hello World! ID" + testRequstBodyDTO.getId() + "msg:" +testRequstBodyDTO.getMsg();
    }

    @GetMapping(value="/testResponseBody")
    public ResponseDTO<String> testControlleResponseBody() {
        List<String> list =new ArrayList<>();
        list.add("Hello world! i'm response entity");
        ResponseDTO<String> response = ResponseDTO.<String>builder().data(list).build();
        return response;
    }
    //ResponseDTO를 리턴하는 것과 ResponseEntity를 리턴하는 것의 유일한 차이는 HTTP staus를 조작할 수 있다는 것이다
    //정상적인 답 반환을 원한다면 ok().body(response)를 사용
    @GetMapping(value="/testResponseEntity")
    public ResponseEntity<?> testControllerREResponseEntity() {
        List<String> list = new ArrayList<>();
        list.add("hello world! i'm responseEntity. And you got 400!");
        ResponseDTO<String> response =  ResponseDTO.<String>builder().data(list).build();
        return  ResponseEntity.badRequest().body(response);
        // return  ResponseEntity.ok().body(response);
    }
    
    
    
    
    
}
