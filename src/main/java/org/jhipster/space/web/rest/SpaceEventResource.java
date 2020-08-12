package org.jhipster.space.web.rest;

import org.jhipster.space.domain.SpaceEvent;
import org.jhipster.space.repository.SpaceEventRepository;
import org.jhipster.space.web.rest.errors.BadRequestAlertException;

import org.jhipster.space.util.HeaderUtil;
import org.jhipster.space.util.PaginationUtil;
import io.micronaut.context.annotation.Value;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.http.uri.UriBuilder;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.transaction.annotation.ReadOnly;





import javax.annotation.Nullable;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.jhipster.space.domain.SpaceEvent}.
 */
@Controller("/api")
public class SpaceEventResource {

    private final Logger log = LoggerFactory.getLogger(SpaceEventResource.class);

    private static final String ENTITY_NAME = "spaceEvent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SpaceEventRepository spaceEventRepository;

    public SpaceEventResource(SpaceEventRepository spaceEventRepository) {
        this.spaceEventRepository = spaceEventRepository;
    }

    /**
     * {@code POST  /space-events} : Create a new spaceEvent.
     *
     * @param spaceEvent the spaceEvent to create.
     * @return the {@link HttpResponse} with status {@code 201 (Created)} and with body the new spaceEvent, or with status {@code 400 (Bad Request)} if the spaceEvent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @Post("/space-events")
    @ExecuteOn(TaskExecutors.IO)
    public HttpResponse<SpaceEvent> createSpaceEvent(@Body SpaceEvent spaceEvent) throws URISyntaxException {
        log.debug("REST request to save SpaceEvent : {}", spaceEvent);
        if (spaceEvent.getId() != null) {
            throw new BadRequestAlertException("A new spaceEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SpaceEvent result = spaceEventRepository.mergeAndSave(spaceEvent);
        URI location = new URI("/api/space-events/" + result.getId());
        return HttpResponse.created(result).headers(headers -> {
            headers.location(location);
            HeaderUtil.createEntityCreationAlert(headers, applicationName, true, ENTITY_NAME, result.getId().toString());
        });
    }

    /**
     * {@code PUT  /space-events} : Updates an existing spaceEvent.
     *
     * @param spaceEvent the spaceEvent to update.
     * @return the {@link HttpResponse} with status {@code 200 (OK)} and with body the updated spaceEvent,
     * or with status {@code 400 (Bad Request)} if the spaceEvent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the spaceEvent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @Put("/space-events")
    @ExecuteOn(TaskExecutors.IO)
    public HttpResponse<SpaceEvent> updateSpaceEvent(@Body SpaceEvent spaceEvent) throws URISyntaxException {
        log.debug("REST request to update SpaceEvent : {}", spaceEvent);
        if (spaceEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SpaceEvent result = spaceEventRepository.mergeAndSave(spaceEvent);
        return HttpResponse.ok(result).headers(headers ->
            HeaderUtil.createEntityUpdateAlert(headers, applicationName, true, ENTITY_NAME, spaceEvent.getId().toString()));
    }

    /**
     * {@code GET  /space-events} : get all the spaceEvents.
     *
     * @param pageable the pagination information.
     * @return the {@link HttpResponse} with status {@code 200 (OK)} and the list of spaceEvents in body.
     */
    @Get("/space-events")
    @ExecuteOn(TaskExecutors.IO)
    public HttpResponse<List<SpaceEvent>> getAllSpaceEvents(HttpRequest request, Pageable pageable) {
        log.debug("REST request to get a page of SpaceEvents");
        Page<SpaceEvent> page = spaceEventRepository.findAll(pageable);
        return HttpResponse.ok(page.getContent()).headers(headers ->
            PaginationUtil.generatePaginationHttpHeaders(headers, UriBuilder.of(request.getPath()), page));
    }

    /**
     * {@code GET  /space-events/:id} : get the "id" spaceEvent.
     *
     * @param id the id of the spaceEvent to retrieve.
     * @return the {@link HttpResponse} with status {@code 200 (OK)} and with body the spaceEvent, or with status {@code 404 (Not Found)}.
     */
    @Get("/space-events/{id}")
    @ExecuteOn(TaskExecutors.IO)
    public Optional<SpaceEvent> getSpaceEvent(@PathVariable Long id) {
        log.debug("REST request to get SpaceEvent : {}", id);
        
        return spaceEventRepository.findById(id);
    }

    /**
     * {@code DELETE  /space-events/:id} : delete the "id" spaceEvent.
     *
     * @param id the id of the spaceEvent to delete.
     * @return the {@link HttpResponse} with status {@code 204 (NO_CONTENT)}.
     */
    @Delete("/space-events/{id}")
    @ExecuteOn(TaskExecutors.IO)
    public HttpResponse deleteSpaceEvent(@PathVariable Long id) {
        log.debug("REST request to delete SpaceEvent : {}", id);
        spaceEventRepository.deleteById(id);
        return HttpResponse.noContent().headers(headers -> HeaderUtil.createEntityDeletionAlert(headers, applicationName, true, ENTITY_NAME, id.toString()));
    }
}
