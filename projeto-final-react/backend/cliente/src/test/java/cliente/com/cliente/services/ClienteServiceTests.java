package cliente.com.cliente.services;

import cliente.com.cliente.dto.ClienteDTO;
import cliente.com.cliente.entities.Cliente;
import cliente.com.cliente.repositories.ClienteRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.mockito.Mockito.when;

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
        clienteDto = new ClienteDTO(1L, "leo", "leo@leo.com", "221323123", new Date(), "masculino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "77");
        cliente = new Cliente(1L, "leo", "leo@leo.com", "221323123", new Date(), "masculino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "77");
        optionalCliente = Optional.of(new Cliente(1L, "leo", "leo@leo.com", "221323123", new Date(), "masculino",
                "2121332", "RJ", "RJ", "guadalupe", "rua francisco portela", "77"));
    }


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        startCliente();
    }

    @Test
    public void whenFindByIdReturnAnUserInstance() {
        Mockito.when(repository.findById(Mockito.anyLong())).thenReturn(optionalCliente);
        ClienteDTO response = service.findById(clienteDto.getId());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(ClienteDTO.class, response.getClass());
        Assertions.assertEquals(clienteDto.getId(), response.getId());
    }

}
