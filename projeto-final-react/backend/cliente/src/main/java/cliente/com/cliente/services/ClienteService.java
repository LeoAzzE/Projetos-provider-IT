package cliente.com.cliente.services;

import cliente.com.cliente.dto.ClienteDTO;
import cliente.com.cliente.entities.Cliente;
import cliente.com.cliente.repositories.ClienteRepository;
import cliente.com.cliente.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    @Transactional(readOnly = true)
    public List<ClienteDTO> findAll() {
        List<Cliente> list = repository.findAll();
        List<ClienteDTO> listDto = list.stream().map(x -> new ClienteDTO(x)).collect(Collectors.toList());
        return listDto;
    }

    @Transactional(readOnly = true)
    public ClienteDTO findById(Long id) {
        Optional<Cliente> obj = repository.findById(id);
        Cliente entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
        return new ClienteDTO(entity);
    }

    @Transactional
    public ClienteDTO insert(ClienteDTO dto) {
        Cliente entity = new Cliente();
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setCpf(dto.getCpf());
        entity.setNascimento(dto.getNascimento());
        entity.setGenero(dto.getGenero());
        entity.setCep(dto.getCep());
        entity.setEstado(dto.getEstado());
        entity.setCidade(dto.getCidade());
        entity.setBairro(dto.getBairro());
        entity.setLogradouro(dto.getLogradouro());
        entity.setNumero(dto.getNumero());
        entity = repository.save(entity);
        return new ClienteDTO(entity);
    }

    @Transactional
    public ClienteDTO update(Long id, ClienteDTO dto) {
        try {
            repository.findById(id);
            Cliente entity = repository.getReferenceById(id);
            entity.setNome(dto.getNome());
            entity.setEmail(dto.getEmail());
            entity.setCpf(dto.getCpf());
            entity.setNascimento(dto.getNascimento());
            entity.setGenero(dto.getGenero());
            entity.setCep(dto.getCep());
            entity.setEstado(dto.getEstado());
            entity.setCidade(dto.getCidade());
            entity.setBairro(dto.getBairro());
            entity.setLogradouro(dto.getLogradouro());
            entity.setNumero(dto.getNumero());
            entity = repository.save(entity);
            return new ClienteDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("id not found " + id);
        }
    }

    public void delete(Long id) {
        try {
            repository.findById(id);
            repository.deleteById(id);
        }
        catch(EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
    }
}
