package org.jhipster.space.repository;

import org.jhipster.space.domain.SpaceEvent;


import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;


import javax.persistence.EntityManager;
import javax.transaction.Transactional;

/**
 * Micronaut Data  repository for the SpaceEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public abstract class SpaceEventRepository implements JpaRepository<SpaceEvent, Long> {
    
    private EntityManager entityManager;


    public SpaceEventRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public SpaceEvent mergeAndSave(SpaceEvent spaceEvent) {
        spaceEvent = entityManager.merge(spaceEvent);
        return save(spaceEvent);
    }

}
