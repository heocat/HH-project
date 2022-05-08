package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//오브젝트 생성을 위한 디자인 패턴 중 하나
//builder 클래스를 개발하지 않고도 builder패턴 이용가능
@Builder
//매개변수가 없는 생성자를 구현해줌
@NoArgsConstructor
//클래스의 모든 맴버변수를 매개변수로 받는 생성자를 구현
@AllArgsConstructor
//클래스 멤버 변수의 getter,setter 메서드를 구현해준다.
@Data
@Entity
@Table(name = "Todo")
public class TodoEntity {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    private String userId;
    private String title;
    private boolean done;

}
