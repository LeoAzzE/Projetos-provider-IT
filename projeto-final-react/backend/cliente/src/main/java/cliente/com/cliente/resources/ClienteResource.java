package cliente.com.cliente.resources;

import cliente.com.cliente.entities.Cliente;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/clientes")
public class ClienteResource {

    @GetMapping
    public ResponseEntity<List<Cliente>> findAll() {
        List<Cliente> list = new ArrayList<>();
        list.add(new Cliente(1L, "Leo", "leo@hotmail.com", "12323123", "10/12/1999", "masculino", "21660450", "sad", "sdasd", "sadsda", "sda", "1"));
        return ResponseEntity.ok().body(list);
    }

}
