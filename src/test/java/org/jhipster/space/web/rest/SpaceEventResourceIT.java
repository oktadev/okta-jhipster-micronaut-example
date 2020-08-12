package org.jhipster.space.web.rest;


import org.jhipster.space.domain.SpaceEvent;
import org.jhipster.space.repository.SpaceEventRepository;

import io.micronaut.context.annotation.Property;
import io.micronaut.core.type.Argument;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.RxHttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.http.client.exceptions.HttpClientResponseException;
import io.micronaut.test.annotation.MicronautTest;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import javax.inject.Inject;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;


import org.jhipster.space.domain.enumeration.SpaceEventType;
/**
 * Integration tests for the {@Link SpaceEventResource} REST controller.
 */
@MicronautTest(transactional = false)
@Property(name = "micronaut.security.enabled", value = "false")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SpaceEventResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final SpaceEventType DEFAULT_TYPE = SpaceEventType.LAUNCH;
    private static final SpaceEventType UPDATED_TYPE = SpaceEventType.LANDING;

    @Inject
    private SpaceEventRepository spaceEventRepository;

    @Inject @Client("/")
    RxHttpClient client;

    private SpaceEvent spaceEvent;

    @BeforeEach
    public void initTest() {
        spaceEvent = createEntity();
    }

    @AfterEach
    public void cleanUpTest() {
        spaceEventRepository.deleteAll();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SpaceEvent createEntity() {
        SpaceEvent spaceEvent = new SpaceEvent()
            .name(DEFAULT_NAME)
            .date(DEFAULT_DATE)
            .description(DEFAULT_DESCRIPTION)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .type(DEFAULT_TYPE);
        return spaceEvent;
    }


    @Test
    public void createSpaceEvent() throws Exception {
        int databaseSizeBeforeCreate = spaceEventRepository.findAll().size();

        // Create the SpaceEvent
        HttpResponse<SpaceEvent> response = client.exchange(HttpRequest.POST("/api/space-events", spaceEvent), SpaceEvent.class).blockingFirst();

        assertThat(response.status().getCode()).isEqualTo(HttpStatus.CREATED.getCode());

        // Validate the SpaceEvent in the database
        List<SpaceEvent> spaceEventList = spaceEventRepository.findAll();
        assertThat(spaceEventList).hasSize(databaseSizeBeforeCreate + 1);
        SpaceEvent testSpaceEvent = spaceEventList.get(spaceEventList.size() - 1);

        assertThat(testSpaceEvent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSpaceEvent.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSpaceEvent.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSpaceEvent.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testSpaceEvent.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testSpaceEvent.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    public void createSpaceEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = spaceEventRepository.findAll().size();

        // Create the SpaceEvent with an existing ID
        spaceEvent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        HttpResponse<SpaceEvent> response = client.exchange(HttpRequest.POST("/api/space-events", spaceEvent), SpaceEvent.class)
            .onErrorReturn(t -> (HttpResponse<SpaceEvent>) ((HttpClientResponseException) t).getResponse()).blockingFirst();

        assertThat(response.status().getCode()).isEqualTo(HttpStatus.BAD_REQUEST.getCode());

        // Validate the SpaceEvent in the database
        List<SpaceEvent> spaceEventList = spaceEventRepository.findAll();
        assertThat(spaceEventList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = spaceEventRepository.findAll().size();
        // set the field null
        spaceEvent.setName(null);

        // Create the SpaceEvent, which fails.

        HttpResponse<SpaceEvent> response = client.exchange(HttpRequest.POST("/api/space-events", spaceEvent), SpaceEvent.class)
            .onErrorReturn(t -> (HttpResponse<SpaceEvent>) ((HttpClientResponseException) t).getResponse()).blockingFirst();

        assertThat(response.status().getCode()).isEqualTo(HttpStatus.BAD_REQUEST.getCode());

        List<SpaceEvent> spaceEventList = spaceEventRepository.findAll();
        assertThat(spaceEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = spaceEventRepository.findAll().size();
        // set the field null
        spaceEvent.setDate(null);

        // Create the SpaceEvent, which fails.

        HttpResponse<SpaceEvent> response = client.exchange(HttpRequest.POST("/api/space-events", spaceEvent), SpaceEvent.class)
            .onErrorReturn(t -> (HttpResponse<SpaceEvent>) ((HttpClientResponseException) t).getResponse()).blockingFirst();

        assertThat(response.status().getCode()).isEqualTo(HttpStatus.BAD_REQUEST.getCode());

        List<SpaceEvent> spaceEventList = spaceEventRepository.findAll();
        assertThat(spaceEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = spaceEventRepository.findAll().size();
        // set the field null
        spaceEvent.setType(null);

        // Create the SpaceEvent, which fails.

        HttpResponse<SpaceEvent> response = client.exchange(HttpRequest.POST("/api/space-events", spaceEvent), SpaceEvent.class)
            .onErrorReturn(t -> (HttpResponse<SpaceEvent>) ((HttpClientResponseException) t).getResponse()).blockingFirst();

        assertThat(response.status().getCode()).isEqualTo(HttpStatus.BAD_REQUEST.getCode());

        List<SpaceEvent> spaceEventList = spaceEventRepository.findAll();
        assertThat(spaceEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllSpaceEvents() throws Exception {
        // Initialize the database
        spaceEventRepository.saveAndFlush(spaceEvent);

        // Get the spaceEventList w/ all the spaceEvents
        List<SpaceEvent> spaceEvents = client.retrieve(HttpRequest.GET("/api/space-events?eagerload=true"), Argument.listOf(SpaceEvent.class)).blockingFirst();
        SpaceEvent testSpaceEvent = spaceEvents.get(0);


        assertThat(testSpaceEvent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSpaceEvent.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSpaceEvent.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSpaceEvent.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testSpaceEvent.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testSpaceEvent.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    public void getSpaceEvent() throws Exception {
        // Initialize the database
        spaceEventRepository.saveAndFlush(spaceEvent);

        // Get the spaceEvent
        SpaceEvent testSpaceEvent = client.retrieve(HttpRequest.GET("/api/space-events/" + this.spaceEvent.getId()), SpaceEvent.class).blockingFirst();


        assertThat(testSpaceEvent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSpaceEvent.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSpaceEvent.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSpaceEvent.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testSpaceEvent.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testSpaceEvent.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    public void getNonExistingSpaceEvent() throws Exception {
        // Get the spaceEvent
        HttpResponse<SpaceEvent> response = client.exchange(HttpRequest.GET("/api/space-events/"+ Long.MAX_VALUE), SpaceEvent.class)
            .onErrorReturn(t -> (HttpResponse<SpaceEvent>) ((HttpClientResponseException) t).getResponse()).blockingFirst();

        assertThat(response.status().getCode()).isEqualTo(HttpStatus.NOT_FOUND.getCode());
    }

    @Test
    public void updateSpaceEvent() throws Exception {
        // Initialize the database
        spaceEventRepository.saveAndFlush(spaceEvent);

        int databaseSizeBeforeUpdate = spaceEventRepository.findAll().size();

        // Update the spaceEvent
        SpaceEvent updatedSpaceEvent = spaceEventRepository.findById(spaceEvent.getId()).get();

        updatedSpaceEvent
            .name(UPDATED_NAME)
            .date(UPDATED_DATE)
            .description(UPDATED_DESCRIPTION)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .type(UPDATED_TYPE);

        HttpResponse<SpaceEvent> response = client.exchange(HttpRequest.PUT("/api/space-events", updatedSpaceEvent), SpaceEvent.class)
            .onErrorReturn(t -> (HttpResponse<SpaceEvent>) ((HttpClientResponseException) t).getResponse()).blockingFirst();

        assertThat(response.status().getCode()).isEqualTo(HttpStatus.OK.getCode());

        // Validate the SpaceEvent in the database
        List<SpaceEvent> spaceEventList = spaceEventRepository.findAll();
        assertThat(spaceEventList).hasSize(databaseSizeBeforeUpdate);
        SpaceEvent testSpaceEvent = spaceEventList.get(spaceEventList.size() - 1);

        assertThat(testSpaceEvent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSpaceEvent.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSpaceEvent.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSpaceEvent.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testSpaceEvent.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testSpaceEvent.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    public void updateNonExistingSpaceEvent() throws Exception {
        int databaseSizeBeforeUpdate = spaceEventRepository.findAll().size();

        // Create the SpaceEvent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        HttpResponse<SpaceEvent> response = client.exchange(HttpRequest.PUT("/api/space-events", spaceEvent), SpaceEvent.class)
            .onErrorReturn(t -> (HttpResponse<SpaceEvent>) ((HttpClientResponseException) t).getResponse()).blockingFirst();

        assertThat(response.status().getCode()).isEqualTo(HttpStatus.BAD_REQUEST.getCode());

        // Validate the SpaceEvent in the database
        List<SpaceEvent> spaceEventList = spaceEventRepository.findAll();
        assertThat(spaceEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSpaceEvent() throws Exception {
        // Initialize the database with one entity
        spaceEventRepository.saveAndFlush(spaceEvent);

        int databaseSizeBeforeDelete = spaceEventRepository.findAll().size();

        // Delete the spaceEvent
        HttpResponse<SpaceEvent> response = client.exchange(HttpRequest.DELETE("/api/space-events/"+ spaceEvent.getId()), SpaceEvent.class)
            .onErrorReturn(t -> (HttpResponse<SpaceEvent>) ((HttpClientResponseException) t).getResponse()).blockingFirst();

        // Validate the database is now empty
        List<SpaceEvent> spaceEventList = spaceEventRepository.findAll();
        assertThat(spaceEventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpaceEvent.class);
        SpaceEvent spaceEvent1 = new SpaceEvent();
        spaceEvent1.setId(1L);
        SpaceEvent spaceEvent2 = new SpaceEvent();
        spaceEvent2.setId(spaceEvent1.getId());
        assertThat(spaceEvent1).isEqualTo(spaceEvent2);
        spaceEvent2.setId(2L);
        assertThat(spaceEvent1).isNotEqualTo(spaceEvent2);
        spaceEvent1.setId(null);
        assertThat(spaceEvent1).isNotEqualTo(spaceEvent2);
    }
}
