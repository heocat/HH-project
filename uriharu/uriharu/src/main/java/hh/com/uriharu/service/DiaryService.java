package hh.com.uriharu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hh.com.uriharu.model.DiaryEntity;
import hh.com.uriharu.persistence.DiaryRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DiaryService {

    @Autowired
    private DiaryRepository repository;


    public List<DiaryEntity> create(final DiaryEntity entity) {
        //Validations
        validate(entity);
        repository.save(entity);
        log.info("Entity Id : {} is saved",entity.getDno());
        return repository.findByWriter(entity.getWriter());

    }

    //리팩토링한 메서드
        private void validate(final DiaryEntity entity){
           
            if (entity == null) {
                log.warn("Entity cannot be null");
                throw new RuntimeException("Entity cannot be null");
            }
    
            if (entity.getWriter()==null) {
                log.warn("unknown user");
                throw new RuntimeException("unknown user");
            }
        }

        //내 아이디로 조회
        public List<DiaryEntity> retrieve(final String userId) {
            return repository.findByWriter(userId);
        }

        //일기 번호로 조회
        public DiaryEntity retrieveByDno(final Long dno) {
            return repository.findById(dno).get();
        }

        //수정
        public DiaryEntity update(final DiaryEntity entity){
            validate(entity);
            DiaryEntity enti = retrieveByDno(entity.getDno());
            if (enti != null) {
                enti.setTitle(entity.getTitle());
                enti.setContents(entity.getContents());
                repository.save(enti);
            }
            
            return retrieveByDno(entity.getDno());
        }

        //삭제
        public List<DiaryEntity> delete(final DiaryEntity entity) {
            validate(entity);
            try {
                repository.delete(entity);
            } catch (Exception e) {
                log.error("error deleting entity ", entity.getDno(),e);
                throw new RuntimeException("error deleting entity "+ entity.getDno());
            }
            return retrieve(entity.getWriter());
        }

    
}
