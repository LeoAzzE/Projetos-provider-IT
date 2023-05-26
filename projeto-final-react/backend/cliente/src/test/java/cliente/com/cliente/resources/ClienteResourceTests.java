package cliente.com.cliente.resources;

import cliente.com.cliente.dto.ClienteDTO;

import cliente.com.cliente.services.ClienteService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;


import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(ClienteResourceTests.class)
public class ClienteResourceTests {

    @InjectMocks
    private ClienteResource resource;

    @Mock
    private ClienteService service;

    ObjectMapper objectMapper = new ObjectMapper();
    ObjectWriter objectWriter = objectMapper.writer();


    private MockMvc mockMvc;


        ClienteDTO clienteDto = new ClienteDTO(1L, "leo", "leo@leo.com", "221323123", new Date(), "masculino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "77");
        ClienteDTO clienteDto2 = new ClienteDTO(2L, "leandro", "leo@leo.com", "221323123", new Date(), "masculino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "77");


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(resource).build();

    }


    @Test
    void whenGetAllClientesThenReturnSucess() throws Exception {
        List<ClienteDTO> clientes = new ArrayList<>(Arrays.asList(clienteDto, clienteDto2));
        Mockito.when(service.findAll()).thenReturn(clientes);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/clientes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("[0].nome", is("leo")))
                .andExpect(MockMvcResultMatchers.jsonPath("[1].nome", is("leandro")));
    }

    @Test
    void whenFindByIdThenReturnSucess() throws Exception {
        Mockito.when(service.findById(clienteDto.getId())).thenReturn(clienteDto);

        mockMvc.perform(MockMvcRequestBuilders
               .get("/clientes/1")
               .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andExpect(MockMvcResultMatchers.jsonPath("$.nome", is("leo")))
               .andExpect(MockMvcResultMatchers.jsonPath("$", notNullValue()));
    }

    @Test
    void whenInsertThenReturnSucess() throws Exception {
        ClienteDTO cliente = new ClienteDTO(3L, "leticia", "letícia@gmail.com", "221312323", new Date(), "feminino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "70");

        Mockito.when(service.insert(cliente)).thenReturn(cliente);

        String content = objectWriter.writeValueAsString(cliente);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(content);
        mockMvc.perform(mockRequest)
                .andExpect(status().is4xxClientError())
                .andDo(print());

    }

    @Test
    void whenUpdateThenReturnSucess() throws Exception {
        ClienteDTO cliente = new ClienteDTO(1L, "new name leo Chaves", "leo@leo.com", "221323123", new Date(), "masculino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "77");

        Mockito.when(service.update(clienteDto.getId(), cliente)).thenReturn(cliente);

        String updatedContent = objectWriter.writeValueAsString(cliente);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/clientes")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(updatedContent);
        mockMvc.perform(mockRequest)
                .andExpect(status().is4xxClientError())
                .andDo(print());
    }

    @Test
    void whenDeleteThenReturnSucess() throws Exception {
        Mockito.doNothing().when(service).delete(clienteDto.getId());
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/clientes/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

}
