package cliente.com.cliente.services;

import cliente.com.cliente.dto.ClienteDTO;
import cliente.com.cliente.entities.Cliente;
import cliente.com.cliente.repositories.ClienteRepository;
import cliente.com.cliente.services.exceptions.ResourceNotFoundException;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.matchers.Any;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;

import java.time.LocalDate;
import java.util.*;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClienteServiceTests {

    @Mock
    private ClienteRepository repository;

    @InjectMocks
    ClienteService service;

    private ClienteDTO clienteDto;
    private Cliente cliente;
    private Optional<Cliente> optionalCliente;

    private void startCliente() {
        clienteDto = new ClienteDTO(1L, "leo", "leo@leo.com", "221323123", LocalDate.now(), "masculino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "77");
        cliente = new Cliente(1L, "leo", "leo@leo.com", "221323123", LocalDate.now(), "masculino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "77");
        optionalCliente = Optional.of(new Cliente(1L, "leo", "leo@leo.com", "221323123", LocalDate.now(), "masculino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "77"));
    }


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        startCliente();
    }

    @Test
    public void whenFindByIdReturnAnClientInstance() {
        Mockito.when(repository.findById(Mockito.anyLong())).thenReturn(optionalCliente);
        ClienteDTO response = service.findById(clienteDto.getId());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(ClienteDTO.class, response.getClass());
        Assertions.assertEquals(clienteDto.getId(), response.getId());
    }

    @Test
    void whenFindByIdReturnAnResourceNotFoundException() {
        Mockito.when(repository.findById(anyLong())).thenThrow(new ResourceNotFoundException("id not found"));

        try {
            service.update(clienteDto.getId(), clienteDto);
        }
        catch (Exception ex) {
            Assertions.assertEquals(ResourceNotFoundException.class, ex.getClass());
            Assertions.assertEquals("id not found", ex.getMessage());
        }
    }

    @Test
    void whenFindAllThenReturnAlistOfClientDto() {
        Mockito.when(repository.findAll()).thenReturn(List.of(cliente));
        List<ClienteDTO> response = service.findAll();
        Assertions.assertNotNull(response);
        Assertions.assertEquals(1, response.size());
        Assertions.assertEquals(ClienteDTO.class, response.get(0).getClass());
        Assertions.assertEquals(clienteDto.getId(), response.get(0).getId());
        Assertions.assertEquals(clienteDto.getNome(), response.get(0).getNome());
        Assertions.assertEquals(clienteDto.getEmail(), response.get(0).getEmail());
        Assertions.assertEquals(clienteDto.getNascimento(), response.get(0).getNascimento());
        Assertions.assertEquals(clienteDto.getCpf(), response.get(0).getCpf());
        Assertions.assertEquals(clienteDto.getCep(), response.get(0).getCep());
        Assertions.assertEquals(clienteDto.getBairro(), response.get(0).getBairro());
        Assertions.assertEquals(clienteDto.getCidade(), response.get(0).getCidade());
        Assertions.assertEquals(clienteDto.getEstado(), response.get(0).getEstado());
        Assertions.assertEquals(clienteDto.getLogradouro(), response.get(0).getLogradouro());
        Assertions.assertEquals(clienteDto.getGenero(), response.get(0).getGenero());
        Assertions.assertEquals(clienteDto.getNumero(), response.get(0).getNumero());
    }

    @Test
    void whenInsertThenReturnSucess() {
        Mockito.when(repository.save(Mockito.any())).thenReturn(cliente);
        ClienteDTO response = service.insert(clienteDto);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(ClienteDTO.class, response.getClass());
        Assertions.assertEquals(clienteDto.getId(), response.getId());
        Assertions.assertEquals(clienteDto.getNome(), response.getNome());
        Assertions.assertEquals(clienteDto.getEmail(), response.getEmail());
        Assertions.assertEquals(clienteDto.getNascimento(), response.getNascimento());
        Assertions.assertEquals(clienteDto.getCpf(), response.getCpf());
        Assertions.assertEquals(clienteDto.getCep(), response.getCep());
        Assertions.assertEquals(clienteDto.getBairro(), response.getBairro());
        Assertions.assertEquals(clienteDto.getCidade(), response.getCidade());
        Assertions.assertEquals(clienteDto.getEstado(), response.getEstado());
        Assertions.assertEquals(clienteDto.getLogradouro(), response.getLogradouro());
        Assertions.assertEquals(clienteDto.getGenero(), response.getGenero());
        Assertions.assertEquals(clienteDto.getNumero(), response.getNumero());
    }

    @Test
    void whenUpdateThenReturnSucess() {
        Mockito.when(repository.save(Mockito.any())).thenReturn(cliente);
        Mockito.when(repository.getReferenceById(clienteDto.getId())).thenReturn(cliente);
        ClienteDTO response = service.update(clienteDto.getId(), clienteDto);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(ClienteDTO.class, response.getClass());
        Assertions.assertEquals(clienteDto.getId(), response.getId());
        Assertions.assertEquals(clienteDto.getNome(), response.getNome());
        Assertions.assertEquals(clienteDto.getEmail(), response.getEmail());
        Assertions.assertEquals(clienteDto.getNascimento(), response.getNascimento());
        Assertions.assertEquals(clienteDto.getCpf(), response.getCpf());
        Assertions.assertEquals(clienteDto.getCep(), response.getCep());
        Assertions.assertEquals(clienteDto.getBairro(), response.getBairro());
        Assertions.assertEquals(clienteDto.getCidade(), response.getCidade());
        Assertions.assertEquals(clienteDto.getEstado(), response.getEstado());
        Assertions.assertEquals(clienteDto.getLogradouro(), response.getLogradouro());
        Assertions.assertEquals(clienteDto.getGenero(), response.getGenero());
        Assertions.assertEquals(clienteDto.getNumero(), response.getNumero());
    }

    @Test
    void whenUpdateThenReturnResourceNotFoundException() {
        Mockito.when(repository.getReferenceById(anyLong())).thenThrow(new ResourceNotFoundException("id not found"));
        try {
            service.update(clienteDto.getId(), clienteDto);
        }
        catch(Exception ex) {
            Assertions.assertEquals(ResourceNotFoundException.class, ex.getClass());
            Assertions.assertEquals("id not found", ex.getMessage());
        }
    }

    @Test
    void whenDeleteWithSucess() {
        Mockito.doNothing().when(repository).deleteById(clienteDto.getId());
        service.delete(clienteDto.getId());
        verify(repository, times(1)).deleteById(anyLong());
    }

    @Test
    void whenDeleteWithResourceNotFoundException() {
        Mockito.when(repository.findById(anyLong())).thenThrow(new ResourceNotFoundException("id not found"));

        try {
            service.delete(clienteDto.getId());
        }
        catch (Exception ex) {
            Assertions.assertEquals(ResourceNotFoundException.class, ex.getClass());
            Assertions.assertEquals("id not found", ex.getMessage());
        }
    }
}
