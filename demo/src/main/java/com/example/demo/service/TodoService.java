package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.TodoEntity;
import com.example.demo.persistence.TodoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TodoService {

    @Autowired
    private TodoRepository repository;


    public String testService() {
        TodoEntity entity = TodoEntity.builder().title("My first todo Item").build();
        repository.save(entity);
        TodoEntity savedEntity = repository.findById(entity.getId()).get();
        return savedEntity.getTitle();
    }

    public List<TodoEntity> create(final TodoEntity entity) {
        //Validations

        validate(entity);
        repository.save(entity);
        log.info("Entity Id : {} is saved",entity.getId());
        return repository.findByUserId(entity.getUserId());

    }

    //리팩토링한 메서드
        private void validate(final TodoEntity entity){
           
            if (entity == null) {
                log.warn("Entity cannot be null");
                throw new RuntimeException("Entity cannot be null");
            }
    
            if (entity.getUserId()==null) {
                log.warn("unknown user");
                throw new RuntimeException("unknown user");
            }
        }

        //조회
        public List<TodoEntity> retrieve(final String userId) {
            return repository.findByUserId(userId);
        }

        //수정
        public List<TodoEntity> update(final TodoEntity entity){
            validate(entity);
            final Optional<TodoEntity> original = repository.findById(entity.getId());
            original.ifPresent(todo->{
                todo.setTitle(entity.getTitle());
                todo.setDone(entity.isDone());

                repository.save(todo);
            });
            return retrieve(entity.getUserId());
        }

        //삭제
        public List<TodoEntity> delete(final TodoEntity entity) {
            validate(entity);
            try {
                repository.delete(entity);
            } catch (Exception e) {
                log.error("error deleting entity ", entity.getId(),e);
                throw new RuntimeException("error deleting entity "+ entity.getId());
            }
            return retrieve(entity.getUserId());
        }

    
}
