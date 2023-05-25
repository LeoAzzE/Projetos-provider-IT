package cliente.com.cliente.resources;

import cliente.com.cliente.dto.ClienteDTO;
import cliente.com.cliente.entities.Cliente;
import cliente.com.cliente.services.ClienteService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class ClienteResourceTests {

    @InjectMocks
    private ClienteResource resource;

    @Mock
    private ClienteService service;

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
    void setUp() {
        MockitoAnnotations.openMocks(this);
        startCliente();
    }

    @Test
    void whenFindByIdThenReturnSucess() {
        Mockito.when(service.findById(Mockito.anyLong())).thenReturn(clienteDto);
        ResponseEntity<ClienteDTO> response = resource.findById(clienteDto.getId());
        Assertions.assertNotNull(response);
        Assertions.assertNotNull(response.getBody());
        Assertions.assertEquals(ResponseEntity.class, response.getClass());
        Assertions.assertEquals(ClienteDTO.class, response.getBody().getClass());
    }


}
